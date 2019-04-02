import React, { Component } from "react";
import Rodape from '../../components/Rodape/Rodape'

class NaoEncontrada extends Component {
  render() {
    return (
      <div>
        Erro 404 - Página não encontrada.
        <Rodape />
      </div>
    );
  }
}

export default NaoEncontrada;
