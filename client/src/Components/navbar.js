import React, { useState } from 'react';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from '../App';
import '../App.css'

const BasicExample = () => {
    const [showForm, setShowForm] = useState(''); // '' (none), 'signIn', or 'signUp'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/login', {
                username,
                password
            });
            localStorage.setItem('token', response.data.token); // Store the token
            setMessage(`Welcome ${username}!`);
            setShowForm('')
           
        } catch (error) {
            setMessage('Login failed. Please try again.');
           
        }
    };

    const handleSignUp = async () => {
        try {
            await axios.post('http://localhost:3000/api/v1/register', {
                username,
                password
            });
            setMessage('User registered successfully. Please sign in.');
            setShowForm('')
            
        } catch (error) {
            setMessage('Registration failed. Please try again.');
           
        }
    };

    const renderForm = () => {
        if (showForm === '') return null;

        const isSignIn = showForm === 'signIn';

        return (
            <div>
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
            </div>
        );
    };

    return (
        <div >
            <Navbar className="custom-navbar" expand="lg">
                {/* <Navbar.Brand href="/">MyApp</Navbar.Brand> */}
                <Nav className="ml-auto">
                    <Nav.Item>
                        <Nav.Link href="#" onClick={() => setShowForm('signIn')}>Sign In</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#" onClick={() => setShowForm('signUp')}>Sign Up</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
            {renderForm()}
          
            {message && <p>{message}</p>}
        </div>
    );
};

export default BasicExample;
