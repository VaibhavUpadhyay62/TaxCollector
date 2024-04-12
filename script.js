document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".input-field");
  inputs.forEach(function (input) {
    input.addEventListener("keypress", function (event) {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
        alert("Please enter only numeric values.");
      }
    });
  });
});

function showError(elementId, message) {
  const errorIcon = document.getElementById(elementId + "Error");
  errorIcon.style.display = "inline";
  errorIcon.setAttribute("title", message);
}

function hideError(elementId) {
  const errorIcon = document.getElementById(elementId + "Error");
  errorIcon.style.display = "none";
  errorIcon.removeAttribute("title");
}

function validateInput() {
  let grossIncome = document.getElementById("grossIncome").value.trim();
  let extraIncome = document.getElementById("extraIncome").value.trim();
  let ageGroup = document.getElementById("ageGroup").value.trim();
  let deduction = document.getElementById("deduction").value.trim();

  let isValid = true;

  if (grossIncome === "" || isNaN(parseFloat(grossIncome))) {
    showError("grossIncome", "Please enter a numeric value.");
    isValid = false;
  } else {
    hideError("grossIncome");
  }

  if (extraIncome === "" || isNaN(parseFloat(extraIncome))) {
    showError("extraIncome", "Please enter a numeric value.");
    isValid = false;
  } else {
    hideError("extraIncome");
  }

  if (ageGroup === "") {
    showError("ageGroup", "Please select an age group.");
    isValid = false;
  } else {
    hideError("ageGroup");
  }

  if (deduction === "" || isNaN(parseFloat(deduction))) {
    showError("deduction", "Please enter a numeric value.");
    isValid = false;
  } else {
    hideError("deduction");
  }

  return isValid;
}

function calculateTax() {
  if (!validateInput()) {
    return;
  }

  let grossIncome = parseFloat(
    document.getElementById("grossIncome").value.trim()
  );
  let extraIncome = parseFloat(
    document.getElementById("extraIncome").value.trim()
  );
  let ageGroup = document.getElementById("ageGroup").value.trim();
  let deduction = parseFloat(document.getElementById("deduction").value.trim());

  let totalIncome = grossIncome + extraIncome - deduction;
  let taxRate = 0;

  if (totalIncome > 800000) {
    if (ageGroup === "<40") {
      taxRate = 0.3;
    } else if (ageGroup === "≥ 60") {
      taxRate = 0.1;
    } else {
      taxRate = 0.4;
    }
  }

  let taxAmount = totalIncome * taxRate;
  let taxResult = `Tax Amount: ${taxAmount.toFixed(2)} Lakhs`;
  document.getElementById("taxResult").textContent = taxResult;

  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
