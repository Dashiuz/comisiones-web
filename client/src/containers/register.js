import React, { Component } from "react";
import config from "../config/config";
import axios from "axios";

const prefix_url = config.baseURL;

export default class Register extends Component {
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

  handlerSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const { email, password } = this.state;

    if (email.length === 0 || password.length === 0) {
      alert(`Some fields are empty!`);
    } else {
      axios
        .post(`${prefix_url}/users/register`, this.state)
        .then((result) => {
          if (result.status === 200) {
            alert(`Successfully Registered`);
            setTimeout(() => {
              history.push("/login");
            }, 1200);
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
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.handleChangePassword}
        />
        <input type="submit" value="Register" onClick={this.handlerSubmit} />
      </div>
    );
  }
}
