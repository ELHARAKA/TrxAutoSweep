/**
 * Auto-Sweep Script for Tron (TRX)
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

const TronWeb = require('tronweb');

// Set up TronWeb instance with the desired network
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io', // Use the desired Tron network endpoint
  privateKey: 'YOUR_PRIVATE_KEY' // Private key of the source wallet
});

const sourceAddress = 'SOURCE_ADDRESS'; // Source wallet address
const destinationAddress = 'DESTINATION_ADDRESS'; // Destination wallet address

async function getBalance(address) {
  try {
    const balance = await tronWeb.trx.getBalance(address);
    return balance;
  } catch (error) {
    console.error('Error retrieving balance:', error);
    throw error;
  }
}

async function sendTransaction(from, to, amount) {
  try {
    const transaction = await tronWeb.transactionBuilder.sendTrx(to, amount, from);
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

    if (currentBalance > 0) {
      console.log(`Available funds detected in the source address: ${currentBalance} TRX`);

      // Transfer funds to the destination address
      const result = await sendTransaction(sourceAddress, destinationAddress, currentBalance);
      console.log(`Transferred ${currentBalance} TRX to ${destinationAddress}. Transaction ID: ${result.txid}`);
    } else {
      console.log('No available funds detected in the source address.');
    }
  } catch (error) {
    console.error('Auto-sweeping error:', error);
  }
}

// Run autoSweep every 60 seconds
setInterval(autoSweep, 60000);
