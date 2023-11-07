import React from "react";
import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import { green } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { Paper, TableContainer } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Dashboard() {
  const [APIData, setAPIData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelSucDia, setOpenDelSucDia] = useState(false);
  const [idDelete, setIdDelete] = useState(-1);
  const getMoviesUrl = "https://6549e325e182221f8d52129a.mockapi.io/Lab7";
  const deleteMoviesUrl = `https://6549e325e182221f8d52129a.mockapi.io/Lab7`;

  useEffect(() => {
    loadmovies();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setOpenDelSucDia(false);
    loadmovies();
  };

  const deleteMovies = () => {
    setOpen(false);
    fetch(deleteMoviesUrl + `/${idDelete}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => setOpenDelSucDia(true))
      .catch((error) => console.log(error.message));
  };

  const showConfirmDeleteDialog = (id) => {
    setIdDelete(id);
    setOpen(true);
  };

  const loadmovies = () => {
    fetch(getMoviesUrl)
      .then((response) => response.json())
      .then((data) => {
        setAPIData(
          data.sort((a, b) => {
            return a.id - b.id;
          })
        );
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <h1 className="font-pages">Dashboard</h1>
      <p className="dashboard-content">
        Dashboard
      </p>

      <TableContainer component={Paper} style={{ paddingBottom: "10px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="left">Trailer</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Year</TableCell>
              <TableCell align="left">Nation</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {APIData.map((movies) => (
              <TableRow
                key={movies.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {movies.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {movies.title}
                </TableCell>
                <TableCell align="left">{movies.trailer}</TableCell>
                <TableCell align="right">
                  <Avatar align="left" alt="Remy Sharp" src={movies.image} />
                </TableCell>
                <TableCell align="left">{movies.year}</TableCell>
                <TableCell align="left">{movies.nation}</TableCell>
                <TableCell align="left">{movies.description}</TableCell>
                <TableCell align="left">
                  <Stack direction="row" spacing={3}>
                    {/* <Link to="/add">
                      <IconButton>
                        <Icon sx={{ color: green[500] }}>add_circle</Icon>
                      </IconButton>
                    </Link> */}

                    <Link to={`/update/${movies.id}`}>
                      <IconButton>
                        <Icon sx={{ color: green[500] }}>update_circle</Icon>
                      </IconButton>
                    </Link>

                    <IconButton
                      onClick={(e) => {
                        showConfirmDeleteDialog(movies.id);
                      }}
                    >
                      <Icon sx={{ color: green[500] }}>delete_circle</Icon>
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Link to="/add">
        <Button variant="contained" color="success" sx={{ margin: "10px 0" }}>
          Add new Movie
        </Button>
      </Link>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Movie"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="warning">
              <AlertTitle>Are you sure to delete this Movies ?</AlertTitle>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteMovies}>Yes</Button>
          <Button autoFocus onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelSucDia}
        onClose={handleOk}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Message"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="success">
              <AlertTitle>Delete Successfully</AlertTitle>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
