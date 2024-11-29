import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./news.css";

function News() {
    const [newsItems, setNewsItems] = useState([]); // Store fetched news
    const [currentNews, setCurrentNews] = useState(""); // Current news title
    const [currentImage, setCurrentImage] = useState(""); // Current news image
    const [currentCategory, setCurrentCategory] = useState(""); // Store current category
    const [showNews, setShowNews] = useState(true);

    // Fetch news from the API
    const fetchNews = async (randomCategory) => {
        try {
            const country = "us"
            const response = await fetch(
                `https://newsapi.org/v2/top-headlines?country=${country}&category=${randomCategory}&apiKey=27d4da2052fe46b1830d343eeb9a89d5`
            );
            const data = await response.json();
            const articles = data.articles.map((article) => ({
                title: article.title,
                image: article.urlToImage, // Image URL for the article
            }));
            setNewsItems(articles);
            setCurrentNews(articles[0]?.title || "No news available");
            setCurrentImage(articles[0]?.image || ""); // Set image for the first news
            setCurrentCategory(randomCategory); // Set current category for display
        } catch (error) {
            console.error("Error fetching news:", error);
            setCurrentNews("Error fetching news.");
            setCurrentCategory("Unknown");
        }
    };

    useEffect(() => {
        // Initial news fetch when component mounts
        const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        fetchNews(randomCategory);
    }, []); // Fetch news once on component mount

    useEffect(() => {
        if (newsItems.length === 0) return;

        // Update news periodically, and change category
        const intervalId = setInterval(() => {
            setShowNews(false); // Trigger fade-out
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * newsItems.length);
                setCurrentNews(newsItems[randomIndex].title);
                setCurrentImage(newsItems[randomIndex].image);

                // Change the category for the next news update
                const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
                const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                fetchNews(randomCategory);

                setShowNews(true); // Trigger fade-in
            }, 500); // Matches the fade-out duration

        }, 7000); // News updates every 7 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [newsItems]);

    return (
        <footer>
            <CSSTransition
                in={showNews}
                timeout={500}
                classNames="fade"
                unmountOnExit
            >
                <div className="news-image-container">
                    <div className="news-container">
                        <p>{`Category: ${currentCategory} - News: ${currentNews}`}</p>
                    </div>
                    {currentImage && (
                        <div className="image-container">
                            <img src={currentImage} alt="news" />
                        </div>
                    )}
                </div>
            </CSSTransition>
        </footer>
    );
}

export default News;
