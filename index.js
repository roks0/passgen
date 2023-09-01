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
    const {
      value: siteName,
      value: length,
      checked: hasUppercase,
      checked: hasLowercase,
      checked: hasNumbers,
      checked: hasSpecial,
    } = document.getElementById("siteName");
  
    if (siteName.trim() === "") {
      alert("Please enter a valid website name.");
      return;
    }
  
    if (isNaN(length) || length < 1 || length > 20) {
      alert("Please enter a valid password length between 1 and 20.");
      return;
    }
  
    let pool = "";
    let password = "";
  
    pool += hasUppercase ? characterSets.uppercase : "";
    pool += hasLowercase ? characterSets.lowercase : "";
    pool += hasNumbers ? characterSets.numbers : "";
    pool += hasSpecial ? characterSets.special : "";
  
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
  
  const outputDiv = document.querySelector(".output");
  outputDiv.addEventListener("click", function (event) {
    if (event.target.id === "copyBtn") {
      const textArea = document.createElement("textarea");
      textArea.value = password;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Password copied to clipboard!");
    }
  });
  