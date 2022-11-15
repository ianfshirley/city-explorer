import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Main extends React.component {
  render() {
    return (
      <>
        <Form onSubmit={this.handleLocationSubmit}>
            <Form.Label>Search City</Form.Label>
            <Form.Control type="text" name ="city"placeholder="enter city..."/>
            <Button type="submit" >Explore!</Button>
          </Form>
      </>
    )
  }
}