import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../../Context/DataContext';
import SubmitButton from '../../Components/Login-Page-Components/SubmitButton'
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { users, setCurrentUser } = useDataContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      const oneHour = 60 * 60 * 1000;
      const expiresAt = Date.now() + oneHour;
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('currentUserExpiresAt', expiresAt.toString());
      setCurrentUser(user);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton type="submit">Login</SubmitButton>
      </form>
    </div>
  );
};

export default LoginPage;
