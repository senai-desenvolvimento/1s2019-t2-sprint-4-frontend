import React, { Component } from "react";
import NavBar from '../components/NavBar';

//withRouter para redirecionar as rotas
import {Link, withRouter} from 'react-router-dom';

import {usuarioAutenticado} from '../services/auth';

import logo from "../assets/img/icon-login.png";

class Cabecalho extends Component {

    logout(){
        localStorage.removeItem("usuario-svigufo");
        this.props.history.push('/');
    }
  render() {
    return (
      <header className="cabecalhoPrincipal">
        <div className="container">
          <img src={logo} alt="SviGufo" />

          <nav className="cabecalhoPrincipal-nav">
            <div>
                <Link to="/">Home</Link>
            </div>

            <NavBar />
          </nav>
        </div>
      </header>
    );
  }
}

//componente utilizando withRouter para poder utilizar o redirect do logout
export default withRouter(Cabecalho);