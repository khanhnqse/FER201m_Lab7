import React, { useState } from "react";
import { Box, TextField, Button, Alert } from "@mui/material";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: Send the form data to your server using a POST request
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      style={{ paddingTop: "100px", margin: "0 auto", maxWidth: "500px" }}
    >
      <h1>Contact Us</h1>
      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        label="Message"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ marginBottom: "30px" }}
      >
        Submit
      </Button>
      {isSubmitted && (
        <Alert severity="success" style={{ margin: "20px" }}>
          Your message has been submitted successfully!
        </Alert>
      )}
    </Box>
  );
};

export default Contact;
