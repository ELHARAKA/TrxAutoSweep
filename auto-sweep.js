/**
 * Auto-Sweep v2 Script for Tron (TRX)
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
  fullHost: 'https://api.trongrid.io',
  privateKey: 'YOUR_PRIVATE_KEY'
});

const sourceAddress = 'SOURCE_ADDRESS';
const destinationAddress = 'DESTINATION_ADDRESS';

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

async function sendTransaction(from, to, amountInTRX) {
  try {
    const amountInSun = amountInTRX * 1_000_000;
    const transaction = await tronWeb.transactionBuilder.sendTrx(to, amountInSun, from);
    const signedTransaction = await tronWeb.trx.sign(transaction);
    const result = await tronWeb.trx.sendRawTransaction(signedTransaction);
    return result;
  } catch (error) {
    console.error('Error sending transaction:', error);
    throw error;
  }
}

async function autoSweep() {
  try {
    const currentBalance = await getBalance(sourceAddress);

    if (currentBalance > 1) {
      console.log(`Current balance: ${currentBalance.toFixed(6)} TRX. Proceeding with transfer...`);
      const result = await sendTransaction(sourceAddress, destinationAddress, currentBalance);
      console.log(`Transferred ${currentBalance.toFixed(6)} TRX to ${destinationAddress}. Transaction ID: ${result.txid}`);
    } else {
      console.log(`Current balance: ${currentBalance.toFixed(6)} TRX. No action taken (balance ≤ 1 TRX).`);
    }
  } catch (error) {
    console.error('Auto-sweep error:', error);
  }
}

setInterval(autoSweep, 60000);
