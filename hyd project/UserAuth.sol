// SPDX-License-Identifier: Unidentified
pragma solidity ^0.8.0;

contract UserAuth {
    // Structure to store user information
    struct User {
        string username;
        string passwordHash;
        bool exists;
    }

    // Mapping to store users based on their username (hashed)
    mapping(address => User) private users;

    // Events for logging
    event SignUpSuccess(address indexed userAddress, string username);
    event LoginSuccess(address indexed userAddress, string username);

    // Function to sign up a new user
    function signUp(string memory _username, string memory _passwordHash) public {
        require(!users[msg.sender].exists, "User already exists!");
        require(bytes(_username).length > 0, "Username cannot be empty.");
        require(bytes(_passwordHash).length > 0, "Password hash cannot be empty.");

        // Add user to the mapping
        users[msg.sender] = User({
            username: _username,
            passwordHash: _passwordHash,
            exists: true
        });

        emit SignUpSuccess(msg.sender, _username);
    }

    // Function to log in an existing user
   function login(string memory _passwordHash) public view returns (string memory) {
    require(users[msg.sender].exists, "User does not exist.");
    require(
        keccak256(abi.encodePacked(users[msg.sender].passwordHash)) == keccak256(abi.encodePacked(_passwordHash)),
        "Incorrect password."
    );

    // Return the username of the logged-in user
    return users[msg.sender].username;
}


    // Function to check if the user exists
    function isUserRegistered() public view returns (bool) {
        return users[msg.sender].exists;
    }
}
