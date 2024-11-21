const contractAddress = ""; 
const contractABI = []; 


if (typeof window.ethereum !== 'undefined') {
    console.log("MetaMask is installed!");
} else {
    alert("MetaMask is not installed. Please install MetaMask and try again.");
}

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Connect MetaMask function
async function connectMetaMask() {
    try {
        // Request account access
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

// Sign Up function
async function signUp(username, password) {
    try {
        const account = await connectMetaMask(); // Ensure MetaMask is connected
        if (!account) return;

        const passwordHash = web3.utils.sha3(password); // Hashing password
        await contract.methods.signUp(username, passwordHash).send({ from: account });
        alert("Sign-up successful!");
    } catch (error) {
        console.error("Sign-up failed:", error);
        alert("Sign-up failed. Please check the console for details.");
    }
}

// Login function
async function login(password) {
    try {
        const account = await connectMetaMask(); // Ensure MetaMask is connected
        if (!account) return;

        const passwordHash = web3.utils.sha3(password); // Hashing password
        const username = await contract.methods.login(passwordHash).call({ from: account });
        alert(`Login successful! Welcome ${username}`);
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please check the console for details.");
    }
}
