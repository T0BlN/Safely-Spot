import './Your-Pins-Page.css'
import { useNavigate } from 'react-router-dom';

const YourPinsPage = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    }
  // Sample data
  const yourPosts = [
    {
      id: 1,
      user: 'Koval',
      text: 'Check out this beautiful sunset from my hike yesterday!',
      date: '2023-05-15',
      likes: 24,
    },
    {
      id: 1,
      user: 'Koval',
      text: 'Just booked my tickets to Japan for the cherry blossom season!',
      date: '2023-04-22',
      likes: 56,
    },
    {
      id: 1,
      user: 'Koval',
      text: 'Homemade pasta recipe that will blow your mind...',
      date: '2023-05-10',
      likes: 89,
    }
  ];


  return (
    <div className="your-posts-page">
      <h1 className="page-header">Your Pins</h1>
      <button className="back-to-map-your-pins" onClick={handleBack}>Back to Map</button>
      
      {yourPosts.length === 0 ? (
        <div className="empty-state">You haven't made any pins yet.</div>
      ) : (
        <div className="posts-list">
          {yourPosts.map(post => (
            <article key={post.id} className="post-card">
              <div className="post-header">
                <span className="username">@{post.user}</span>
                <span className="post-date">{post.date}</span>
              </div>
              
              <div className="post-content">
                <p>{post.text}</p>
              </div>
              
              <div className="post-footer">
                <span className="likes-count">{post.likes} likes</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourPinsPage;