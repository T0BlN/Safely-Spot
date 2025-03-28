import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../../Components/Login-Page-Components/SubmitButton';
import './SignupPage.css';

interface User {
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u) => u.email === email)) {
      alert('User already exists. Please login instead.');
      return;
    }

    const newUser: User = { email, password };
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
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
        <SubmitButton type="submit">Sign Up</SubmitButton>
      </form>
    </div>
  );
};

export default SignupPage;
