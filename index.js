const characterSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  special: "!@#$%^&*",
};

const users = {};

function getUserName() {
  while (true) {
    const userName = prompt("Please enter your name (letters only):");

    if (/^[A-Za-z]+$/.test(userName)) {
      return userName;
    }

    alert("Invalid name. Please try again.");
  }
}

function generatePassword() {
  let lengthInput;
  let length;

  while (true) {
    lengthInput = prompt("Enter the desired password length:");
    length = parseInt(lengthInput);

    if (!isNaN(length) && length > 0 && length % 1 === 0) {
      break;
    }

    alert("Please enter a positive number");
  }

  const hasUppercase = confirm("Include uppercase letters?");
  const hasLowercase = confirm("Include lowercase letters?");
  const hasNumbers = confirm("Include numbers?");
  const hasSpecial = confirm("Include special characters?");
  let pool = "";
  let password = "";

  if (hasUppercase) {
    pool += characterSets.uppercase;
  }
  if (hasLowercase) {
    pool += characterSets.lowercase;
  }
  if (hasNumbers) {
    pool += characterSets.numbers;
  }
  if (hasSpecial) {
    pool += characterSets.special;
  }

  if (pool === "") {
    console.log("Select at least one character type.");
    return;
  }

  const poolLength = pool.length;
  for (let i = 0; i < length; i++) {
    const randomIndex = (i * i + i + 41) % poolLength;
    password += pool[randomIndex];
  }

  return password;
}


function displayPassword(password) {
  console.log(`Generated Password: ${password}`);
}


function savePassword(userName, password) {
  if (!(userName in users)) {
    users[userName] = [];
  }
  users[userName].push(password);
  console.log(`Password saved for '${userName}'.`);
}


function searchPasswords(userName, searchTerm) {
  if (userName in users) {
    const userPasswords = users[userName];
    const matchingPasswords = userPasswords.filter((password) =>
      password.includes(searchTerm)
    );
    console.log(
      `Matching passwords for '${userName}' and search term '${searchTerm}':`
    );
    console.log(matchingPasswords);
  } else {
    console.log(`User '${userName}' not found.`);
  }
}


function filterPasswordsByLength(userName, length) {
  if (userName in users) {
    const userPasswords = users[userName];
    const filteredPasswords = userPasswords.filter(
      (password) => password.length === length
    );
    console.log(
      `Passwords with length ${length} for '${userName}':`
    );
    console.log(filteredPasswords);
  } else {
    console.log(`User '${userName}' not found.`);
  }
}


const userName = getUserName();
const password = generatePassword();
displayPassword(password);
savePassword(userName, password);

const searchTerm = prompt("Enter username:");
searchPasswords(userName, searchTerm);

const filterLengthInput = prompt("Enter the desired password length for filtering:");
const filterLength = parseInt(filterLengthInput);

if (!isNaN(filterLength) && filterLength > 0 && filterLength % 1 === 0) {
  filterPasswordsByLength(userName, filterLength);
} else {
  console.log("Invalid length. Please enter a positive whole number.");
}