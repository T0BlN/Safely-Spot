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
  const { pins, currentUser, addComment } = useDataContext();
  
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
      date: new Date().toISOString().split('T')[0] // Using today's date as a fallback
    };
  }, [currentIncident]);

  // Get comments from the incident
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('oldest');
  
  // Use comments from the current incident if available
  const incidentComments = useMemo(() => {
    // Generate timestamps spaced one minute apart for better sorting
    const baseTime = Date.now();
    
    return currentIncident?.comments?.map((comment, index) => {
      // Create timestamps spaced apart for proper sorting
      // Most recent comments will be newest (higher timestamp)
      const commentTime = new Date(baseTime - (currentIncident.comments.length - index) * 60000);
      
      return {
        id: `comment-${index}-${Math.random().toString().slice(2)}`,
        author: comment.user,
        text: comment.text,
        timestamp: commentTime.toISOString()
      };
    }) || [];
  }, [currentIncident]);

  // Local state for comments to enable immediate UI updates
  const [localComments, setLocalComments] = useState(incidentComments);

  // Update local comments when incident data changes
  useEffect(() => {
    setLocalComments(incidentComments);
  }, [incidentComments]);
  
  const handleAddComment = (commentText: string) => {
    if (!currentIncident || !currentUser) return;
    
    // Create comment object for DataContext
    const dataContextComment = {
      user: currentUser.username,
      text: commentText
    };
    
    // Add comment through DataContext
    addComment(currentIncident.id, dataContextComment);
    
    // Update local state for immediate UI feedback
    const newComment = {
      id: `new-comment-${Date.now()}`,
      author: currentUser.username,
      text: commentText,
      timestamp: new Date().toISOString() // Current time for new comments
    };
    
    setLocalComments([...localComments, newComment]);
  };
  
  const handleBack = () => {
    navigate('/');
  };

  const handleSortChange = (newSortOrder: 'newest' | 'oldest') => {
    setSortOrder(newSortOrder);
  };

  const sortedComments = useMemo(() => {
    return [...localComments].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [localComments, sortOrder]);

  // Show a message if incident not found
  if (!currentIncident && incidentId !== "1") {
    return (
      <div className="forum-page">
        <button className="back-button" onClick={handleBack}>Back to Map</button>
        <h2>Incident Not Found</h2>
        <p>The incident you are looking for could not be found.</p>
      </div>
    );
  }

  return (
    <div className="forum-page">
      <button className="back-button" onClick={handleBack}>Back to Map</button>
      <IncidentDetails incident={incidentData} />
      <CommentList 
        comments={sortedComments} 
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
      <CommentForm onAddComment={handleAddComment} />
    </div>
  );
};

export default ForumPage;