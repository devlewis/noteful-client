import React from "react";
import Note from "../Note/Note";
import Context from "../Context";
import { findNote } from "../notes-helpers";
import PropTypes from "prop-types";
import "./NotePageMain.css";

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };

  static contextType = Context;

  handleDeleteNote = noteId => {
    this.props.history.push("/");
  };

  render() {
    const { noteId } = this.props.match.params;
    console.log(noteId, typeof noteId);
    console.log(this.context.notes);
    const note = findNote(this.context.notes, parseInt(noteId)) || {
      content: ""
    };

    return (
      <section className="NotePageMain">
        <Note
          id={note.id}
          name={note.name}
          date_created={note.date_created}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    );
  }
}

NotePageMain.propTypes = {
  history: PropTypes.object,

  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  })
};
