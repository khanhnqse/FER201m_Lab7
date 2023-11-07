import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardContent } from "@mui/material";
import { Card, Grid } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { Box, Paper } from "@mui/material";

export default function Detail() {
  const movies = useParams();

  const [APIData, setAPIData] = useState([]);
  const getMoviesUrl = `https://6549e325e182221f8d52129a.mockapi.io/Lab7/${movies.id}`;

  useEffect(() => {
    fetch(getMoviesUrl, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAPIData(data);
      })
      .catch((error) => console.log(error.message));
  }, [getMoviesUrl]);

  return (
    <div style={{ padding: "10px" }}>
      <h1 className="detail-title">Detail</h1>
      <Grid container rowSpacing={2}>
        <Grid
          className="parent"
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Card className="child" sx={{ maxWidth: 570, flex: 1 }}>
            <CardMedia
              sx={{ height: 600 }}
              image={APIData.image}
              title="green iguana"
            />
          </Card>

          <Box
            component={Paper}
            width="50%"
            padding="2em"
            margin="1em auto"
            elevation={3}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <strong>Name:</strong> {APIData.title}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                <strong>Information:</strong> {APIData.description}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                <strong>Year:</strong> {APIData.year}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                <strong>Nation:</strong> {APIData.nation}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                <br />
                <strong>Trailer {APIData.title} : </strong>
                <br />
                <iframe
                  width="660"
                  height="360"
                  src={APIData.trailer}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
