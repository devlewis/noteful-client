import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import AddNote from "./AddNote";

describe(`AddNote component`, () => {
  it("renders without errors", () => {
    expect(shallow(<AddNote />)).toMatchSnapshot();
  });
});
