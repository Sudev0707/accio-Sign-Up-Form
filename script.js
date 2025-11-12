document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");

  const dobInput = document.getElementById("dob");

  dobInput.addEventListener("input", function (event) {
    let inputValue = dobInput.value.replace(/[^0-9-]/g, "");

    if (inputValue.length === 2) {
      inputValue = inputValue + "-";
    }
    if (inputValue.length === 5) {
      inputValue = inputValue + "-";
    }

    if (inputValue.length > 10) {
      inputValue = inputValue.slice(0, 10);
    }
    dobInput.value = inputValue;
  });

  dobInput.addEventListener("keydown", function (event) {
    const cursorPos = dobInput.selectionStart;
    if (event.key === "Backspace") {
      let inputValue = dobInput.value;

      if (cursorPos === 3 || cursorPos === 6) {
        dobInput.value =
          inputValue.slice(0, cursorPos - 1) + inputValue.slice(cursorPos);
        event.preventDefault();
      }
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const dob = document.getElementById("dob").value.trim();
    const termsAccepted = document.querySelector('input[name="terms"]:checked');
    const userType = document.querySelector('input[name="user-type"]:checked');

    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !dob ||
      !userType
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailPattern)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
    if (!dob.match(datePattern)) {
      alert("Please enter your date of birth in the format dd-mm-yyyy.");
      return;
    }

    const [day, month, year] = dob.split("-").map((num) => parseInt(num, 10));

    const currentYear = new Date().getFullYear();

    if (year > currentYear) {
      alert("Please enter a valid year (it cannot be in the future).");
      return;
    }

    if (month < 1 || month > 12) {
      alert("Please enter a valid month (1-12).");
      return;
    }

    const daysInMonth = new Date(year, month, 0).getDate(); 
    if (day < 1 || day > daysInMonth) {
      alert(
        `Please enter a valid day for the selected month. (Max day for this month is ${daysInMonth})`
      );
      return;
    }
    alert("Form submitted successfully!");
  });
});
