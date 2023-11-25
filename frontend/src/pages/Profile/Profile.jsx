import React, { useEffect, useState } from 'react';
import "./Profile.css"
import axios from 'axios';
const Profile = () => {
  const [user, setUser] = useState(null);
  const userId = '64ea080c2d93fa20f4699ae1'; // Replace with the actual user ID
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const { data } = await axios.get(`http://localhost:1000/api/users/profile/${userId}`);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserProfile();
  }, [userId]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile_container">
      <h1>Profile</h1>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Bio: {user.bio}</p>
    </div>
  );
};

export default Profile;
