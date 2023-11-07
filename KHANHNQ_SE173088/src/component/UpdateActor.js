import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Update() {
  const movies = useParams();

  const [open, setOpen] = useState(false);

  const [APIData, setAPIData] = useState([]);
  const getMoviessUrl = `https://6549e325e182221f8d52129a.mockapi.io/Lab7/${movies.id}`;

  useEffect(() => {
    fetch(getMoviessUrl)
      .then((response) => response.json())
      .then((data) => setAPIData(data))
      .catch((error) => console.log(error.message));
  }, [getMoviessUrl]);

  const handleClose = () => {
    setOpen(false);
  };
  const putMoviesUrl = "https://6549e325e182221f8d52129a.mockapi.io/Lab7";

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: APIData,

    // values : {APIData},

    onSubmit: (values) => {
      values.createdAt = new Date(values.createdAt);
      fetch(`${putMoviesUrl}/${movies.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => setOpen(true))
        .catch((error) => console.log(error.message));
    },

    validationSchema: Yup.object({
      title: Yup.string()
      .required("Required.")
      .min(3, "Must be more 2 characters"),
    trailer: Yup.string()
      .url()
      .required("Required.")
      .typeError("Please enter a url address"),
    image: Yup.string()
      .url()
      .required("Required.")
      .typeError("Please enter a url address"),
    year: Yup.number()
      .integer()
      .required("Required.")
      .typeError("Please enter a number"),
    nation: Yup.string()
      .required("Required.")
      .typeError("Please enter nation"),
      description: Yup.string()
      .required("Required."),
    }),
  });

  return (
    <div>
      <h1 className="font-pages">Update Actor Information</h1>

      <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.errors.title && (
            <Typography variant="caption" color="red">
              {formik.errors.title}
            </Typography>
          )}
          <TextField
            label="Trailer"
            name="trailer"
            value={formik.values.trailer}
            onChange={formik.handleChange}
          />
          {formik.errors.trailer && (
            <Typography variant="caption" color="red">
              {formik.errors.trailer}
            </Typography>
          )}
          <TextField
            label="Image"
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
          />
          {formik.errors.image && (
            <Typography variant="caption" color="red">
              {formik.errors.image}
            </Typography>
          )}

          <TextField
            label="Year"
            name="year"
            value={formik.values.year}
            onChange={formik.handleChange}
          />
          {formik.errors.year && (
            <Typography variant="caption" color="red">
              {formik.errors.year}
            </Typography>
          )}

          <TextField
            label="Nation"
            name="nation"
            value={formik.values.nation}
            onChange={formik.handleChange}
          />
          {formik.errors.nation && (
            <Typography variant="caption" color="red">
              {formik.errors.nation}
            </Typography>
          )}

          <TextField
            label="Description"
            name="description"
           
            value={formik.values.description}
            onChange={formik.handleChange}
          />

         
          {formik.errors.description && (
            <Typography variant="caption" color="red">
              {formik.errors.description}
            </Typography>
          )}
        </Stack>

        <Button variant="contained" size="small" type="submit">
          Save
        </Button>
      </form>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Congraturation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="success">
              <AlertTitle>Update successful!</AlertTitle>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              Dashboard
            </Link>
          </Button>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
