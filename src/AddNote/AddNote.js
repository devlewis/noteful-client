import React from "react";
import config from "../config";
import "./AddNote.css";
import Context from "../Context";
import ValidationError from "../ValidationError";

class AddNote extends React.Component {
  static defaultProps = {};

  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      folderNameChoice: "",
      name: {
        value: "",
        touched: false
      },
      content: ""
    };
  }

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Note name is required";
    } else if (name.length < 1) {
      return "Note name must be more than 1 character";
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    const folderNameChoice = this.state.folderNameChoice;

    const folder = this.context.folders.find(
      ({ name }) => name === folderNameChoice
    );

    let noteNew = {
      name: this.state.name.value,
      content: this.state.content,
      folderId: folder.id
    };

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      body: JSON.stringify(noteNew),
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
        this.context.addNote(data);
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
    const nameError = this.validateName();

    const { error } = this.state;
    this.context;
    const folderNames = this.context.folders
      ? this.context.folders.map(folder => (
          <option key={folder.id} value={folder.name}>
            {folder.name}
          </option>
        ))
      : [];

    return (
      <section className="AddNote">
        <h2>Create a Note</h2>
        <form className="AddNote_form" onSubmit={this.handleSubmit}>
          <div className="AddNote_error" role="alert">
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor="name">Note Name </label>
            <input
              onChange={e =>
                this.setState({
                  name: {
                    value: e.target.value,
                    touched: true
                  }
                })
              }
              type="text"
              name="name"
              id="name"
              placeholder="name"
              autocomplete="off"
              required
            />
            {this.state.name.touched && <ValidationError message={nameError} />}
          </div>
          <div>
            <label htmlFor="content">Content </label>
            <textarea
              onChange={e => this.setState({ content: e.target.value })}
              type="text"
              name="content"
              id="content"
              autocomplete="off"
            />
          </div>
          <div>
            <label htmlFor="folderNameChoice">Folder </label>
            <select
              onChange={e =>
                this.setState({ folderNameChoice: e.target.value })
              }
              name="folderNameChoice"
              id="folderNameChoice"
              required
            >
              <option value="">Select a Folder</option>
              {folderNames}
            </select>
          </div>
          <div className="AddNote_buttons">
            <button type="button" onClick={this.handleClickCancel}>
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

export default AddNote;
