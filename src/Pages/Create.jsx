// pages/CreateBook.js
import React from "react";
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

const CreateBook = () => {
  const handleSubmit = (values, { resetForm }) => {
    const newBook = { ...values, id: Date.now() };
    const storedBooks = JSON.parse(localStorage.getItem("libraryBooks")) || [];
    localStorage.setItem(
      "libraryBooks",
      JSON.stringify([...storedBooks, newBook])
    );
    resetForm();
    window.location.href = "/";
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" mb={3}>
        Add New Book
      </Typography>

      <Formik
        initialValues={{
          title: "",
          author: "",
          isbn: "",
          publishedDate: "",
          status: "available",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
            <SubmitButton>Create Book</SubmitButton>
          </Stack>
        </Form>
      </Formik>
    </Paper>
  );
};

export default CreateBook;
