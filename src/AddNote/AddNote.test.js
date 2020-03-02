import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import AddNote from "./AddNote";
import Context from "../Context";

let value = {
  folders: [
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
  ]
};

describe(`AddNote component`, () => {
  it("renders without errors", () => {
    expect(shallow(<AddNote />)).toMatchSnapshot();
  });

  it("renders folders we pass it", () => {
    const wrapper = mount(
      <Context.Provider value={value}>
        <AddNote />
      </Context.Provider>
    );
    let options = wrapper.find("option");
    expect(options).toHaveLength(4);
  });
});
