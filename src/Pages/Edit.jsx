// pages/EditBook.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, Typography, Stack } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormTextField from "../Components/FormTextField";
import FormSelect from "../Components/FormSelect";
import SubmitButton from "../Components/SubmitButton";

const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  author: Yup.string().required("Required"),
  isbn: Yup.string()
    .required("Required")
    .matches(/^\d{13}$/, "Must be 13 digits"),
  publishedDate: Yup.date().required("Required"),
  status: Yup.string().required("Required"),
});

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedDate: "",
    status: "available",
  });

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("libraryBooks")) || [];
    const book = storedBooks.find((b) => b.id === Number(id));
    if (book) {
      setInitialValues({
        title: book.title || "",
        author: book.author || "",
        isbn: book.isbn || "",
        publishedDate: book.publishedDate || "",
        status: book.status || "available",
      });
    } else {
      console.error("Book not found");
      navigate("/");
    }
  }, [id, navigate]);

  const handleSubmit = (values) => {
    const storedBooks = JSON.parse(localStorage.getItem("libraryBooks")) || [];
    const updatedBooks = storedBooks.map((book) =>
      book.id === Number(id) ? { ...book, ...values } : book
    );

    localStorage.setItem("libraryBooks", JSON.stringify(updatedBooks));
    navigate("/");
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" mb={3}>
        Edit Book
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form>
          <Stack spacing={3}>
            <FormTextField name="title" label="Title" />
            <FormTextField name="author" label="Author" />
            <FormTextField name="isbn" label="ISBN" />
            <FormTextField
              name="publishedDate"
              label="Published Date"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <FormSelect
              name="status"
              label="Status"
              options={[
                { value: "available", label: "Available" },
                { value: "checked-out", label: "Checked Out" },
                { value: "maintenance", label: "Maintenance" },
              ]}
            />
            <SubmitButton>Save Changes</SubmitButton>
          </Stack>
        </Form>
      </Formik>
    </Paper>
  );
};

export default EditBook;
