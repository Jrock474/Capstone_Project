import React, { useState } from 'react';

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const apiKey = "1f03aff0ade84d56aff9e17c77b3f878";
//news api used: https://newsapi.org/
  const fetchNews = async () => {
    const response = await fetch(`https://newsapi.org/v2/everything?q=gaming&apiKey=${apiKey}`);
    const data = await response.json();
    setNewsData(data.articles);
  };

  return (
    <div>
      <button onClick={fetchNews}>Fetch News</button>
      <ul>
        {newsData.slice(0,3).map((article, index) => (
          <li key={index}>
            <strong>{article.title}</strong>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;