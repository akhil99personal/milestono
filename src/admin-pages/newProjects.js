import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import "./newProjects.css";
import toast from "react-hot-toast";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";

function NewProjects() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    type: "Residential",
    image: null,
    title: "",
    description: "",
    address: "",
    date: "",
    price: "",
    ownerName: "",
    firmName: "",
    firmAddress: "",
    contactNo: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customRows, setCustomRows] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching problems:" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const totalPages = Math.ceil(projects.length / rowsPerPage);

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      project.title.toLowerCase().includes(query) ||
      project.date.includes(query);
    const matchesType = filterType === "All" || project.type === filterType;
    return matchesQuery && matchesType;
  });

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
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
          type: formData.type,
          title: formData.title,
          description: formData.description,
          address: formData.address,
          date: formData.date,
          price: formData.price,
          ownerName: formData.ownerName,
          firmName: formData.firmName,
          firmAddress: formData.firmAddress,
          contactNo: formData.contactNo,
        }),
      );
      data.append("projectImage", formData.image);
      if (editIndex) {
        await axios.put(`${BASE_URL}/api/projects/${editIndex}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Project updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/api/project`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Project created successfully!");
      }
      setFormData({
        type: "",
        title: "",
        description: "",
        address: "",
        date: "",
        price: "",
        image: null,
        ownerName: "",
        firmName: "",
        firmAddress: "",
        contactNo: "",
      });
      setEditIndex(null);
      fetchProjects();
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
      await axios.delete(`${BASE_URL}/api/projects/${id}`);
      setProjects(projects.filter((project) => project._id !== id));
      toast.success("Project deleted successfully!");
      fetchProjects();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete Project.");
    } finally {
      setLoading(false);
    }
  };

  const handleRowsPerPageChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setIsModalOpen(true);
    } else {
      setRowsPerPage(parseInt(value, 10));
      setCurrentPage(1);
    }
  };

  const handleCustomRowsChange = (e) => {
    setCustomRows(e.target.value);
  };

  const handleSaveCustomRows = () => {
    const rows = parseInt(customRows, 10);
    if (!isNaN(rows) && rows > 0) {
      setRowsPerPage(rows);
      setCurrentPage(1);
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
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
          <div className="article-section">
            <h2 className="section-title">Post New Projects</h2>
            <form className="project-form" onSubmit={handleSubmit}>
              <label>
                Project Type:
                <div className="project-form-radio-group">
                  <input
                    type="radio"
                    name="type"
                    value="Residential"
                    checked={formData.type === "Residential"}
                    onChange={handleInputChange}
                  />
                  Residential
                </div>
                <div className="project-form-radio-group">
                  <input
                    type="radio"
                    name="type"
                    value="Commercial"
                    checked={formData.type === "Commercial"}
                    onChange={handleInputChange}
                  />
                  Commercial
                </div>
              </label>
              <input
                type="file"
                name="image"
                onChange={handleInputChange}
                className="article-file-input"
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="ownerName"
                placeholder="Owner Name"
                value={formData.ownerName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="firmName"
                placeholder="Firm Name"
                value={formData.firmName}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="firmAddress"
                placeholder="Firm Address"
                value={formData.firmAddress}
                onChange={handleInputChange}
                required
              ></textarea>
              <input
                type="tel"
                name="contactNo"
                placeholder="Contact Number"
                value={formData.contactNo}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
              ></textarea>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
              <button type="submit">
                {editIndex !== null ? "Update Project" : "Post Project"}
              </button>
            </form>

            <div className="admin-news-header-section">
              <h2 className="section-title">All Projects</h2>
              <select
                id="rowsPerPage"
                className="section-selects"
                onChange={handleRowsPerPageChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div style={{ display: "flex", minWidth: "100%", gap: "10px" }}>
              <input
                type="text"
                placeholder="Search Projects by Name, Type, or Date"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  width: "80%",
                  minHeight: "40px",
                  borderRadius: "9px",
                  border: "1px solid black",
                  padding: "10px 15px",
                  fontSize: "1rem",
                }}
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{
                  width: "20%",
                  minHeight: "40px",
                  borderRadius: "9px",
                  border: "1px solid black",
                  padding: "10px 15px",
                  fontSize: "1rem",
                }}
              >
                <option value="All">All</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            <div className="project-list">
              {paginatedProjects.map((project, index) => (
                <div className="project-card" key={index}>
                  {project.image && <img src={project.image} alt="Project" />}
                  <h3>{project.title}</h3>
                  <p>Type: {project.type}</p>
                  <p>Owner Name: {project.ownerName}</p>
                  <p>Firm Name: {project.firmName}</p>
                  <p>Firm Address: {project.firmAddress}</p>
                  <p>Contact Number: {project.contactNo}</p>
                  <p>Description: {project.description}</p>
                  <p>Address: {project.address}</p>
                  <p>Date: {new Date(project.date).toLocaleDateString()}</p>
                  <p>Price: ₹{project.price}</p>
                  <div style={{ textAlign: "center" }}>
                    <button onClick={() => handleEdit(project)}>Edit</button>
                    <button onClick={() => handleDelete(project._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination">
              <div className="pagination">
                {projects.length > 0 && (
                  <>
                    <button
                      className="page-button prev-next"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`page-button ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      className="page-button prev-next"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enter Custom Rows Per Page</h3>
            <input
              type="number"
              min="1"
              className="custom-rows-input"
              value={customRows}
              onChange={handleCustomRowsChange}
              placeholder="Enter a number"
            />
            <div className="modal-buttons">
              <button className="save-btn" onClick={handleSaveCustomRows}>
                Save
              </button>
              <button className="cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewProjects;
