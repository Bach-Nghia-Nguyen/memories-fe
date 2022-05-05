import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Container } from "@material-ui/core";
import Navbar from "components/Navbar";
import HomePage from "pages/HomePage";
import Auth from "pages/Auth";
import PostDetails from "pages/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />

        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<HomePage />} />
          <Route path="/posts/search" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/posts" />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
