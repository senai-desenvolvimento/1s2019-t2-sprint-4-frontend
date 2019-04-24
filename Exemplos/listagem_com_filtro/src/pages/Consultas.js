import React, { Component } from "react";
import Moment from "moment";

const jsonConsultas = require("../data/consultas.json");

class Consultas extends Component {
  constructor() {
    super();

    this.state = {
      nome: "",
      data: "",
      status: "",
      listaConsultas: []
    };
  }

  FiltraConsultas() {
    let listaFiltrada = jsonConsultas;

    if (this.state.nome !== null && this.state.nome !== "") {
      listaFiltrada = listaFiltrada.filter(
        x =>
          x.medico.toLowerCase().includes(this.state.nome.toLowerCase()) ||
          x.paciente.toLowerCase().includes(this.state.nome.toLowerCase())
      );
    }

    if (this.state.data !== null && this.state.data !== "") {
      var data = Moment(this.state.data).format("DD/MM/YYYY");
      listaFiltrada = listaFiltrada.filter(x => x.data.includes(data));
    }

    if (this.state.status !== null && this.state.status !== "") {
      listaFiltrada = listaFiltrada.filter(x =>
        x.status.includes(this.state.status)
      );
    }

    this.setState({ listaConsultas: listaFiltrada });
  }

  atualizaEstado(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.FiltraConsultas();
    });
  }

  componentDidMount() {
    this.setState({ listaConsultas: jsonConsultas });
  }

  render() {
    return (
      <div className="container">
        <div className="py-5 text-center">
          <h1>Lista de Cosultas</h1>
        </div>
        <form>
          <div className="form-row">
            <div className="col">
              <input
                value={this.state.nome}
                onChange={this.atualizaEstado.bind(this)}
                type="text"
                className="form-control"
                placeholder="Informe o nome"
                name="nome"
              />
            </div>
            <div className="col">
              <select
                value={this.state.status}
                onChange={this.atualizaEstado.bind(this)}
                name="status"
                className="form-control"
              >
                <option value="">Todos</option>
                <option value="Aguardando">Aguardando</option>
                <option value="Atendido">Atendido</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
            <div className="col">
              <input
                value={this.state.data}
                onChange={this.atualizaEstado.bind(this)}
                type="date"
                name="data"
                className="form-control"
              />
            </div>
          </div>
        </form>
        <br />

        <table className="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Médico</th>
              <th scope="col">Paciente</th>
              <th scope="col">Data</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.listaConsultas.map(consulta => {
              return (
                <tr key={consulta.id}>
                  <td scope="row">{consulta.id}</td>
                  <td>{consulta.medico}</td>
                  <td>{consulta.paciente}</td>
                  <td>{consulta.data}</td>
                  <td>{consulta.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Consultas;
