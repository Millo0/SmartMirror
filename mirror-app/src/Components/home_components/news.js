import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./news.css";

function News() {
    const [newsItems, setNewsItems] = useState([]);
    const [currentNews, setCurrentNews] = useState("");
    const [currentImage, setCurrentImage] = useState("");
    const [currentCategory, setCurrentCategory] = useState("");
    const [showNews, setShowNews] = useState(true);

    // Save news to localStorage
    const saveNewsToLocal = (news) => {
      const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
      const lastUpdated = localStorage.getItem("lastUpdated");

      if (lastUpdated !== today) {
          // If the last update was on a different day, reset the news
          localStorage.setItem("savedNews", JSON.stringify(news));
      } else {
          // Otherwise, append to the existing news
          const existingNews = loadNewsFromLocal();
          const updatedNews = [...existingNews, ...news];
          localStorage.setItem("savedNews", JSON.stringify(updatedNews));
      }

      // Update the lastUpdated date
      localStorage.setItem("lastUpdated", today);

    };

    // Load news from localStorage
    const loadNewsFromLocal = () => {
        const savedNews = localStorage.getItem("savedNews");
        return savedNews ? JSON.parse(savedNews) : [];
    };

    // Fetch news from the API
    const fetchNews = async (randomCategory) => {
        try {
            const country = "us";
            const response = await fetch(
                `https://newsapi.org/v2/top-headlines?country=${country}&category=${randomCategory}&apiKey=27d4da2052fe46b1830d343eeb9a89d5`
            );
            const data = await response.json();

            if (!data.articles || data.articles.length === 0) {
                throw new Error("No news available");
            }

            const articles = data.articles.map(article => ({
                title: article.title,
                image: article.urlToImage || "",
                category: randomCategory
            }));

            setNewsItems(articles);
            setCurrentNews(articles[0]?.title || "No news available");
            setCurrentImage(articles[0]?.image || "");
            setCurrentCategory(randomCategory);

            // Save the latest news to local storage
            saveNewsToLocal(articles);

        } catch (error) {
            console.error("API failed, loading from local storage...");
            const localNews = loadNewsFromLocal();

            if (localNews.length > 0) {
                setNewsItems(localNews);
                setCurrentNews(localNews[0].title);
                setCurrentImage(localNews[0].image);
                setCurrentCategory(localNews[0].category);
            } else {
                setCurrentNews("No news available");
                setCurrentCategory("Unknown");
            }
        }
    };

    useEffect(() => {
        const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        fetchNews(randomCategory);
    }, []);

    useEffect(() => {
        if (newsItems.length === 0) return;

        const intervalId = setInterval(() => {
            setShowNews(false);
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * newsItems.length);
                setCurrentNews(newsItems[randomIndex].title);
                setCurrentImage(newsItems[randomIndex].image);
                setCurrentCategory(newsItems[randomIndex].category);
                setShowNews(true);
            }, 500);
        }, 7000);

        return () => clearInterval(intervalId);
    }, [newsItems]);

    return (
        <footer>
            <CSSTransition in={showNews} timeout={500} classNames="fade" unmountOnExit>
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
