/**
 * Auto-Sweep v3 Script for Tron (TRX)
 * Developed by Fahd Elharaka
 * Email: fahd@web3dev.ma / Telegram: @Thisiswhosthis
 *
 * DISCLAIMER:
 * 
 * This script is provided for educational and informational purposes only.
 * It is not intended for any illegal or unauthorized activities. 
 * 
 * The developer of this script shall not be responsible for any misuse or damage caused by the use of this script.
 * Use this script at your own risk and responsibility.
 */

const TronWeb = require('tronweb').TronWeb

const tronWeb = new TronWeb({
  fullHost: 'https://tron-rpc.publicnode.com',
  privateKey: 'YOUR_PRIVATE_KEY'
});

const sourceAddress = tronWeb.address.fromPrivateKey(tronWeb.defaultPrivateKey);
const destinationAddress = 'DESTINATION_ADDRESS';
const FEE_RESERVE_TRX = 1;

async function getBalance(address) {
  try {
    const balanceInSun = await tronWeb.trx.getBalance(address);
    const balanceInTRX = balanceInSun / 1_000_000;
    return balanceInTRX;
  } catch (error) {
    console.error('Error retrieving balance:', error);
    throw error;
  }
}

async function checkEnergy(address) {
  try {
    const accountResources = await tronWeb.trx.getAccountResources(address);
    return accountResources.EnergyLimit - accountResources.EnergyUsed;
  } catch (error) {
    console.error('Error checking energy:', error);
    throw error;
  }
}

async function sendTransaction(from, to, amountInTRX) {
  try {
    const amountInSun = amountInTRX * 1_000_000;
    const transaction = await tronWeb.transactionBuilder.sendTrx(to, amountInSun, from);
    const signedTransaction = await tronWeb.trx.sign(transaction);
    const result = await tronWeb.trx.sendRawTransaction(signedTransaction);

    if (result.result) {
      console.log(`Transaction successfully broadcasted. TXID: ${result.txid}`);
      return result;
    } else {
      throw new Error('Failed to broadcast the transaction.');
    }
  } catch (error) {
    console.error('Error sending transaction:', error);
    throw error;
  }
}

async function autoSweep() {
  try {
    const currentBalance = await getBalance(sourceAddress);

    if (currentBalance > FEE_RESERVE_TRX) {
      const energyAvailable = await checkEnergy(sourceAddress);
      if (energyAvailable < 0) {
        console.log('Warning: Low energy. Transaction fees will be paid with TRX.');
      }

      const transferAmount = currentBalance - FEE_RESERVE_TRX;
      console.log(`Current balance: ${currentBalance.toFixed(6)} TRX. Sending ${transferAmount.toFixed(6)} TRX.`);
      const result = await sendTransaction(sourceAddress, destinationAddress, transferAmount);

      const txID = result.txid;
      if (txID) {
        let confirmed = false;
        let retries = 0;
        const maxRetries = 5;

        while (!confirmed && retries < maxRetries) {
          try {
            const tx = await tronWeb.trx.getTransaction(txID);

            if (tx && tx.ret && tx.ret[0] && tx.ret[0].contractRet === 'SUCCESS') {
              confirmed = true;
              console.log(`Successfully transferred ${transferAmount.toFixed(6)} TRX. Transaction ID: ${txID}`);
            } else {
              throw new Error('Transaction not yet confirmed.');
            }
          } catch (error) {
            retries++;
            console.log(`Checking transaction confirmation (${retries}/${maxRetries})...`);
            await new Promise(resolve => setTimeout(resolve, 5000));
          }
        }

        if (!confirmed) {
          console.error(`Failed to confirm transaction after ${maxRetries} retries. Transaction ID: ${txID}`);
        }
      }
    } else {
      console.log(`Current balance: ${currentBalance.toFixed(6)} TRX. No action taken (balance ≤ reserve of ${FEE_RESERVE_TRX} TRX).`);
    }
  } catch (error) {
    console.error('Auto-sweep error:', error);
  }
}

async function runAutoSweep() {
  await autoSweep();
  setTimeout(runAutoSweep, 60000);
}

runAutoSweep();
