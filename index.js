document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    generateBtn.addEventListener("click", generatePassword);
  
    const searchBtn = document.getElementById("searchBtn");
    searchBtn.addEventListener("click", searchPasswords);
  });
  
  function generatePassword() {
    const siteName = document.getElementById("siteName").value.trim();
    const length = parseInt(document.getElementById("length").value);
    const hasUppercase = document.getElementById("uppercase").checked;
    const hasLowercase = document.getElementById("lowercase").checked;
    const hasNumbers = document.getElementById("numbers").checked;
    const hasSpecial = document.getElementById("special").checked;
  
    let pool = "";
    let password = "";
  
    if (hasUppercase) pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (hasLowercase) pool += "abcdefghijklmnopqrstuvwxyz";
    if (hasNumbers) pool += "0123456789";
    if (hasSpecial) pool += "!@#$%^&*";
  
    if (!pool) {
      const passwordDisplay = document.getElementById("passwordDisplay");
      passwordDisplay.textContent = "Select at least one character type.";
      return;
    }
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      password += pool[randomIndex];
    }
  
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
      alert("Password copied to clipboard!");
    });
  
    savePassword(siteName, password);
  }
  
  function savePassword(site, password) {
    const storedData = JSON.parse(localStorage.getItem("passwords")) || {};
    if (!storedData[site]) {
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
    const sitePassword = storedData[searchSiteInput];
    const passwordDisplay = document.getElementById("passwordDisplay");
  
    if (sitePassword) {
      passwordDisplay.textContent = sitePassword;
    } else {
      alert(`Site '${searchSiteInput}' not found.`);
    }
  }
  