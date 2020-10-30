import R from "ramda";

const isUndefined = R.isNil;
// This is custom constraint validation, used to replace Input built-in validation
// Difference: step is not included
export interface IOptions {
  minLength?: [number, string];
  maxLength?: [number, string];
  pattern?: [RegExp, string];
  min?: [number, string];
  max?: [number, string];
  required?: [boolean, string];
}
const validate = (options: IOptions) => (value: number | string): string => {
  const { minLength, maxLength, pattern, min, max, required } = options;
  if (required && (R.isNil(value) || R.isEmpty(value))) return required[1];
  if (typeof value === "number") {
    if (!isUndefined(min) && value < min[0]) {
      return min[1];
    }
    if (!isUndefined(max) && value > max[0]) {
      return max[1];
    }
  } else {
    if (!isUndefined(minLength) && value.length < minLength[0]) {
      return minLength[1];
    }
    if (!isUndefined(maxLength) && value.length > maxLength[0]) {
      return maxLength[1];
    }
    if (!isUndefined(pattern) && !value.match(pattern[0])) {
      return pattern[1];
    }
  }
  return "";
};

export default validate;
