import React from "react";
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

describe(`AddNote component`, () => {
  it("renders without error", () => {
    const wrapper = shallow(<AddNote folderName={folders} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
