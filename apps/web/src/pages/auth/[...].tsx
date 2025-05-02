import React, { useState } from 'react';
import { useRouter } from 'next/router';

const AuthPage = () => {
  const router = useRouter();
  const { authType } = router.query;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async () => {
    if (!email || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`/api/auth/${authType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setMessage('Authentication successful.');
        router.push('/dashboard');
      } else {
        setMessage('Authentication failed.');
      }
    } catch (error) {
      setMessage('An error occurred during authentication.');
    }
  };

  return (
    <div>
      <h1>{authType === 'login' ? 'Login' : 'Register'}</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>
        {authType === 'login' ? 'Login' : 'Register'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AuthPage;
