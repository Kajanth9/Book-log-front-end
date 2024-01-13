import React, { useState } from "react";
import axios from "axios";

const AddBookForm = () => {
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    language: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending data to the backend using Axios
      const response = await axios.post(
        "http://localhost:4000/books/create-book",
        bookDetails
      );

      // Log the response or handle it as needed
      console.log(response.data);

      // Optionally, reset the form after successful submission
      setBookDetails({
        title: "",
        author: "",
        language: "",
      });
    } catch (error) {
      // Handle errors
      console.error("Error submitting book details:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Add Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={bookDetails.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Add Author
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            value={bookDetails.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="language" className="form-label">
            Add Language
          </label>
          <input
            type="text"
            className="form-control"
            id="language"
            name="language"
            value={bookDetails.language}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
