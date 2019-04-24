import React, { Component } from "react";
import {parseJwt} from '../../services/auth';
import {Link} from 'react-router-dom';

import logo from '../../assets/img/icon-login.png';

import '../../assets/css/login.css';
import Axios from "axios";

class Login extends Component {
    constructor(){
        super();
        this.state = {
            email : '',
            senha : '',
            erroMensagem : '',
            isLoading: false
        }
        
    }

    atualizaEstadoCampo(event){
        this.setState({ [event.target.name] : event.target.value});
    }


    efetuaLogin(event){
        event.preventDefault();
        this.setState({ isLoading: true });

        Axios.post("http://192.168.4.112:5000/api/login", {
           email : this.state.email,
           senha: this.state.senha
        })
        .then(data => {
            if(data.status === 200){
                localStorage.setItem("usuario-svigufo", data.data.token);
                //Verifica o tipo de usuário e redireciona para a página default
                console.log(parseJwt().Role);
                if(parseJwt().Role === "ADMINISTRADOR"){
                  this.props.history.push("/eventos/cadastrar");
                } else {
                  this.props.history.push("/eventos");
                }
                
            } 
        })
        .catch(erro => {
            this.setState({ isLoading: false });
            this.setState({ erroMensagem : 'Email ou senha inválido'});
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
              <Link to="/">
                <img src={logo} className="icone__login" alt="SviGufo" />
              </Link>
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
                  placeholder="Informe seu e-mail"
                  type="text"
                  value={this.state.email}
                  onChange={this.atualizaEstadoCampo.bind(this)}
                  name="email"
                  id="login__email"
                />
              </div>
              <div className="item">
                <input
                  className="input__login"
                  placeholder="senha"
                  value={this.state.senha}
                  onChange={this.atualizaEstadoCampo.bind(this)}
                  type="password"
                  name="senha"
                  id="login__password"
                />
              </div>
              <p className="text__login" style={{ color : 'red',  textAlign : 'center' }}>{this.state.erroMensagem}</p>
              <div className="item">
                <button type="submit" className="btn btn__login" id="btn__login" {...this.state.isLoading ? "disabled" : ""}>
                {this.state.isLoading ? "Loading..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
