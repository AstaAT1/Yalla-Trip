export default function validate(formData) {
  let newErrors = {};

  if (formData.name.length <= 3 || !/^[A-Za-z ]+$/.test(formData.name)) {
    newErrors.name = "Name: you need more than 3 letters && alphabetic only";
  }

  if (!formData.email.includes("@") || !formData.email.includes(".")) {
    newErrors.email = "invalide email";
  }

  if (
    formData.password.length <= 8 ||
    !/[0-9]/.test(formData.password) ||
    !/[!@#$%^&*]/.test(formData.password)
  ) {
    newErrors.password = "Password: more than 5 character and also symbols and numbers";
  }

  if (formData.password !== formData.confirm) {
    newErrors.confirm = "invalide password";
  }

  return newErrors;
}
