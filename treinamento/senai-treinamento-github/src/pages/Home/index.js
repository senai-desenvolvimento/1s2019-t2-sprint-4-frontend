import React, { Component } from "react";
import Usuario from "../../components/usuario";
import Repositorios from "../../components/repositorios";

import {
  Container,
  Col,
  Form,
  Button,
  FormGroup,
  Row,
  Modal
} from "react-bootstrap";
import Menu from "../../components/menu";
import axios from "axios";

class Index extends Component {
  constructor(props) {
    super(props);

    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.state = {
      username: "",
      usuariovalido: false,
      showModal: false,
      titulo: "",
      mensagem: "",
      dadosusuario: null,
      repositorios: []
    };
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.username);
    if (this.state.username == "") {
      this.setState({
        titulo: "Erouuuu",
        mensagem: "Informe o nome do usuário",
        showModal: true,
        username: "",
        dadosusuario: null,
        repositorios: []
      });
      return;
    }

    const urlUsuario =
      "https://api.github.com/users/" +
      this.state.username +
      "?client_id=clientidgithub&client_secret=clientsecretgithub";

    const urlRepositorio =
      "https://api.github.com/users/" +
      this.state.username +
      "/repos?client_id=clientidgithub&client_secret=clientsecretgithub";

    axios
      .get(urlUsuario)
      .then(resposta => {
        this.setState({ dadosusuario: resposta.data });
      })
      .catch(erro => {
        this.setState({
          titulo: "Erouuuu",
          mensagem: "Usuário não encontrado",
          showModal: true,
          username: "",
          dadosusuario: null,
          repositorios: []
        });
        return;
      });

    axios
      .get(urlRepositorio)
      .then(resposta => {
        this.setState({ repositorios: resposta.data });
      })
      .catch(erro => console.log(erro));
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    return (
      <div>
        <Menu />
        <br />
        <br />
        <Container>
          <Form noValidate onSubmit={e => this.handleSubmit(e)}>
            <Form.Row>
              <FormGroup>
                <Form.Label>Username</Form.Label>
              </FormGroup>
              <Form.Group as={Col} md="8" controlId="validationFormik01">
                <Form.Control
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange.bind(this)}
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <FormGroup>
                <Button type="submit">Buscar</Button>
              </FormGroup>
            </Form.Row>
          </Form>
          <Row>
            <Col xs={3}>
              {this.state.dadosusuario != null && (
                <Usuario dadosusuario={this.state.dadosusuario} />
              )}
            </Col>
            <Col xs={9}>
              {this.state.repositorios.length > 0 && (
                <Repositorios repositorios={this.state.repositorios} />
              )}
            </Col>
          </Row>
          <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.mensagem}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleCloseModal}>
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default Index;
