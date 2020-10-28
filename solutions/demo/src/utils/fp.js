const R = require("ramda");

// view, set, over
// lensPath
const Isabella = { firstName: "isabella", lastName: "Hu" };
const ageLens = R.lensProp("age");
const firstNameLens = R.lensProp("firstName");
const lastNameLens = R.lensProp("lastName");
const UpperFirstName = R.over(firstNameLens, R.toUpper);
const UpperLastName = R.over(lastNameLens, R.toUpper);
const UpperFullName = R.compose(UpperFirstName, UpperLastName);
const isabellaWithUpperCasedName = UpperFullName(Isabella);

const result = R.mergeDeepRight(
  { a: true, c: { values: ["12"] } },
  { b: true, c: { values: [15, 35] } }
);

// assocPath: update the value of special key of object
const state = {
  pwd: "",
  confirmPwd: "",
  error: { pwd: "", confirmPwd: "" },
};

const newState = R.assocPath(["error", "confirmPwd"], "Not identical", state);

debugger;
