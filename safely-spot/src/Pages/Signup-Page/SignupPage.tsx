import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../../Context/DataContext';
import SubmitButton from '../../Components/Login-Page-Components/SubmitButton';
import './SignupPage.css';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { users, addUser, setCurrentUser } = useDataContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (users.some((u) => u.username === username)) {
      alert('Username already exists. Please login instead.');
      return;
    }

    const newUser = {
      username,
      password,
      pins: [],
      starredPins: [],
      bio: ''
    };
    addUser(newUser);
    const oneHour = 60 * 60 * 1000;
    const expiresAt = Date.now() + oneHour;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('currentUserExpiresAt', expiresAt.toString());
    setCurrentUser(newUser);
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
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
        <SubmitButton type="submit">Sign Up</SubmitButton>
      </form>
    </div>
  );
};

export default SignupPage;
