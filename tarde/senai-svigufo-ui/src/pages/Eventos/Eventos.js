import React, { Component } from "react";
import Rodape from "../../components/Rodape/Rodape";
import axios from 'axios';

class Cadastro extends Component {
  constructor() {
    super();

    this.state = {
      titulo: "",
      dataEvento: "",
      instituicaoId: 1,
      acessoLivre: "",
      descricao: "",
      tipoEventoId: "",
      listaTiposEventos : []
    };
  }

  buscarTiposEventos(){
    axios.get(`http://192.168.4.112:5000/api/tiposeventos`)
      .then(res => {
        const tiposeventos = res.data;
        this.setState({ listaTiposEventos : tiposeventos });
      })
  }

  componentDidMount(){
      this.buscarTiposEventos();
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

  atualizaEstadoDescricao(event) {
    this.setState({ descricao: event.target.value });
  }

  atualizaEstadoTipoEvento(event) {
    this.setState({ tipoEventoId: event.target.value });
  }

  cadastraEvento(event) {
    event.preventDefault();

    let evento = {
      titulo: this.state.titulo,
      dataEvento: this.state.dataEvento,
      acessoLivre: this.state.acessoLivre,
      descricao: this.state.descricao,
      instituicaoId: 1,
      tipoEventoId: this.state.tipoEventoId
    };

    console.log(evento);
  }

  render() {
    return (
      <div>
        <header className="cabecalhoPrincipal">
          <div className="container">
            <img src="./assets/img/icon-login.png" />

            <nav className="cabecalhoPrincipal-nav">Administrador</nav>
          </div>
        </header>

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

                <tbody id="tabela-lista-corpo" />
              </table>
            </div>

            <div className="container" id="conteudoPrincipal-cadastro">
              <h2 className="conteudoPrincipal-cadastro-titulo">
                Cadastrar Evento
              </h2>
              <form onSubmit={this.cadastraEvento.bind(this)}>
                <div className="container">
                  <input
                    type="text"
                    value={this.state.titulo}
                    onChange={this.atualizaEstadoTitulo.bind(this)}
                    id="evento__titulo"
                    placeholder="título do evento"
                  />
                  <input
                    type="text"
                    value={this.state.dataEvento}
                    onChange={this.atualizaEstadoDataEvento.bind(this)}
                    id="evento__data"
                    placeholder="dd/MM/yyyy"
                  />
                  <select
                    id="option__acessolivre"
                    value={this.state.acessoLivre}
                    onChange={this.atualizaEstadoAcessoLivre.bind(this)}
                  >
                    <option value="1">Livre</option>
                    <option value="0">Restrito</option>
                  </select>
                  <select
                    id="option__tipoevento"
                    value={this.state.tipoEventoId}
                    onChange={this.atualizaEstadoTipoEvento.bind(this)}
                  >
                    <option>Selecione</option>
                    {
                        this.state.listaTiposEventos.map((element) => {
                            return <option key={element.id} value={element.id}>{element.nome}</option>
                        })
                    }
                  </select>
                  <textarea
                    rows="3"
                    cols="50"
                    value={this.state.descricao}
                    onChange={this.atualizaEstadoDescricao.bind(this)}
                    placeholder="descrição do evento"
                    id="evento__descricao"
                  />
                </div>
                <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro">
                  Cadastrar
                </button>
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
