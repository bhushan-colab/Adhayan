const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
const contractABI = [
	
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_username",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_password",
					"type": "string"
				}
			],
			"name": "signUp",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
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
					"name": "_password",
					"type": "string"
				}
			],
			"name": "login",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	
];
if (window.ethereum && window.ethereum.isMetaMask) {
    console.log("MetaMask is installed!");
} else {
    alert("MetaMask is not installed. Please install MetaMask and try again.");
}


const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractABI, contractAddress);

// MetaMask Connection
async function connectMetaMask() {
    try {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        console.log("Connected account:", account);
        alert(`MetaMask connected: ${account}`);
        return account;
    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("Failed to connect MetaMask. Please try again.");
    }
}

// Sign-Up Function
async function signUp(username, password) {
    try {
        const account = await connectMetaMask();
        if (!account) return;

        await contract.methods.signUp(username, password).send({ from: account });
        alert("Sign-up successful!");
    } catch (error) {
        console.error("Sign-up failed:", error);
        alert("Sign-up failed. Please check the console for details.");
    }
}

// Login Function
async function login(username, password) {
    try {
        const account = await connectMetaMask();
        if (!account) return;

        const isValid = await contract.methods.login(username, password).call({ from: account });
        if (isValid) {
            alert("Login successful!");
            window.location.href = "homepage1.html"; // Redirect to home page
        } else {
            alert("Invalid username or password. Please try again.");
        }
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please check the console for details.");
    }
}
