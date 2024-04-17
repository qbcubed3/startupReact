import React, { useState } from 'react';

export function Main(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const Login = async () => {
        try{
            const response = await fetch('/api/login',{
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({ username, password })
              })
            const data = await response.json();
            const authToken = data.authToken;
            localStorage.setItem("auth", authToken);
            if (response.status !== 302){
                setCode("You are logged in");
            }
            else{
                setCode("Could not log you in. Try again.")
            }
        }
        catch (error){
            console.error(error);
        }
    }

    return(
    <div className="login">
      <h2>Login:</h2>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username"/>

      <label htmlFor="password">Password:</label>
      <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"/>

      <button className="loginButton">
        Login/Register
      </button>
      <p id="error">{code}</p>
    </div>
    );
};

export default Main;