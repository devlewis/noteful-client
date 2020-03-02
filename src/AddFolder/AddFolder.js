import React from "react";
import config from "../config";
import "./AddFolder.css";
import Context from "../Context";

class AddFolder extends React.Component {
  static contextType = Context;

  state = {
    error: null
  };

  handleSubmit = e => {
    e.preventDefault();
    const { folderName } = e.target;
    const folderNew = {
      id: "",
      name: folderName.value
    };

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      body: JSON.stringify(folderNew),
      headers: { "content-type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        // folderName.value = '';
        this.context.addFolder(data);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    const { error } = this.state;
    return (
      <section className="AddFolder">
        <h2>Create a folder</h2>
        <form className="AddFolder_form" onSubmit={this.handleSubmit}>
          <div className="AddFolder_error" role="alert">
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor="folderName">Name </label>
            <input
              type="text"
              name="folderName"
              id="folderName"
              placeholder="folder name here"
              autocomplete="off"
              required
            />
          </div>
          <div className="AddFolder_buttons">
            <button
              className="Cancel"
              type="button"
              onClick={this.handleClickCancel}
            >
              Cancel
            </button>
            {""}
            <button type="submit">Save</button>
          </div>
        </form>
      </section>
    );
  }
}

export default AddFolder;
