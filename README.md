<h2>IMPORTANT NOTE<h2>
  
For sweeping balances from multiple private keys to one destination wallet, please refer to [this repository][repo-link]

[repo-link]: https://github.com/ELHARAKA/BatchTronAutoSweep

<h1>TRX AutoSweep</h1>

<p>TRX AutoSweep is a script written in JavaScript that allows for the automatic sweeping of TRX (Tron) funds from a source wallet to a destination wallet. It utilizes the TronWeb library to interact with the Tron blockchain.</p>

<h2>Features</h2>

<ul>
  <li>Checks the available balance of a wallet address.</li>
  <li>Transfers the funds to the specified destination wallet if there are available funds.</li>
  <li>Periodically performs the auto-sweeping process at regular intervals.</li>
</ul>

<h2>Prerequisites</h2>

<ul>
  <li>Node.js</li>
  <li>TronWeb library</li>
</ul>

<h2>Getting Started</h2>

<ol>
  <li>Clone the repository and navigate to the project directory.</li>
  <li>Install the required dependencies by running the following command:<br>
    <code>npm install tronweb</code></li>
  <li>Modify the <code>YOUR_PRIVATE_KEY</code> and <code>SOURCE_ADDRESS</code> variables in the <code>auto-sweep.js</code> file with your desired values.</li>
  <li>Modify the <code>DESTINATION_ADDRESS</code> variable in the <code>auto-sweep.js</code> file to set your desired destination wallet address.</li>
  <li>Run the script using the following command:<br>
    <code>node auto-sweep.js</code></li>
</ol>

<h2>Configuration</h2>

<ul>
  <li>Modify the Tron network endpoint in the TronWeb instance setup to use the desired Tron network.</li>
  <li>Adjust the interval duration in the <code>setInterval</code> function to change the frequency of auto-sweeping.</li>
</ul>

<h2>Contributing</h2>

<p>Contributions are welcome! If you have any suggestions, improvements, or bug fixes, feel free to open an issue or submit a pull request.</p>

<h2>License</h2>

<p>This project is licensed under the <a href="LICENSE">Mozilla Public License 2.0</a>.</p>

<h2>Disclaimer</h2>

<p>Please note that the use of this script is at your own risk. Ensure that you have proper authorization and adhere to all legal and regulatory requirements when using it to manage TRX wallets and transfer funds.</p>

<h2>Acknowledgments</h2>

<ul>
  <li><a href="https://github.com/tronprotocol/tronweb">TronWeb</a> - JavaScript library for Tron blockchain interactions.</li>
</ul>
