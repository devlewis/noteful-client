import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import { getNotesForFolder } from "../notes-helpers";
import Context from "../Context";
import PropTypes from "prop-types";
import "./NoteListMain.css";

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };

  static contextType = Context;

  render() {
    const { folderid } = this.props.match.params;
    const { notes = [] } = this.context;
    const notesForFolder = getNotesForFolder(notes, parseInt(folderid));

    return (
      <section className="NoteListMain">
        <ul tabIndex="0">
          {notesForFolder.map(note => (
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                date_created={note.date_created}
              />
            </li>
          ))}
        </ul>
        <div className="NoteListMain__button-container">
          <CircleButton
            tabIndex="1"
            tag={Link}
            to="/add-note"
            type="button"
            className="NoteListMain__add-note-button"
          >
            <FontAwesomeIcon icon="plus" />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    );
  }
}

NoteListMain.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  })
};
