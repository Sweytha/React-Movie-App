import React, { useState, useEffect } from "react";
import MovieBox from "./components/MovieBox";
import './App.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';

function App() {

  const url = "https://api.themoviedb.org/3/movie/popular?api_key=af2b53404c1277ec5aed13aa810e246e"

  const [movies, setMovie] = useState([])
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get(url).then((response) => {
      const json = response.data;
      return json
    }).then(data => { setMovie(data.results) })
  }, [])

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("Searching");
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=af2b53404c1277ec5aed13aa810e246e&query=${query}`;
      const res = await axios.get(url);
      const data = await res.data;
      console.log(data);
      setMovie(data.results);
    }
    catch (e) {
      console.log(e);
    }
  }

  const changeHandler = (e) => {
    setQuery(e.target.value);
  }

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">MovieDb App</Navbar.Brand>
          <Navbar.Brand href="/home">Trending</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

          <Navbar.Collapse id="nabarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: '100px' }}
              navbarScroll></Nav>

            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
                type="search"
                placeholder="Movie Search"
                className="me-2"
                aria-label="search"
                name="query"
                value={query} onChange={changeHandler}></FormControl>
              <Button variant="secondary" type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
        <div className="grid">
          {movies.map((movieReq) => <MovieBox key={movieReq.id} {...movieReq} />)}
        </div>
      </div>
    </>
  );
}

export default App;