import React, { Component } from 'react';

export default class Titulo extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <h1  className="conteudoPrincipal-cadastro-titulo">
                {this.props.mensagem}
            </h1>
        );
    }
}

