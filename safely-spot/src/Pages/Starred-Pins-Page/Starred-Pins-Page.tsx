import { useState } from 'react';
import {FaStar, FaRegStar} from 'react-icons/fa'
import { useNavigate, Link } from 'react-router-dom';
import './Starred-Pins-Page.css'

const StarredPinsPage = () => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    }


  // Sample data
  const [starredPosts, setStarredPosts] = useState([
    {
      id: 1,
      user: 'daniil',
      text: 'Check out this beautiful sunset from my hike yesterday!',
      date: '2023-05-15',
      likes: 24,
      isStarred: true
    },
    {
      id: 2,
      user: 'TravelLover',
      text: 'Just booked my tickets to Japan for the cherry blossom season!',
      date: '2023-04-22',
      likes: 56,
      isStarred: true
    },
    {
      id: 3,
      user: 'FoodieAdventures',
      text: 'Homemade pasta recipe that will blow your mind...',
      date: '2023-05-10',
      likes: 89,
      isStarred: true
    }
  ]);

  // Toggle star status
  const toggleStar = (postId: number) => {
    setStarredPosts(starredPosts.map(post => 
      post.id === postId ? { ...post, isStarred: !post.isStarred } : post
    ));
  };


  return (
    <div className="starred-posts-page">
      <h1 className="page-header">Your Starred Pins</h1>
      <button className="back-to-map-starred-pins" onClick={handleBack}>Back to Map</button>


      {starredPosts.length === 0 ? (
        <div className="empty-state">You haven't starred any pins yet.</div>
      ) : (
        <div className="posts-list">
          {starredPosts.map(post => (
            <article key={post.id} className="post-card">
              <div className="post-header">
                <Link className="username" to={{pathname: `/account/${post.user}`}}>@{post.user}</Link>
                <span className="post-date">{post.date}</span>
              </div>
              
              <div className="post-content">
                <p>{post.text}</p>
              </div>
              
              <div className="post-footer">
                <button 
                  className="star-button"
                  onClick={() => toggleStar(post.id)}
                  aria-label={post.isStarred ? "Unstar this post" : "Star this post"}
                >
                  {post.isStarred ? (
                    <FaStar className="star-icon filled" />
                  ) : (
                    <FaRegStar className="star-icon" />
                  )}
                </button>
                <span className="likes-count">{post.likes} likes</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default StarredPinsPage;