import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state

    const [mov, setMov] = useState(null);
    const [loadingMov, setLoadingMov] = useState(true); // Added loading state

    useEffect(() => {
        // Fetch data from your Express API
        axios.get('http://localhost:4000/GetPosts')
            .then(response => {
                setPosts(response.data);
                console.log(response.data);
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false on error as well
            });
        
        // Fetch data from your Express API
        axios.get('http://localhost:4000/GetRandomMovie')
            .then(response => {
                setMov(response.data);
                console.log(response.data);
                setLoadingMov(false); // Set loading to false once data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoadingMov(false); // Set loading to false on error as well
            });
    }, []);

    const [review, setReview] = useState('');
    const handleReviewSubmit = async (e) => {

        try {
            const response = await fetch('http://localhost:4000/PostReview', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ review }),
            });
            if (response.ok) {
                console.log('Review submitted successfully');
            } else {
                console.error('Failed to submit review');
            }
            
        } catch (error) {
            console.error('Error:', error);
        } finally {
            window.location.reload(true);
        }
    };

    return (
        <div className="App">
            <div className="screen-left">
                <p>Current Movie</p>
                <div className="movie">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                <img src={mov.poster} alt="Movie Image" className="movie-img"/>
                                
                                <div className="movie-info">
                                    <h1 className="movie-title">{mov.title}</h1>
                                    <div className="movie-tags">
                                        
                                    </div>
                                    <p className="movie-desc">{mov.synopsis}</p>
                                    <form className="movie-review" onSubmit={handleReviewSubmit}>
                                        <label htmlFor="review">Create a Post:</label><br/>
                                        <textarea
                                        name="review"
                                        className="review-input"
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        placeholder='I love this movie!'
                                        /><br/>
                                        <input type="submit" value={"Send"}/>
                                    </form>
                                </div>
                            </>
                        )}
                </div>

            </div>
            <div className="screen-right">
                <h1 className="forum-title">FORUM</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    posts.map(item => (
                        <p key={item._id} className='forum-post'>
                            <p id="new-post-title">New Post</p>
                            <p id="post-text">{item.review}</p>
                        </p>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
