import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App';
import TiposEventos from './pages/TiposEventos/TiposEventos';
import NaoEncontrada from './pages/NaoEncontrada/NaoEncontrada';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

const rotas = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/tiposeventos" component={TiposEventos} />
                <Route component={NaoEncontrada} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(rotas, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
