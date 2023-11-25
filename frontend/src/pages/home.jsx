import React from 'react';
import { useEffect } from 'react';
import { useForumContext } from '../hooks/useForumscontext';
import ForumForm from '../components/Foruminput';
const ForumAndThread = () => {

	const {  dispatch } = useForumContext(); // Destructure 'forums' instead of 'forum'
	useEffect(() => {
		const fetchForums = async () => {
			try {
				const response = await fetch('http://localhost:1000/api/forums/forums');
				const json = await response.json();
				if (response.ok) {
					dispatch({ type: 'SET_FORUMS', payload: json }); // Use 'SET_FORUMS'
				} else {
					console.error('Error fetching forums:', json);
				}
			} catch (error) {
				console.error('An error occurred:', error);
			}
		};
		fetchForums();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<div className="home">
				
				<ForumForm />
			</div>
		</>
	);
};
export default ForumAndThread;
