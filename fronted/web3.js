const contractAddress = "0x5e17b14ADd6c386305A32928F985b29bbA34Eff5";
const contractABI = [ [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "username",
				"type": "string"
			}
		],
		"name": "LoginSuccess",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_passwordHash",
				"type": "string"
			}
		],
		"name": "signUp",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "username",
				"type": "string"
			}
		],
		"name": "SignUpSuccess",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "isUserRegistered",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_passwordHash",
				"type": "string"
			}
		],
		"name": "login",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
] ];

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function signUp(username, password) {
    const passwordHash = web3.utils.sha3(password); // Hashing password
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];

    await contract.methods.signUp(username, passwordHash).send({ from: account });
    alert("Sign-up successful!");
}

async function login(password) {
    const passwordHash = web3.utils.sha3(password); // Hashing password
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];

    const username = await contract.methods.login(passwordHash).call({ from: account });
    alert(`Login successful! Welcome ${username}`);
}
