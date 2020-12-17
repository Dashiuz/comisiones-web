import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <div>
        <h3>holaWifi - Comisiones</h3>
        <Link to="/login">Log in</Link>
      </div>
    );
  }
}
