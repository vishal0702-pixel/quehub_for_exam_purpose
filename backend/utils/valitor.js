import validator from "validator";

const validate = (data) => {
  const mandatoryFields = ["firstname", "password", "emailID"];

  const isAllowed = mandatoryFields.every((k) => Object.keys(data).includes(k));

  if (!isAllowed) {
    throw new Error("Some fields are missing");
  }

  if (!validator.isEmail(data.emailID)) {
    throw new Error("Check your email ID");
  }

  if (!validator.isStrongPassword(data.password)) {
    throw new Error("Create a strong password");
  }
};

export default validate;
