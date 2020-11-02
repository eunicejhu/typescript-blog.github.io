const R = require("ramda");
// This is custom constraint validation, used to replace Input built-in validation
// Difference: step is not included
// export interface IOptions {
//   minLength?: [number, string];
//   maxLength?: [number, string];
//   pattern?: [RegExp, string];
//   min?: [number, string];
//   max?: [number, string];
//   required?: [boolean, string];
// }
const validate = (options) => (value) => {
  const { minLength, maxLength, pattern, min, max, required } = options;
  if (required && (R.isNil(value) || R.isEmpty(value))) return required[1];
  if (typeof value === "number") {
    if (min !== undefined && value < min[0]) {
      return min[1];
    }
    if (max !== undefined && value > max[0]) {
      return max[1];
    }
  } else {
    if (minLength !== undefined && value.length < minLength[0]) {
      return minLength[1];
    }
    if (maxLength !== undefined && value.length > maxLength[0]) {
      return maxLength[1];
    }
    if (pattern !== undefined && !value.match(pattern[0])) {
      return pattern[1];
    }
  }
  return "";
};

export default validate;
