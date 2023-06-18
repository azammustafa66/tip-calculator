const billAmountInput = document.getElementById("bill-amount");
const tipButtons = document.querySelectorAll("#btns button");
const customButton = document.getElementById("custom-btn");
const numberOfPeopleInput = document.getElementById("number-of-people");
const errorMessage = document.getElementById("error-msg");
const tipAmount = document.getElementById("tip-amount");
const totalPerPerson = document.getElementById("total-per-person");
const resetButton = document.getElementById("reset-btn");
let clickedButton = null;
let customInput = null;

numberOfPeopleInput.classList.remove("border-[#E17457]");

billAmountInput.addEventListener("input", calculateBillAmount);
numberOfPeopleInput.addEventListener("input", calculateBillAmount);
resetButton.addEventListener("click", resetState);

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (clickedButton !== null) {
      clickedButton.style.backgroundColor = "";
      clickedButton.style.color = "";
    }

    clickedButton = button;
    button.style.backgroundColor = "#26C2AE";
    button.style.color = "#00474B";

    calculateBillAmount();
  });
});

customButton.addEventListener("click", () => {
  customInput = document.createElement("input");
  customInput.type = "text";
  customInput.classList.add("custom-input");
  customInput.style.outline = "none";
  customInput.style.fontSize = "24px";
  customInput.style.color = "#00474B";

  customInput.addEventListener("input", calculateBillAmount);
  customButton.parentNode.replaceChild(customInput, customButton);
});

function calculateBillAmount() {
  const billAmount = parseFloat(billAmountInput.value);
  const numberOfPeople = parseInt(numberOfPeopleInput.value);

  if (numberOfPeople === 0) {
    numberOfPeopleInput.classList.add("border-[#E17457]");
    errorMessage.classList.remove("invisible");
  } else {
    numberOfPeopleInput.classList.remove("border-[#E17457]");
    errorMessage.classList.add("invisible");
  }

  if (!isNaN(billAmount) && !isNaN(numberOfPeople)) {
    const tipPercentage = clickedButton ? parseInt(clickedButton.innerText) : 0;
    const totalTip = (billAmount * tipPercentage) / 100;
    const tipPerPerson = totalTip / numberOfPeople;
    const billPerPerson = (billAmount + totalTip) / numberOfPeople;

    tipAmount.textContent = "$" + tipPerPerson.toFixed(2);
    totalPerPerson.textContent = "$" + billPerPerson.toFixed(2);
  }
}

function resetState() {
  billAmountInput.value = 0;

  if (clickedButton) {
    clickedButton.style.backgroundColor = "";
    clickedButton.style.color = "";
    clickedButton = null;
  }

  if (customInput) {
    customInput.parentNode.replaceChild(customButton, customInput);
    customInput = null;
  }

  const customInput = document.querySelector(".custom-input");
  if (customInput) {
    customInput.parentNode.replaceChild(customButton, customInput);
  }

  numberOfPeopleInput.value = "";
  numberOfPeopleInput.classList.remove("border-[#E17457]");
  errorMsg.classList.add("invisible");

  tipAmount.textContent = "$0.00";
  totalPerPerson.textContent = "$0.00";
}
