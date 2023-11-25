import { useState } from 'react'
import { useForumContext } from "../hooks/useForumscontext"
import { useNavigate,Link } from 'react-router-dom'; // Import useNavigate

const ForumForm = () => {
  const { dispatch } = useForumContext();
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [tags, settags] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const forum = { title, description, tags };
    const response = await fetch('/api/forums/forums', {
      method: 'POST',
      body: JSON.stringify(forum),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setTitle('');
      setdescription('');
      settags('');
      console.log('New Forum added:', json);
      dispatch({ type: "CREATE_Forum", paydescription: json });
      
      // Navigate to the '/forums' page after successful form submission
      navigate('/forums');
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Forum</h3>
      <label>Forum Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>Description:</label>
      <input
        type="text"
        className="description-input" 
        onChange={(e) => setdescription(e.target.value)}
        value={description}
      />
      <label>Number of Tags:</label>
      <input
        type="text"
        onChange={(e) => settags(e.target.value)}
        value={tags}
      />
      
      <button className="add-button">Add Forum</button>
      <Link to="/forums">
        <button className="add-button2">Forums</button>
      </Link>
      {error && <div className="error">{error}</div>}
    </form>
  );
  
}
export default ForumForm