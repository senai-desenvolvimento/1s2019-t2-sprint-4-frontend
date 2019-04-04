import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import logo from '../assets/img/logo-senai.jpg'

class Menu extends Component {
    render(){
        return (
            <Navbar bg="dark"  variant="dark">
                <Navbar.Brand href="#home">
                    <img
                        src={ logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                    {' Senai Search GitHub'}
                </Navbar.Brand>
                
            </Navbar>
        );
    }
}

export default Menu;