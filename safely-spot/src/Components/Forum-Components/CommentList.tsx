import React from 'react';
import './CommentList.css';

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  return (
    <div className="comment-list">
      <h3>Comments ({comments.length})</h3>
      {comments.length === 0 ? (
        <p className="no-comments">No comments yet. Be the first to comment!</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <div className="comment-header">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-time">{formatTimestamp(comment.timestamp)}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;