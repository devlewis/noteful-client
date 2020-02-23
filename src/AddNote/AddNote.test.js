import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import AddNote from "./AddNote";

let folders = [
  {
    id: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
    name: "Important"
  },
  {
    id: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
    name: "Super"
  },
  {
    id: "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
    name: "Spangley"
  }
];

let folderName = folders.map(folder => (
  <option value={folder.name}>{folder.name}</option>
));

console.log("folderName", folderName);

let addNoteWrapper = shallow(<AddNote folderName={folderName} />);

describe(`AddNote component`, () => {
  it("renders without errors", () => {
    expect(addNoteWrapper).toMatchSnapshot();
  });

  it("renders folders we pass it", () => {
    let options = addNoteWrapper.find("option");
    console.log(options.debug());
    expect(options).toHaveLength(4);
  });
});
