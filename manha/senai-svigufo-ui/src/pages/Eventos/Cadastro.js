import React, { Component } from "react";
import Rodape from "../../components/Rodape/Rodape";
import Header from "../../components/Cabecalho";

import axios from "axios";
import apiService from "../../services/apiService";

class Cadastro extends Component {
  constructor() {
    super();

    this.state = {
      titulo: "",
      dataEvento: "",
      acessoLivre: "",
      tipoEventoId: "",
      instituicaoId: 1,
      descricao: "",
      listaTiposEventos: [],
      listaEventos: []
    };
  }

  componentDidMount() {
    apiService
      .call("tiposeventos")
      .getAll()
      .then(data => {
        this.setState({ listaTiposEventos: data.data });
      });

    apiService
      .call("eventos")
      .getAll()
      .then(data => {
        this.setState({ listaEventos: data.data });
      });
  }

  atualizaEstadoTitulo(event) {
    this.setState({ titulo: event.target.value });
  }

  atualizaEstadoDataEvento(event) {
    this.setState({ dataEvento: event.target.value });
  }

  atualizaEstadoAcessoLivre(event) {
    this.setState({ acessoLivre: event.target.value });
  }

  atualizaEstadoTipoEvento(event) {
    this.setState({ tipoEventoId: event.target.value });
  }

  atualizaEstadoDescricao(event) {
    this.setState({ descricao: event.target.value });
  }

  cadastraEvento(event) {
    event.preventDefault();

    let evento = {
      titulo: this.state.titulo,
      dataEvento: this.state.dataEvento,
      acessoLivre: this.state.acessoLivre,
      tipoEventoId: this.state.tipoEventoId,
      instituicaoId: this.state.instituicaoId,
      descricao: this.state.descricao
    };

    axios.post("http://192.168.4.112:5000/api/tiposeventos");

    console.log(evento);
  }

  render() {
    return (
      <div>
        <Header />
        <main className="conteudoPrincipal">
          <section className="conteudoPrincipal-cadastro">
            <h1 className="conteudoPrincipal-cadastro-titulo">Eventos</h1>
            <div className="container" id="conteudoPrincipal-lista">
              <table id="tabela-lista">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Evento</th>
                    <th>Data</th>
                    <th>Acesso Livre</th>
                    <th>Tipo do Evento</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.listaEventos.map(element => {
                    return (
                      <tr key={element.id}>
                        <td>{element.id}</td>
                        <td>{element.titulo}</td>
                        <td>{element.dataEvento}</td>
                        <td>{element.acessoLivre ? "Sim" : "Não"}</td>
                        <td>{element.tipoEvento.nome}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="container" id="conteudoPrincipal-cadastro">
              <h2 className="conteudoPrincipal-cadastro-titulo">
                Cadastrar Evento
              </h2>
              <form onSubmit={this.cadastraEvento.bind(this)} noValidate>
                <div className="container">
                  <input
                    type="text"
                    id="evento__titulo"
                    value={this.state.titulo}
                    onChange={this.atualizaEstadoTitulo.bind(this)}
                    placeholder="título do evento" required
                  />
                  <input
                    type="date"
                    id="evento__data"
                    onChange={this.atualizaEstadoDataEvento.bind(this)}
                    value={this.state.dataEvento}
                    placeholder="dd/MM/yyyy" required
                  />

                  <select
                    id="option__acessolivre"
                    value={this.state.acessoLivre}
                    onChange={this.atualizaEstadoAcessoLivre.bind(this)} required
                  >
                    <option>Selecione</option>
                    <option value="1">Livre</option>
                    <option value="0">Restrito</option>
                  </select>

                  <select
                    id="option__tipoevento"
                    value={this.state.tipoEventoId}
                    onChange={this.atualizaEstadoTipoEvento.bind(this)} required
                  >
                    <option>Selecione</option>
                    {this.state.listaTiposEventos.map(element => {
                      return (
                        <option key={element.id} value={element.id}>
                          {element.nome}
                        </option>
                      );
                    })}
                  </select>
                  <textarea
                    rows="3"
                    cols="50"
                    placeholder="descrição do evento"
                    value={this.state.descricao}
                    onChange={this.atualizaEstadoDescricao.bind(this)}
                    id="evento__descricao"  required
                  />
                  <button type="submit" className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">
                    Cadastrar
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
        <Rodape />
      </div>
    );
  }
}

export default Cadastro;
