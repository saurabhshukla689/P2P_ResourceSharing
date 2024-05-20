import React, { useState } from 'react';
import axios from 'axios';

import { FaFacebook, FaGoogle } from 'react-icons/fa';
import '../FancyForm.css';

const FancyForm = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignIn =async () => {
        // Handle sign in logic here
        try {
            const response = await axios.post('http://localhost:3000/api/v1/login', {
                username,
                password
            });
            console.log("inside signin")
            localStorage.setItem('token', response.data.token); // Store the token
            setMessage(`Welcome ${username}!`);
          // setShowForm('')
           
        } catch (error) {
            console.log("signin failedn")
            setMessage('Login failed. Please try again.');
           
        }
    };

        
    const handleSignUp = async () => {
        // Handle sign up logic here

        try {
            await axios.post('http://localhost:3000/api/v1/register', {
                username,
                password
            });
            console.log("inside sign up")
            setMessage(`Welcome, ${username}! Please log in.`);
          // setShowForm('')
            
        } catch (error) {
            console.log("signup failed",error)
            setMessage('Registration failed. Please try again.');
           
        }

        
    };

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
        setMessage('');
    };

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={isSignIn ? handleSignIn : handleSignUp}>
                    {isSignIn ? 'Sign In' : 'Sign Up'}
                </button>
                <p onClick={toggleForm}>
                    {isSignIn ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                </p>
                <div className="social-login">
                    <p>Or sign in with:</p>
                    <FaFacebook className="social-icon" />
                    <FaGoogle className="social-icon" />
                </div>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default FancyForm;
