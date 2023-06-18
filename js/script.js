const billAmountInput = document.getElementById("bill-amount");
const tipButtons = document.querySelectorAll("#btns button");
const numberOfPeopleInput = document.getElementById("number-of-people");
const tipAmount = document.getElementById("tip-amount");
const billPerPerson = document.getElementById("total-bill-per-person");
const errorMsg = document.getElementById("error-msg");
let clickedButton = null;
const customButton = document.getElementById("custom-btn");

tipButtons.forEach((button) => {
  handleButtonClick(button);
});

customButton.addEventListener("click", () => {
  const customInput = document.createElement("input");
  customInput.type = "text";
  customInput.classList.add("custom-input");
  customInput.style.outline = "none";
  customInput.style.fontSize = "24px";
  customInput.style.color = "#00474B";

  customInput.addEventListener("input", calculateTip);

  customButton.parentNode.replaceChild(customInput, customButton);
});

numberOfPeopleInput.classList.remove("border-[#E17457]");

billAmountInput.addEventListener("input", calculateTip);
numberOfPeopleInput.addEventListener("input", calculateTip);

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.style.backgroundColor = "#26C2AE";
    button.style.color = "#00474B";
    clickedButton = button;
    calculateTip();
  });
});

function calculateTip() {
  const billAmount = parseFloat(billAmountInput.value);
  const numberOfPeople = parseInt(numberOfPeopleInput.value);

  if (numberOfPeople === 0) {
    numberOfPeopleInput.classList.add("border-[#E17457]");
    errorMsg.classList.remove("invisible");
  }

  numberOfPeopleInput.addEventListener("input", () => {
    numberOfPeopleInput.classList.remove("border-[#E17457]");
    errorMsg.classList.add("invisible");
  });

  if (!isNaN(billAmount) && !isNaN(numberOfPeople)) {
    const tipPercentage = clickedButton ? parseInt(clickedButton.innerText) : 0;
    const tipPerPerson = (billAmount * tipPercentage) / (100 * numberOfPeople);
    const totalPerPerson = (billAmount + tipPerPerson) / numberOfPeople;

    tipAmount.textContent = "$" + tipPerPerson.toFixed(2);
    billPerPerson.textContent = "$" + totalPerPerson.toFixed(2);
  }
}

function handleButtonClick(button) {
  button.addEventListener("click", () => {
    if (clickedButton !== null) {
      clickedButton.style.backgroundColor = "";
      clickedButton.style.color = "";
    }

    clickedButton = button;
    button.style.backgroundColor = "#26C2AE";
    button.style.color = "#00474B";

    calculateTip();
  });
}
