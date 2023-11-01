import React, { useState } from 'react';

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const apiKey = "pub_306822e986e8ba8c6841472f8bd26b0eba9b3"; 

  const fetchNews = async () => {
    try {
      const response = await fetch(`https://api.newsdata.io/v1/news?apikey=${apiKey}&q=gaming`);
      if (!response.ok) {
        throw new Error('Failed to fetch news data');
      }
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='newsMain'>
      <button onClick={fetchNews}>Fetch News</button>
      <ul>
        {newsData.slice(0, 3).map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <strong>{article.title}</strong>
            </a>
            {article.image && (
              <img className="newsImg" src={article.image} alt={article.title} />
            )}
            <p className='newsDescription'>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
