document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateBtn");
  generateBtn.addEventListener("click", generatePassword);

  const searchBtn = document.getElementById("searchBtn");
  searchBtn.addEventListener("click", searchPasswords);
});


function generateCharacterPool(hasUppercase, hasLowercase, hasNumbers, hasSpecial) {
  const pools = [];
  if (hasUppercase) pools.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (hasLowercase) pools.push("abcdefghijklmnopqrstuvwxyz");
  if (hasNumbers) pools.push("0123456789");
  if (hasSpecial) pools.push("!@#$%^&*");
  return pools.join("");
}

function getRandomCharacter(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

async function fetchRandomWord() {
  try {
    const response = await fetch("https://random-word-api.herokuapp.com/word");
    if (!response.ok) {
      throw new Error("Failed to fetch random word");
    }
    const data = await response.json();
    return data[0]; 
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function generatePassword() {
  const siteName = document.getElementById("siteName").value.trim();
  const length = parseInt(document.getElementById("length").value);
  const hasUppercase = document.getElementById("uppercase").checked;
  const hasLowercase = document.getElementById("lowercase").checked;
  const hasNumbers = document.getElementById("numbers").checked;
  const hasSpecial = document.getElementById("special").checked;

  const pool = generateCharacterPool(hasUppercase, hasLowercase, hasNumbers, hasSpecial);

  if (!pool) {
    const passwordDisplay = document.getElementById("passwordDisplay");
    passwordDisplay.textContent = "Select at least one character type.";
    return;
  }

  const passwordArray = [];
  
  for (let i = 0; i < length; i++) {
    passwordArray.push(getRandomCharacter(pool));
  }

  const randomWord = await fetchRandomWord();
  if (randomWord) {
    passwordArray[Math.floor(Math.random() * length)] = randomWord;
  }

  const password = passwordArray.join('');

  const passwordDisplay = document.getElementById("passwordDisplay");
  passwordDisplay.textContent = password;

  const copyBtn = document.getElementById("copyBtn");
  copyBtn.addEventListener("click", () => {
    const textArea = document.createElement("textarea");
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    swal("Copied to clipboard", "Password copied to clipboard", "success");
  });

  savePassword(siteName, password);
}

function savePassword(site, password) {
  const storedData = JSON.parse(localStorage.getItem("passwords")) || {};
  if (!storedData[site]) {
    storedData[site] = password;
    localStorage.setItem("passwords", JSON.stringify(storedData));
    swal(`Password saved for site '${site}'.`);
  } else {
    swal(`Password already exists for site '${site}'.`);
  }
}

function searchPasswords() {
  const searchSiteInput = document.getElementById("searchSiteInput").value.trim();
  const storedData = JSON.parse(localStorage.getItem("passwords")) || {};
  const sitePassword = storedData[searchSiteInput];
  const passwordDisplay = document.getElementById("passwordDisplay");

  if (sitePassword) {
    passwordDisplay.textContent = sitePassword;
  } else {
    swal(`Site '${searchSiteInput}' not found.`);
  }
}

