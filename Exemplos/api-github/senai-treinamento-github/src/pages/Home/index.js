import React, { Component } from "react";
import Usuario from "../../components/usuario";
import Repositorios from "../../components/repositorios";
import Config from '../../util/config';
import Loading from '../../components/loading'

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
    this.setState({ loading: true })
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

    const urlUsuario = Config.url + this.state.username + "?clientid=" + Config.tokenclientid + "&clientsecret=" + Config.tokenclientsecret;

    const urlRepositorio =  Config.url + this.state.username + "/repos?clientid=" + Config.tokenclientid + "&clientsecret=" + Config.tokenclientsecret;

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
          repositorios: [],
          loading : false,
          loadingmessage : 'Buscando GitHub'
        });
        return;
      });

    axios
      .get(urlRepositorio)
      .then(resposta => {
        this.setState({ repositorios: resposta.data });
      })
      .catch(erro => console.log(erro));
    
    this.setState({ loading: false })
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    const { loading } = this.state.loading;
    const { loadingmessage } = this.state.loadingmessage;

    return (
      <div>
        <Menu />
        <br />
        <br />
        <Container>
          <Loading loading={loading} message={loadingmessage} />
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
