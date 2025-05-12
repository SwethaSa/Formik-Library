// pages/View.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography, Stack, Chip, Button } from "@mui/material";
import { Link } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("libraryBooks")) || [];
    const foundBook = storedBooks.find((b) => b.id === Number(id));
    setBook(foundBook);
  }, [id]);

  if (!book) return <Typography>Loading...</Typography>;

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Stack spacing={2}>
        <Typography variant="h4">{book.title}</Typography>
        <Typography>Author: {book.author}</Typography>
        <Typography>ISBN: {book.isbn}</Typography>
        <Typography>Published Date: {book.publishedDate}</Typography>
        <Chip
          label={book.status}
          color={
            book.status === "available"
              ? "success"
              : book.status === "checked-out"
              ? "warning"
              : "error"
          }
        />
        <Button
          variant="contained"
          component={Link}
          to={`/edit/${id}`}
          sx={{ mt: 2 }}
        >
          Edit Book
        </Button>
      </Stack>
    </Paper>
  );
};

export default View;
