import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../../Components/Login-Page-Components/SubmitButton'
import './LoginPage.css';

interface User {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
