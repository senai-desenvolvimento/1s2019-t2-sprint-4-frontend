import React, { Component } from "react";

import { Table } from "react-bootstrap";

class Repositorios extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {this.props.repositorios.map(repos => {
            return (
              <tr key={repos.id}>
                <td>{repos.name}</td>
                <td>{repos.description}</td>
                <td>
                  <a href={repos.html_url} target="_blank">
                    {repos.html_url}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default Repositorios;
