// pages/Dashboard.js
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { Edit, Delete, Visibility, Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("libraryBooks")) || [];
    setBooks(storedBooks);
  }, []); // Empty dependency array to load only once

  const handleDelete = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    localStorage.setItem("libraryBooks", JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Library Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          component={Link}
          to="/create"
        >
          Add New Book
        </Button>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Published</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.publishedDate}</TableCell>
                <TableCell>
                  <Typography
                    color={
                      book.status === "available"
                        ? "success.main"
                        : "error.main"
                    }
                  >
                    {book.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton component={Link} to={`/book/${book.id}`}>
                      <Visibility color="info" />
                    </IconButton>
                    <IconButton component={Link} to={`/edit/${book.id}`}>
                      <Edit color="warning" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(book.id)}>
                      <Delete color="error" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Dashboard;
