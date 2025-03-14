import React, { useState } from 'react';
import CommentForm from '../../Components/Forum-Components/CommentForm';
import CommentList from '../../Components/Forum-Components/CommentList';
import IncidentDetails from '../../Components/Forum-Components/IncidentDetails';
import { useParams, useNavigate } from 'react-router-dom';
import './Forum-Page.css';

const mockIncident = {
  id: '1',
  title: 'Fallen Tree on North Pleasant Street',
  description: 'Large tree fell across the sidewalk after the storm, blocking pedestrian access.',
  location: 'North Pleasant Street, Amherst, MA',
  category: 'Hazard',
  date: '2025-03-10',
};

const initialComments = [
  {
    id: '1',
    author: 'JaneDoe',
    text: 'The town has been notified about this. They should clear it by tomorrow.',
    timestamp: '2023-11-10T14:30:00Z'
  },
  {
    id: '2',
    author: 'LocalResident',
    text: 'I saw this yesterday. Be careful if you\'re walking in the area!',
    timestamp: '2023-11-10T15:45:00Z'
  }
];

const ForumPage: React.FC = () => {
  const { incidentId } = useParams<{ incidentId: string }>();
  const navigate = useNavigate();
  const [comments, setComments] = useState(initialComments);
  
  const handleAddComment = (commentText: string) => {
    const newComment = {
      id: Date.now().toString(),
      author: 'CurrentUser', // Replace with actual user data later
      text: commentText,
      timestamp: new Date().toISOString()
    };
    
    setComments([...comments, newComment]);
  };
  
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="forum-page">
      <button className="back-button" onClick={handleBack}>Back to Map</button>
      <IncidentDetails incident={mockIncident} />
      <CommentList comments={comments} />
      <CommentForm onAddComment={handleAddComment} />
    </div>
  );
};

export default ForumPage;