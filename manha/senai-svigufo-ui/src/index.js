import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import "./index.css";
import App from "./pages/Home/App";
import TiposEventos from "./pages/TiposEventos/TiposEventos";
import NaoEncontrada from "./pages/NaoEncontrada/NaoEncontrada";
import EventoIndex from "./pages/Eventos/Index";
import EventoCadastro from "./pages/Eventos/Cadastro";

import Login from "./pages/Login/Login";

import * as serviceWorker from "./serviceWorker";
import { usuarioAutenticado } from "./services/auth";
import {parseJwt} from './services/auth';

//Verifica se o usuário esta logado e se o role é do tipo Admin
const PermissaoAdmin = ({ component: Component }) => (
  <Route
    render={props =>
      usuarioAutenticado() && parseJwt().Role == "ADMINISTRADOR" ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

//Verifica se o usuário esta logado e se o role é do tipo Comum
const PermissaoComum = ({ component: Component }) => (
  <Route
    render={props =>
      usuarioAutenticado() && parseJwt().Role == "COMUM" ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        
        <PermissaoAdmin path="/tiposeventos" component={TiposEventos} />
        
        <PermissaoComum exact path="/eventos" component={EventoIndex} />
        <PermissaoAdmin path="/eventos/cadastrar" component={EventoCadastro} />
        
        <Route component={NaoEncontrada} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
