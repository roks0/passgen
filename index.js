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
    pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (hasLowercase) {
    pool += "abcdefghijklmnopqrstuvwxyz";
    }
    if (hasNumbers) {
    pool += "0123456789";
    }
    if (hasSpecial) {
    pool += "!@#$%^&*";
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

    prompt("Generated Password:", password);
}

generatePassword();
