import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './genre-view.scss'
import { Container, Button, Card } from 'react-bootstrap';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container fluid="lg">
        <Card>
          <Card.Body>
            <Card.Title>{genre.Name}</Card.Title>
            <Card.Text>{genre.Description}</Card.Text>
            <Button onClick={() => { onBackClick(); }}>Back</Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}