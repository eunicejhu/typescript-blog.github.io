import validate, { IOptions } from "./validate";

const PASSWORD_VALIDATION_OPTIONS: IOptions = {
  minLength: [6, "Length should be greater than 6"],
  maxLength: [22, "Length should be less than 22"],
  pattern: [
    /.*[a-z]+.*[A-Z]+.*/g,
    "Should contain at least one uppercase and one lowercase letter",
  ],
};

const validatePassword = validate(PASSWORD_VALIDATION_OPTIONS);

describe("Validate password", () => {
  it("Length of password should be >= 6", () => {
    expect(validatePassword("hsdf")).toBe("Length should be greater than 6");
  });
  it("Length of password should be <= 22", () => {
    expect(validatePassword("slkdfjlksdjfsdlfsdjlfjsldjfjsfsjljfsd")).toBe(
      "Length should be less than 22"
    );
  });
  it("Length of password should contain at least one uppercase and one lowercase letter", () => {
    expect(validatePassword("jsdfjkjsdfkd")).toBe(
      "Should contain at least one uppercase and one lowercase letter"
    );
  });
});
