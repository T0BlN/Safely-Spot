import React, { useState } from 'react';
import './CommentForm.css';

interface CommentFormProps {
  onAddComment: (text: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const [commentText, setCommentText] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText('');
    }
  };
  
  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h3>Add a Comment</h3>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Share your thoughts or information about this incident..."
        rows={4}
        required
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentForm;