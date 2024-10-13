import { isValidEmail, isValidPassword } from "../validate";

describe("isValidEmail", () => {
  it.each([
    { email: "", expected: false },
    { email: "exam@ple@gmail.com", expected: false },
    { email: "example@gmail.c", expected: false },
    { email: "@gmail.com", expected: false },
    { email: "!@gmail.com", expected: false },
    { email: "example@gmail.com", expected: true },
    { email: "example@uk.co.com", expected: true },
  ])("returns $expected when email is $email", ({ email, expected }) => {
    const actual = isValidEmail(email);
    expect(actual).toBe(expected);
  });
});

describe("isValidPassword", () => {
  it.each([
    { password: "", expected: false },
    { password: "aA2abcde", expected: false },
    { password: "aa2!bcde", expected: false },
    { password: "aAa!bcde", expected: false },
    { password: "aA2!abcd", expected: true },
  ])(
    "returns $expected when password is $password",
    ({ password, expected }) => {
      const actual = isValidPassword(password);
      expect(actual).toBe(expected);
    }
  );
});
