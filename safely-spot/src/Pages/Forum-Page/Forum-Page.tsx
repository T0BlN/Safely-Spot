import React, { useState, useMemo, useEffect } from 'react';
import CommentForm from '../../Components/Forum-Components/CommentForm';
import CommentList from '../../Components/Forum-Components/CommentList';
import IncidentDetails from '../../Components/Forum-Components/IncidentDetails';
import { useParams, useNavigate } from 'react-router-dom';
import { useDataContext } from '../../Context/DataContext';
import './Forum-Page.css';

// Fallback mock data in case the incident is not found
const fallbackIncident = {
  id: '1',
  title: 'Incident Not Found',
  description: 'The incident you are looking for cannot be found.',
  location: 'Unknown Location',
  category: 'Unknown',
  date: new Date().toISOString().split('T')[0]
};

const ForumPage: React.FC = () => {
  const { incidentId } = useParams<{ incidentId: string }>();
  const navigate = useNavigate();
  const { pins, currentUser } = useDataContext();

  // Find the current incident from pins data
  const currentIncident = useMemo(() => {
    return pins.find(pin => pin.id === incidentId) || null;
  }, [pins, incidentId]);

  // Convert pin data to incident format needed by IncidentDetails
  const incidentData = useMemo(() => {
    if (!currentIncident) return fallbackIncident;
    return {
      id: currentIncident.id,
      title: currentIncident.title,
      description: currentIncident.description,
      location: `${currentIncident.position.lat.toFixed(4)}, ${currentIncident.position.lng.toFixed(4)}`,
      category: currentIncident.category,
      date: new Date().toISOString().split('T')[0]
    };
  }, [currentIncident]);

  // --- NEW: Fetch comments from backend ---
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!incidentId) return;
    setLoading(true);
    fetch(`http://localhost:3000/comments/${incidentId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setComments(data);
        } else {
          setComments([]);
          // Optionally show an error message
        }
      })
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [incidentId]);

  const handleAddComment = async (commentText: string) => {
    if (!currentIncident || !currentUser) return;
    const newComment = {
      user: currentUser.username,
      text: commentText,
    };
    const res = await fetch(`http://localhost:3000/comments/${incidentId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment),
    });
    if (res.ok) {
      const saved = await res.json();
      setComments([...comments, saved]);
    }
  };

  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('oldest');
  const handleSortChange = (newSortOrder: 'newest' | 'oldest') => setSortOrder(newSortOrder);

  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [comments, sortOrder]);

  if (!currentIncident && incidentId !== "1") {
    return (
      <div className="forum-page">
        <button className="back-button" onClick={() => navigate('/')}>Back to Map</button>
        <h2>Incident Not Found</h2>
        <p>The incident you are looking for could not be found.</p>
      </div>
    );
  }

  return (
    <div className="forum-page">
      <button className="back-button" onClick={() => navigate('/')}>Back to Map</button>
      <IncidentDetails incident={incidentData} />
      {loading ? <p>Loading comments...</p> : (
        <CommentList 
          comments={sortedComments.map(c => ({
            id: c.id,
            author: c.user,
            text: c.text,
            timestamp: c.timestamp,
          }))}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      )}
      <CommentForm onAddComment={handleAddComment} />
    </div>
  );
};

export default ForumPage;