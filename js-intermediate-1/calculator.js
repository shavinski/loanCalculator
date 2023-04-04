// Find DOM element and hold onto it, so we don't have to search for it
// every time we use it.
const calcForm = document.getElementById("calc-form");
const loanAmount = document.querySelector('#loan-amount');
const loanYears = document.querySelector('#loan-years');
const loanRate = document.querySelector('#loan-rate');
const displayMonthlyPayment = document.querySelector('#calc-monthly-payment');


/** Get form values and return as `{amount, years, rate}`.
 *
 * Example output: `{"amount": 10000, "years": 10, "rate": 4.5}`.
 *
 * */

function getFormValues() {
  const amount = loanAmount.value;
  const years = loanYears.value;
  const rate = loanRate.value;


  
// NOT SURE IF THIS IS FORMATTED CORRECTLY


  if (amount < 0) {
    throw new Error('Please make sure the loan amount is positive');
  };

  if (years < 0) {
    throw new Error('Please make sure the number of years is positive');
  };

  if (rate < 0) {
    throw new Error('Please make sure the rate is larger than 0.00');
  };
  

  // USE OBJECT SHORTHAND IF KEYS ARE EQAUL TO VALUES 
  return {amount, years, rate};
}

// NOT SURE IF THIS IS FORMATTED CORRECTLY
// try {
//   getFormValues()
// } catch (err) {

//   if (amount < 0) {
//     throw new Error('Please make sure the loan amount is positive');
//   };

//   if (years < 0) {
//     throw new Error('Please make sure the number of years is positive');
//   };

//   if (rate < 0) {
//     throw new Error('Please make sure the rate is larger than 0.00');
//   };

//   console.log('err', err.message)
// }


/** Calculate monthly payment and return exact amount. */

function calcMonthlyPayment(amount, years, rate) {
  const rateToPercent = (rate / 12) / 100;
  const totalNumberOfPayments = years * 12;

  const monthlyPayment = (amount * rateToPercent) / (1 - Math.pow((1 + rateToPercent), -totalNumberOfPayments));

  // move toFixed(2) to getFormValuesAndDisplay
  return monthlyPayment;
};


/** Get form values, calculate, convert to 2-decimal places, and update UI. */

function getFormValuesAndDisplayResults() {
  // getFormValues()
  try {
    const formValues = getFormValues();
    const amount = formValues.amount;
    const years = formValues.years;
    const rate = formValues.rate;
  
    displayMonthlyPayment.textContent = calcMonthlyPayment(amount, years, rate).toFixed(2);
  } catch(err) {
    console.log(err.message);
    return;
  };

}


/** Set initial form values and show initial results. Called at app start. */

function setInitialValues() {
  // use the default values in the provided screenshot
  const startAmount = 10000;
  const startYears = 10;
  const startRate = 4.5

  loanAmount.value = startAmount;
  loanYears.value = startYears;
  loanRate.value = startRate;

  displayMonthlyPayment.textContent = calcMonthlyPayment(startAmount, startYears,startRate).toFixed(2);

}


/** Start: set form defaults & display; attach form submit event listener. */

function start() {
  setInitialValues();

  calcForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    getFormValuesAndDisplayResults();
  });
}
