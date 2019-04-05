import React, { Component } from "react";


import '../../assets/css/login.css';

import logo from '../../assets/img/icon-login.png'
import Axios from "axios";


export default class Login extends Component {
    constructor(){
        super();

        this.state ={
            email : '',
            senha : ''
        }
    }

    atualizaEstadoEmail(event){
        this.setState({email : event.target.value});
    }

    atualizaEstadoSenha(event){
        this.setState({senha : event.target.value});
    }

    efetuaLogin(event){
        event.preventDefault();
        
        // alert(this.state.email + " - " + this.state.senha);

        Axios.post('http://192.168.4.112:5000/api/login', {
            email : this.state.email,
            senha: this.state.senha
        })
        .then(data => {
            localStorage.setItem("usuario-svigufo", data.data.token);
            this.props.history.push('/tiposeventos');
            console.log(data);
        })
        .catch(erro => {
            console.log(erro);
        })

        
    }

  render() {
    return (
      <section className="container flex">
        <div className="img__login">
          <div className="img__overlay" />
        </div>

        <div className="item__login">
          <div className="row">
            <div className="item">
              <img src={logo} className="icone__login" />
            </div>
            <div className="item" id="item__title">
              <p className="text__login" id="item__description">
                Bem-vindo! Faça login para acessar sua conta.
              </p>
            </div>
            <form onSubmit={this.efetuaLogin.bind(this)}>
              <div className="item">
                <input
                  className="input__login"
                  placeholder="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.atualizaEstadoEmail.bind(this)}
                  name="email"
                  id="login__email"
                />
              </div>
              <div className="item">
                <input
                  className="input__login"
                  placeholder="password"
                  value={this.state.senha}
                  onChange={this.atualizaEstadoSenha.bind(this)}
                  type="password"
                  name="password"
                  id="login__password"
                />
              </div>
              <div className="item">
                <button type="submit" className="btn btn__login" id="btn__login">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
