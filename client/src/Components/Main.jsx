import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Card from "./Card";
import axios from "axios";
import './style.css';

const Main = () => {
    const [search, setSearch] = useState("");
    const [bookData, setData] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Initialize navigate

    const searchBook = (evt) => {
        if (evt.key === "Enter") {
            if (!search) return;
            setLoading(true);
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}&maxResults=40&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU`)
                .then(res => {
                    setData(res.data.items || []);
                    setTotalItems(res.data.totalItems || 0);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        }
    };

    const nextPage = () => {
        if (startIndex + 40 < totalItems) {
            setStartIndex(startIndex + 40);
        }
    };

    const prevPage = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 40);
        }
    };

    React.useEffect(() => {
        if (search) {
            setLoading(true);
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}&maxResults=40&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU`)
                .then(res => {
                    setData(res.data.items || []);
                    setTotalItems(res.data.totalItems || 0);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }, [startIndex, search]);

    // Function to handle logout
    const handleLogout = () => {
        navigate('/'); // Redirect to signup page
    };

    return (
        <>
            <div className="header">
                <div className="row1">
                    <h1>A room without books is like<br /> a body without a soul.</h1>
                    {/* Logout Button */}
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <div className="row2">
                    <h2>Find Your Book</h2>
                    <div className="search">
                        <input 
                            type="text" 
                            placeholder="Enter Your Book Name"
                            value={search} 
                            onChange={e => setSearch(e.target.value)}
                            onKeyPress={searchBook} 
                        />
                        <button onClick={searchBook}><i className="fas fa-search"></i></button>
                    </div>
                    <img src="./images/bg2.png" alt="" />
                </div>
            </div>

            <div className="container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Card book={bookData} />
                )}
            </div>

            <div className="pagination">
                <button onClick={prevPage} disabled={startIndex === 0}>
                    Previous
                </button>
                <button onClick={nextPage} disabled={startIndex + 40 >= totalItems}>
                    Next
                </button>
            </div>
        </>
    );
};

export default Main;
