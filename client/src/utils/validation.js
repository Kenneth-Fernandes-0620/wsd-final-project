/* eslint-disable  */

function isValidEmail(email) {
  return new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}$").test(email);
}

function isValidUserName(userName) {
  if (userName.length < 3) return false;
  return true;
}

function isValidPassword(password) {
  if (password.length < 8) return { result: false, message: 'Password Too Short' }
  else if (!new RegExp("^[a-z]+$").test(password)) return { result: false, message: 'Password missing lower case alphabets' }
  else if (!new RegExp("^[A-Z]+$").test(password)) return { result: false, message: 'Password missing upper case alphabets' }
  else if (!new RegExp("^[0-9]+$").test(password)) return { result: false, message: 'Password missing digits' }
  else if (!new RegExp("^[*!&%#@]+$").test(password)) return { result: false, message: 'Password missing special Characters' }
  return { result: true, message: '' };
}

function isValidDate(date) {
  const chosenDate = date.toDate();
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  // Get tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(currentDate.getDate() + 1);

  console.log(
    chosenDate.getDate() > currentDate.getDate()
  )

  // Check if the provided date is tomorrow and between 9 AM to 5 PM
  if (
    chosenDate.getFullYear() === tomorrow.getFullYear() &&
    chosenDate.getMonth() === tomorrow.getMonth() &&
    chosenDate.getDate() > currentDate.getDate() &&
    chosenDate.getHours() >= 9 && chosenDate.getHours() < 17
  ) {
    return true;
  }

  return false;
}


export { isValidEmail, isValidUserName, isValidPassword, isValidDate };
