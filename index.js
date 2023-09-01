const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    special: "!@#$%^&*",
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    const generateBtn = document.getElementById("generateBtn");
    generateBtn.addEventListener("click", generatePassword);
  
    const searchBtn = document.getElementById("searchBtn");
    searchBtn.addEventListener("click", searchPasswords);
  });
  
  function generatePassword() {
    const siteNameInput = document.getElementById("siteName");
    const siteName = siteNameInput.value.trim();
  
    if (siteName === "") {
        alert("Please enter a valid website name.");
        return;
    }
  
    const lengthInput = document.getElementById("length");
    const length = parseInt(lengthInput.value);
  
    const hasUppercase = document.getElementById("uppercase").checked;
    const hasLowercase = document.getElementById("lowercase").checked;
    const hasNumbers = document.getElementById("numbers").checked;
    const hasSpecial = document.getElementById("special").checked;
  
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
        const passwordDisplay = document.getElementById("passwordDisplay");
        passwordDisplay.textContent = "Select at least one character type.";
        return;
    }
  
    const poolLength = pool.length;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * poolLength);
        password += pool[randomIndex];
    }
  
    const passwordDisplay = document.getElementById("passwordDisplay");
    passwordDisplay.textContent = password;
  
    const copyBtn = document.getElementById("copyBtn");
    copyBtn.addEventListener("click", function () {
        const textArea = document.createElement("textarea");
        textArea.value = password;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Password copied to clipboard!");
    });
  
    savePassword(siteName, password);
  }
  
  function savePassword(site, password) {
    const storedData = JSON.parse(localStorage.getItem("passwords")) || {};
    if (!(site in storedData)) {
        storedData[site] = password;
        localStorage.setItem("passwords", JSON.stringify(storedData));
        alert(`Password saved for site '${site}'.`);
    } else {
        alert(`Password already exists for site '${site}'.`);
    }
  }
  
  function searchPasswords() {
    const searchSiteInput = document.getElementById("searchSiteInput").value.trim();
    const storedData = JSON.parse(localStorage.getItem("passwords")) || {};
    if (searchSiteInput in storedData) {
        const sitePassword = storedData[searchSiteInput];
        const passwordDisplay = document.getElementById("passwordDisplay");
        passwordDisplay.textContent = sitePassword;
    } else {
        alert(`Site '${searchSiteInput}' not found.`);
    }
  }