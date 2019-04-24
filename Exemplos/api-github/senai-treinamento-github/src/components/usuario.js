import React, { Component } from "react";
import {
    Card
  } from "react-bootstrap";
class Username extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={this.props.dadosusuario.avatar_url} />
        <Card.Body>
          <Card.Title>{this.props.dadosusuario.login}</Card.Title>
          <Card.Text>{this.props.dadosusuario.bio}</Card.Text>
          <a href={this.props.dadosusuario.html_url} target="_blank">
            {this.props.dadosusuario.html_url}
          </a>
        </Card.Body>
      </Card>
    );
  }
}

export default Username;
