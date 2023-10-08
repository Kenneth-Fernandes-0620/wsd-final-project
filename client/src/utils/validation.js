/* eslint-disable  */

function isValidEmail(email) {
  return new RegExp().test(email);
}

function isValidUserName(userName) {
  if (userName.length < 8) return false;
  return true;
}

function isValidPassword(password) {
  return true;
}

export { isValidEmail, isValidUserName, isValidPassword };
