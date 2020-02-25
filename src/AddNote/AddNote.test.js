import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import AddNote from "./AddNote";

// beforeEach(() => {
//   jest.resetModules();
// });

// const makeFolderNamesWithContext = (
//   context = [
//     {
//       id: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
//       name: "Important"
//     },
//     {
//       id: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
//       name: "Super"
//     },
//     {
//       id: "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
//       name: "Spangley"
//     }
//   ]
// ) => {
//   jest.doMock("../Context", () => {
//     return {
//       Context: {
//         Consumer: props => props.children(context)
//       }
//     };
//   });

//   return require("./AddNote").AddNote;
// };

const context = [
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
  it("renders without errors", () => {
    expect(shallow(<AddNote />)).toMatchSnapshot();
  });

  it("renders folders we pass it", () => {
    // const folderNames = makeFolderNamesWithContext();
    // console.log(folderNames.debug());
    const wrapper = shallow(<AddNote />, { context });
    let options = wrapper.find("option");
    console.log(options.debug());
    expect(options).toHaveLength(4);
  });
});
