import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForumDetails = ({ forum, comments }) => {
  const [commentContent, setCommentContent] = useState('');
  const [forumComments, setForumComments] = useState(comments || []);
  const [showCommentSection, setShowCommentSection] = useState(false);

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:1000/api/forums/forums/${forum._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: commentContent }), // Send comment content to server
      });

      if (response.ok) {
        const updatedForum = await response.json();
        setForumComments(updatedForum.comments); // Update comments with the new comment
        setCommentContent(''); // Clear the comment input
        toast.success('Comment added successfully');
      } else {
        console.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error while adding comment:', error);
      toast.error('Failed to add comment');
    }
  };
  const toggleCommentSection = () => {
    setShowCommentSection(!showCommentSection);
  };


  return (
    <div className="forum-container">
      <div className="forum-details" onClick={toggleCommentSection}>
        <h2>{forum.title}</h2>
        <p>Description: {forum.description}</p>
        <p>Tags: {forum.tags}</p>
      </div>
      {showCommentSection && (
        <div className="comment-form">
          <h3>Add Comment</h3>
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Enter your comment here"
          />
          <button onClick={handleCommentSubmit}>Submit Comment</button>
        </div>
      )}
      {showCommentSection && (
        <div className="comments-section">
          <h3>Comments</h3>
          <textarea
            value={forumComments.map(comment => comment.content).join('\n')}
            readOnly
            rows={5} // Adjust the number of rows as needed
          />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ForumDetails;
