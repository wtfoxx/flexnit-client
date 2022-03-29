import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movie, visibilityFilter } = props;
  let filteredMovies = movie;

  if (visibilityFilter !== '') {
    filteredMovies = movie.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movie) return <div className="main-view" />

  return <> 
    <Row className="justify-content-md-center">
      {filteredMovies.map(m => (
        <Col lg={4} md={6} sm="auto" key={m._id}>
          <MovieCard movie={m} />
        </Col>
      ))}
    </Row>
  </>;
}

export default connect(mapStateToProps)(MoviesList);