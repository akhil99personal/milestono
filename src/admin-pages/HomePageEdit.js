import React, { useState, useEffect } from "react";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import AdminNavbar from "./AdminNavbar";
import "./HomePageEdit.css";

function HomePageEdit() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [adLink, setAdLink] = useState("");
  const [newAdLink, setNewAdLink] = useState("");
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    name: "",
    paragraph: "",
    seeMore: "",
    tags: "",
    imageSrc: null,
  });

  useEffect(() => {
    const fetchAdLink = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/advertise`);
        setAdLink(response.data.ad || "");
      } catch (error) {
        console.error("Error fetching ad link:" + error);
      } finally {
        setLoading(false);
      }
    };

    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/articles`);
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:" + error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdLink();
    fetchArticles();
  }, []);

  const handleUpdateAdLink = async () => {
    try {
      setLoading(true);
      await axios.put(`${BASE_URL}/api/advertise`, { ad: newAdLink });
      setAdLink(newAdLink);
      setNewAdLink("");
      alert("Ad link updated successfully!");
    } catch (error) {
      console.error("Error updating ad link:" + error);
      alert("Failed to update ad link.");
    } finally {
      setLoading(false);
    }
  };

  const handleArticleChange = (e) => {
    const { name, value, files } = e.target;
    setNewArticle((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmitArticle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newArticle.name);
    formData.append("paragraph", newArticle.paragraph);
    formData.append("seeMore", newArticle.seeMore);
    formData.append("tags", newArticle.tags);
    if (newArticle.imageSrc) {
      formData.append("imageSrc", newArticle.imageSrc);
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/api/articles`, formData);
      setArticles([...articles, response.data.article]);
      setNewArticle({
        name: "",
        paragraph: "",
        seeMore: "",
        tags: "",
        imageSrc: null,
      });
      alert("Article created successfully!");
    } catch (error) {
      console.error("Error creating article:" + error);
      alert("Failed to create article.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/api/articles/${id}`);
      setArticles(articles.filter((article) => article._id !== id));
      alert("Article deleted successfully!");
    } catch (error) {
      console.error("Error deleting article:" + error);
      alert("Failed to delete article.");
    } finally {
      setLoading(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(10);

  const handleArticlesChange = (event) => {
    setArticlesPerPage(Number(event.target.value));
  };

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle,
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="table-container">
      <AdminNavbar />
      {loading ? (
        <div className="loading-center">
          <FadeLoader color="var(--primary-color)" />
        </div>
      ) : (
        <div className="admin-section">
          <div className="advertise-section">
            <h2 className="section-title">Manage Advertisement</h2>
            <div className="ad-form">
              <input
                type="text"
                className="ad-input"
                value={newAdLink}
                placeholder="Enter new ad link"
                onChange={(e) => setNewAdLink(e.target.value)}
              />
              <button onClick={handleUpdateAdLink} className="btn update-btn">
                Update Ad Link
              </button>
            </div>
            <p className="current-ad">Current Ad Link: {adLink}</p>
          </div>

          <div className="article-section">
            <h2 className="section-title">Post New Article</h2>
            <form onSubmit={handleSubmitArticle} className="article-form">
              <input
                type="text"
                name="name"
                className="article-input"
                value={newArticle.name}
                placeholder="Article Name"
                onChange={handleArticleChange}
                required
              />
              <textarea
                name="paragraph"
                className="article-textarea"
                value={newArticle.paragraph}
                placeholder="Article Paragraph"
                onChange={handleArticleChange}
                required
              />
              <textarea
                name="tags"
                className="article-textarea"
                value={newArticle.tags}
                placeholder="Article Tags{use # before each tag}"
                onChange={handleArticleChange}
                required
              />
              <input
                name="seeMore"
                type="text"
                className="article-seemore"
                value={newArticle.seeMore}
                placeholder="Enter news link"
                onChange={handleArticleChange}
              />
              <input
                type="file"
                name="imageSrc"
                className="article-file-input"
                id="article-file-choose"
                onChange={handleArticleChange}
                accept="image/*"
              />
              <button type="submit" className="btn submit-btn">
                Post Article
              </button>
            </form>

            <div className="admin-news-header-section">
              <h2 className="section-title">All Articles</h2>
              <select
                id="noOfArticlesAtATime"
                className="section-selects"
                onChange={handleArticlesChange}
                value={articlesPerPage}
              >
                <option value={10} selected disabled>
                  Choose no of articles at a time
                </option>
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
              </select>
            </div>
            <div className="articles-list">
              {currentArticles.map((article) => (
                <div key={article._id} className="article-item">
                  {article.imageSrc && (
                    <img
                      src={article.imageSrc}
                      alt={article.name}
                      className="article-image"
                    />
                  )}
                  <h3 className="article-name">{article.name}</h3>
                  <p className="article-paragraph">{article.paragraph}</p>
                  <p className="article-name">{article.seeMore}</p>
                  <p className="article-name">{article.tags}</p>
                  <p className="article-name">
                    {article.updatedDate &&
                      new Date(article.updatedDate).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                  </p>
                  <button
                    onClick={() => handleDeleteArticle(article._id)}
                    className="btn delete-btn"
                  >
                    Delete Article
                  </button>
                </div>
              ))}
            </div>

            <div className="pagination">
              <button
                className="page-button prev-next"
                disabled={currentPage === 1}
                onClick={handlePrevious}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`page-button ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="page-button prev-next"
                disabled={currentPage === totalPages}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePageEdit;
