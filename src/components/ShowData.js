import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const BooksTable = () => {
    const [books, setBooks] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState({});
    const [editedBook, setEditedBook] = useState({
      title: '',
      author: '',
      language: '',
    });


  useEffect(() => {
    // Fetch all books when the component mounts
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/books');
      setBooks(response.data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleBookAdded = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setEditedBook({
      title: book.title,
      author: book.author,
      language: book.language,
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`http://localhost:4000/books/update-book/${selectedBook._id}`, editedBook);
      setShowEditModal(false);
      fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:4000/books/delete-book/${selectedBook._id}`);
      setShowDeleteModal(false);
      fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Books Table</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Language</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
                
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.language}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditClick(book)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteClick(book)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={editedBook.title}
                onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                value={editedBook.author}
                onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLanguage">
              <Form.Label>Language</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter language"
                value={editedBook.language}
                onChange={(e) => setEditedBook({ ...editedBook, language: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the book "{selectedBook.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BooksTable;
