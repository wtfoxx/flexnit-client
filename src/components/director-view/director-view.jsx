import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './director-view.scss'
import { Container, Button, Card } from 'react-bootstrap';

export class DirectorView extends React.Component {

  render() {
    const { director } = this.props;

    return (
      <Container fluid="lg">
        <Card>
          <Card.Body>
            <Card.Title>{director.Name}</Card.Title>
            <Card.Text>{director.Bio}</Card.Text>
            <Link to={`/`}>
              <Button>Back</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}