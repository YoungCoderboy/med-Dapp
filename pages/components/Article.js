import React, { useState, useEffect } from "react";
import logo from "./logo.png";

import axios from "axios";
// Sample news data with 10 elements

function Article() {
  const url =
    "https://newsapi.org/v2/everything?q=healthcare&sortBy=publishedAt&apiKey=be87e6e7b44b49aeb4e67770508ac240";

  const [Data, setData] = useState([]);

  const getFeeds = async () => {
    try {
      const response = await axios.get(url);
      const result = await response.data;
      setData(result.articles);
      Data.slice(20);
      console.log(Data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeeds();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [ministryFilter, setMinistryFilter] = useState("All"); // Default to show all ministries
  const [sentimentSort, setSentimentSort] = useState("All"); // Default to no sorting

  // Apply filters based on search, ministry, and sentiment

  // Calculate the total number of pages
  const totalPages = Math.ceil(2);

  // Ensure currentPage is within a valid range
  const validPage = Math.min(Math.max(currentPage, 1), totalPages);

  // Calculate the index of the first and last items to display on the current page

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App bg-[#ffffff] pt-7">
      <div className="mb-4 ml-8">
        <input
          type="text"
          placeholder="Search news..."
          className="px-2 py-1 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="ml-4 px-2 py-1 border rounded-3xl"
          value={ministryFilter}
          onChange={(e) => setMinistryFilter(e.target.value)}
        >
          <option value="All">All Ministries</option>
          {/* Replace with actual ministries */}
          <option value="Ministry of Health">Ministry of Health</option>
          <option value="Ministry of Finance">Ministry of Finance</option>
          {/* Add more ministries here */}
        </select>
        <select
          className="ml-4 px-2 py-1 border rounded"
          value={sentimentSort}
          onChange={(e) => setSentimentSort(e.target.value)}
        >
          <option value="All">Filter by Sentiment</option>
          <option value="Positive">Positive</option>
          <option value="Neutral">Neutral</option>
          <option value="Negative">Negative</option>
        </select>
      </div>
      {Data.map((news, id) => {
        return (
          <div
            key={id}
            className="bg-[#f0f0f1] p-4 rounded shadow-md flex space-x-4 border-4   mx-6 mb-7"
          >
            <img
              src={news.urlToImage}
              alt={news.title}
              className="w-60 h-52 border-4 border-white mr-8 rounded-3xl"
            />
            <div className="w-3/4">
              <h2 className="text-3xl font-semibold text-black mb-4">
                {news.title}
              </h2>
              {/* <p className="text-white text-l mb-2">{news.summary}</p>
              <p className="text-white text-xl mb-2">
                Ministry: {news.ministry}
              </p> */}
              <p className="text-black text-xl mb-2">Content: {news.content}</p>
            </div>
          </div>
        );
      })}
      <div className="flex">
        <div className="text-white mr-8  pt-4 ml-8 text-xl">
          <h2>Page no : </h2>
        </div>
        <div className="mt-4 ">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-2 mr-2 rounded ${
                validPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Article;
