// script.js

// Sign Up Functionality
 // Updated Sign Up Functionality
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
  
    if (!username || !password) {
      alert('Please fill in both fields.');
      return;
    }
  
    // Check if the username is already registered
    if (localStorage.getItem(username)) {
      alert('Username already exists. Please choose a different username.');
      return;
    }
  
    // Store user credentials in localStorage
    const userData = {
      username: username,
      password: password,
    };
  
    localStorage.setItem(username, JSON.stringify(userData));
    alert('Sign-up successful! Redirecting to login page...');
    
    // Redirect to login page
    window.location.href = './login.html';
  }
  
  // Login Functionality
  function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    if (!username || !password) {
      alert('Please fill in both fields.');
      return;
    }
  
    // Check if user exists in localStorage
    const storedUserData = localStorage.getItem(username);
  
    if (!storedUserData) {
      alert('User not found. Please sign up first.');
      return;
    }
  
    const userData = JSON.parse(storedUserData);
  
    // Validate password
    if (userData.password === password) {
      alert('Login successful!');
      window.location.href = './dashboard.html'; // Redirect to user dashboard or another page
    } else {
      alert('Incorrect password. Please try again.');
    }
  }
  