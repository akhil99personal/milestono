import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import toast from "react-hot-toast";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";

function GalleryImages() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
  });
  const [editIndex, setEditIndex] = useState(null);
  const [gallerys, setGallerys] = useState([]);

  const totalPages = Math.ceil(gallerys.length / rowsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const fetchGallerys = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/gallery`);
      setGallerys(response.data);
    } catch (error) {
      console.error("Error fetching problems:" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      data.append(
        "formData",
        JSON.stringify({
          title: formData.title,
        }),
      );
      data.append("image", formData.image);
      if (editIndex) {
        await axios.put(`${BASE_URL}/api/gallery/${editIndex}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Gallery updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/api/gallery`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Gallery created successfully!");
      }
      setFormData({
        title: "",
        image: null,
      });
      setEditIndex(null);
      fetchGallerys();
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setFormData(project);
    setEditIndex(project._id);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/api/gallery/${id}`);
      setGallerys(gallerys.filter((gallery) => gallery._id !== id));
      toast.success("Gallery deleted successfully!");
      fetchGallerys();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete Gallery.");
    } finally {
      setLoading(false);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchGallerys();
  }, []);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedData = gallerys.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="table-container">
      <AdminNavbar />
      {loading ? (
        <div className="loading-center">
          <FadeLoader color="var(--primary-color)" />
        </div>
      ) : (
        <div className="admin-section">
          <h1 className="section-title">Add Gallery Images</h1>
          <form className="project-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Gallery Name"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <input
              className="article-file-input"
              type="file"
              name="image"
              onChange={handleFileChange}
              required
            />
            <p style={{ margin: "10px 0", marginBottom: "20px", color: "red" }}>
              Note : Image Aspect Ratio Should As 5464 x 2399 OR 3623 x 3624
              pixels
            </p>
            <button type="submit">Add Detail</button>
          </form>

          <div className="admin-news-header-section">
            <h2 className="section-title">All Gallery Images</h2>
            <select
              className="section-selects"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value={5}>Choose rows per page</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Title</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={item.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{item.title}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "100px",
                        height: "50px",
                        cursor: "pointer",
                      }}
                      onClick={() => window.open(item.image, "_blank")}
                    />
                  </td>
                  <td>
                    <div
                      className="project-card"
                      style={{
                        width: "20px",
                        display: "flex",
                        background: "white",
                        boxShadow: "none",
                        textAlign: "center",
                      }}
                    >
                      <button onClick={() => handleEdit(item)}>Edit</button>
                      <button onClick={() => handleDelete(item._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              className="page-button prev-next"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`page-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="page-button prev-next"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryImages;
