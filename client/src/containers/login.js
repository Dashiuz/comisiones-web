import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config/config";

const prefix_url = config.baseURL;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { email, password } = this.state;

    if (email.length === 0 || password.length === 0) {
      alert(`Some fields are empty!`);
    } else {
      axios
        .post(`${prefix_url}/users/login`, this.state)
        .then((result) => {
          if (result.status === 200) {
            let data = result.data.data;
            localStorage.setItem("auth", JSON.stringify(data.token));
            localStorage.setItem("email", JSON.stringify(data.email));
            setTimeout(() => {
              history.push("/uploadFile");
            }, 500);
          }
        })
        .catch((ex) => {
          alert(
            `status: ${ex.response.data.status} => message: ${ex.response.data.msg}`
          );
        });
    }
  };

  render() {
    return (
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={this.handleChangeEmail}
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.handleChangePassword}
        />
        <input type="submit" value="Log In" onClick={this.handleSubmit} />

        <Link to="/register">or register if you don't have an account</Link>
      </div>
    );
  }
}
