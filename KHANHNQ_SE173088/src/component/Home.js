import { CardMedia } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import useTheme from "@mui/material/styles/useTheme";

export default function Home() {
  const [APIData, setAPIData] = useState([]);
  const getMoviesUrl = "https://6549e325e182221f8d52129a.mockapi.io/Lab7";
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userName = params.get("id");
  const theme = useTheme()
  useEffect(() => {
    fetch(getMoviesUrl)
      .then((response) => response.json())
      .then((data) => {
        setAPIData(
          data.sort((a, b) => {
            return a.age - b.age;
          })
        );
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <Grid bgcolor={theme.palette.mode === "dark" ? "#121212" : "white"} container spacing={3} sx={{ marginTop: "0", marginBottom: "5rem", padding: "2rem", justifyContent: 'center' }} >
    <div style={{ padding: "20px" }}>
      <Typography
        variant="h4"
        style={{ marginTop: "60px", zIndex: 1, color: "GrayText" }}
      >
        Home
      </Typography>
      {userName && (
        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          Welcome, {userName}!
        </Typography>
      )}
      <Typography variant="body1" style={{ marginBottom: "20px" }}>
        This is the Home page. It displays a list of the movie.
      </Typography>
      <Grid container spacing={3}>
        {APIData.map((movies) => (
          <Grid item xs={12} sm={6} md={4} key={movies.id}>
            <Card style={{ height: "100%" }}>
              <CardMedia
                style={{ height: "450px" }}
                image={movies.image}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <Link to={`detail/${movies.id}`}>
                    <a style={{ textDecoration: "none", color: "#000" }}>
                      {movies.title}
                    </a>
                  </Link>
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {movies.year}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {movies.nation}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={`detail/${movies.id}`}>
                  <Button variant="contained" color="primary">
                    Detail
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
    </Grid>
  );
}
