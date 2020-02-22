import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import Context from "../Context";
import { findNote, findFolder } from "../notes-helpers";
import PropTypes from "prop-types";
import "./NotePageNav.css";

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  };

  static contextType = Context;

  render() {
    const { noteId } = this.props.match.params;
    const note = findNote(this.context.notes, noteId) || {};
    const folder = findFolder(this.context.folders, note.folderId);

    return (
      <div className="NotePageNav">
        <CircleButton
          tag="button"
          role="link"
          onClick={() => this.props.history.goBack()}
          className="NotePageNav__back-button"
        >
          <FontAwesomeIcon icon="chevron-left" />
          <br />
          Back
        </CircleButton>
        {folder && <h3 className="NotePageNav__folder-name">{folder.name}</h3>}
      </div>
    );
  }
}

NotePageNav.propTypes = {
  history: PropTypes.object,

  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  })
};
