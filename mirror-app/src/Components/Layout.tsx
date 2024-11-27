import React, { useState, useEffect } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

interface Weather {
  main: {
    temp: number;
    humidity: number; // Add humidity to Weather interface
  };
  weather: {
    main: string;
    description: string;
  }[];
  sys: {
    sunrise: number;
    sunset: number;
  };
  wind: {
    speed: number; // Add wind speed to Weather interface
  };
}

const Layout: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string>(''); // Error state
  const [news, setNews] = useState<any[]>([]); // State for news articles

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=LOCATION&appid=44ad295b11a49c60d67d1b7759a02ab8&units=metric`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data as Weather);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    document.title = "Smart Mirror"; // Change the window title here
  }, []);

  // Fetching news from News API
  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=bcc0606b6cc1470da7d4636136c38ef2`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch news data');
        }
        return response.json();
      })
      .then((data) => setNews(data.articles))
      .catch((error) => console.error('Error fetching news:', error));
  }, []);

  const getWeatherIcon = () => {
    if (!weather) return '';

    const isDaytime = time.getTime() / 1000 > weather.sys.sunrise && time.getTime() / 1000 < weather.sys.sunset;

    switch (weather.weather[0].main) {
      case 'Clouds': return isDaytime ? '☁️' : '🌑';
      case 'Clear': return isDaytime ? '☀️' : '🌙';
      case 'Rain': return isDaytime ? '🌦️' : '🌧️';
      case 'Snow': return '❄️';
      default: return isDaytime ? '🌈' : '🌌';
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#000',
      color: '#FFF',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
    },
    clock: {
      marginBottom: '20px',
      transform: 'scale(1.5)',
      color: '#FFD700', // Change clock color to gold
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background for contrast
      borderRadius: '10px', // Rounded corners for the clock
      padding: '10px', // Padding around the clock
    },
    weatherContainer: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      textAlign: 'center' as 'center',
      marginBottom: '20px',
      fontSize: '1.2em',
    },
    additionalInfo: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '80%',
      borderTop: '1px solid #555',
      paddingTop: '20px',
    },
    additionalItem: {
      textAlign: 'center' as 'center',
      fontSize: '1em',
    },
    newsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', // Responsive grid
      gap: '20px',
      marginTop: '20px',
      width: '100%',
      padding: '0 20px',
    },
    newsCard: {
      backgroundColor: '#333',
      borderRadius: '8px',
      padding: '10px',
      color: '#FFF',
      textAlign: 'center' as 'center',
    },
    newsImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.clock}>
        <Clock value={time} />
      </div>
      <div style={styles.weatherContainer}>
        {loading ? (
          <p>Loading weather...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <>
            <div>{getWeatherIcon()}</div>
            <div>{weather?.main?.temp}°C</div>
            <div>{weather?.weather[0]?.description}</div>
          </>
        )}
      </div>
      <div style={styles.additionalInfo}>
        <div style={styles.additionalItem}>
          <p>Humidity-ATRAXIA</p>
          <p>{weather ? `${weather.main.humidity}%` : '-'}</p>
        </div>
        <div style={styles.additionalItem}>
          <p>Wind</p>
          <p>{weather ? `${weather.wind.speed} m/s` : '-'}</p>
        </div>
        <div style={styles.additionalItem}>
          <p>Sunrise</p>
          <p>{weather ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString() : '-'}</p>
        </div>
        <div style={styles.additionalItem}>
          <p>Sunset</p>
          <p>{weather ? new Date(weather.sys.sunset * 1000).toLocaleTimeString() : '-'}</p>
        </div>
      </div>
      {/* News Section */}
      <div style={styles.newsContainer}>
        {news.length > 0 ? (
          news.map((article, index) => (
            <div style={styles.newsCard} key={index}>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  style={styles.newsImage}
                />
              )}
              <h4>{article.title}</h4>
              <p>{article.description}</p>
            </div>
          ))
        ) : (
          <p>No news available</p>
        )}
      </div>
    </div>
  );
};

export default Layout;
