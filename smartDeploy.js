const { ethers } = require('ethers');
const { AlchemyProvider } = require('@alch/alchemy-web3');

// Ganti dengan Alchemy API Key Anda
const alchemyApiKey = 'YOUR_ALCHEMY_API_KEY';

// Ganti dengan bytecode kontrak cerdas Anda
const contractBytecode = 'YOUR_CONTRACT_BYTECODE';

// Alchemy provider
const alchemyProvider = new AlchemyProvider('mainnet', alchemyApiKey);

// Gantilah dengan kunci pribadi akun Ethereum pengirim
const privateKey = 'YOUR_PRIVATE_KEY';

// Buat wallet menggunakan private key
const wallet = new ethers.Wallet(privateKey, alchemyProvider);

// Contoh kontrak cerdas sederhana
const contractFactory = new ethers.ContractFactory([], contractBytecode, wallet);

// GasPrice saat ini
const gasPrice = await alchemyProvider.getGasPrice();

// Estimasi biaya gas
const gasEstimate = await contractFactory.estimateGas.deploy();

// GasLimit
const gasLimit = gasEstimate.mul(2);

// Buat transaksi deployment
const deploymentTransaction = await contractFactory.getDeployTransaction({
  gasPrice,
  gasLimit,
});

// Kirim transaksi
const deploymentResponse = await wallet.sendTransaction(deploymentTransaction);

// Tunggu hingga transaksi selesai
await deploymentResponse.wait();

// Alamat kontrak cerdas yang baru saja dibuat
const deployedContractAddress = ethers.utils.getContractAddress(deploymentTransaction);

console.log('Smart Contract berhasil dideploy!');
console.log('Alamat Kontrak Cerdas:', deployedContractAddress);
