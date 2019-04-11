import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import "./index.css";
import App from "./pages/Home/App";
import TiposEventos from "./pages/TiposEventos/TiposEventos";
import NaoEncontrada from "./pages/NaoEncontrada/NaoEncontrada";
import CadastroEvento from './pages/Eventos/Cadastro';

import Login from './pages/Login/Login';

import * as serviceWorker from "./serviceWorker";
import {usuarioAutenticado} from "./services/auth";

const Permissao = ( {component : Component} ) => (
  <Route
    render = {props => usuarioAutenticado() ? 
      (<Component {...props} /> ) :
      (<Redirect to={{ pathname : "/login" }} />)
    }
  />
);

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Permissao  path="/tiposeventos" component={TiposEventos} />
        <Route path="/login" component={Login} />        
        <Route path="/eventos" component={CadastroEvento} />
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
