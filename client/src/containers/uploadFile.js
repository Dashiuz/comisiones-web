import React, { Component } from "react";
import config from "../config/config";
import axios from "axios";

const prefix_url = config.baseURL;

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      logged: false,
      token: "",
    };
  }

  componentDidMount = () => {
    const { history } = this.props;
    let token = JSON.parse(localStorage.getItem("auth"));
    if (token) {
      const header = `Bearer ${token}`;
      axios
        .get(`${prefix_url}/auth/verifyToken`, {
          headers: { Authorization: header },
        })
        .then((result) => {
          let data = result.data;
          if (data.validated === true) {
            this.setState({ logged: true, token });
          }
        })
        .catch((ex) => {
          alert(
            `status: ${ex.response.data.status} => message: ${ex.response.data.msg}`
          );
          localStorage.removeItem("auth");
          localStorage.removeItem("email");
          setTimeout(() => {
            history.push("/login");
          }, 500);
        });
    } else {
      alert("You need to log in to use the upload File service");
      setTimeout(() => {
        history.push("/login");
      }, 500);
    }
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    const formData = new FormData();

    formData.set("file", this.state.selectedFile, this.state.selectedFile.name);

    // for (let value of formData.values()) {
    //   console.log("coño: ", value); //  --> shows file info
    // }

    axios
      .post(`${prefix_url}/files/uploadfile`, formData, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log("RESULT: ", result);
      })
      .catch((ex) => {
        alert(ex);
      });
  };

  fileData = () => {
    if (this.state.selectedFile) {
      //console.log("ELES: ", this.state.selectedFile);
      return (
        <div>
          <h2>Detalles del Archivo:</h2>
          <p>Nombre del Archivo: {this.state.selectedFile.name}</p>
          <p>
            Última modificación:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Elige un archivo de excel antes de pulsar el botón "cargar"</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h3>Carga tu nuevo archivo excel</h3>
        <div>
          <input type="file" name="file" onChange={this.onFileChange} />
          <input
            type="submit"
            value="cargar archivo"
            onClick={this.onFileUpload}
          />
        </div>
        {this.fileData()}
      </div>
    );
  }
}
