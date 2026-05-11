const age = document.getElementById('age');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
// const calculate = document.getElementById('submit');
const result = document.getElementById('result');
const boy = document.getElementById('boy');
const girl = document.getElementById('girl');
const activity = document.getElementById('activity');
const activityLevels = {
     sedentary: 1.2,
     light: 1.375,
     moderate: 1.55,
     active: 1.725,
     veryActive: 1.9
};

const principal = document.getElementById('principal');
const rate = document.getElementById('interest');
const time = document.getElementById('time');
const simple = document.getElementById('simple');
const compound = document.getElementById('compound');
let resultInterest = document.getElementById('calculation-result');

console.log(compound.value)
// let res = ""
function calculateBMR() {

     if (age.value === "" || height.value === "" || weight.value === "") {
          alert("Please fill in all fields.");
          return;
     }

     if (isNaN(age.value) || isNaN(height.value) || isNaN(weight.value)) {
          alert("Please enter valid numbers.");
          return;
     }

     let a = Number(age.value)
     let hm = Number(height.value) / 100
     let w = Number(weight.value)
     let h = Number(height.value)
     let bmr;

     if (boy.checked) {
          bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
     } else {
          bmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
     }

     let res = w / (hm * hm)
     let calories = bmr * activityLevels[activity.value];


     if (age.value <= 0 || height.value <= 0 || weight.value <= 0) {
          alert("Please enter positive values.");
          return;
     }

     if (age.value > 120) {
          alert("Please enter a valid age.");
          return;
     }

     if (height.value > 300) {
          alert("Please enter a valid height.");
          return;
     }

     if (weight.value > 500) {
          alert("Please enter a valid weight.");
          return;
     }




     result.innerHTML = `BMI ${res.toFixed(2)} kg/m² <br> Calories ${calories.toFixed(2)}  kcal/day `
     // result.innerText = "BMI: " + res.toFixed(2) + " kg/m²" + "\n" + "Calories: " + calories.toFixed(2) + " kcal/day";

}

function evaluateExpression() {
     if (principal.value === "" || rate.value === "" || time.value === "") {
          alert("Please fill in all fields.");
          return;
     }

     if (isNaN(principal.value) || isNaN(rate.value) || isNaN(time.value)) {
          alert("Please enter valid numbers.");
          return;
     }

     let p = Number(principal.value)
     let r = Number(rate.value)
     let t = Number(time.value)
     let res;
     // res = (p * r * t) / 100


     if (simple.checked) {
          interest = (p * r * t) / 100;

          amount = p + interest;

          resultInterest.innerHTML =
               `Simple Interest : ${interest.toFixed(2)} <br>
               Total Amount : ${amount.toFixed(2)}`;


     } else {
          amount = p * ((1 + r / 100) ** t);

          interest = amount - p;

          resultInterest.innerHTML =
               `Compound Interest : ${interest.toFixed(2)} 
               Total Amount : ${amount.toFixed(2)}`;

     }


     // resultInterest.innerText = "Amount is: " + res

}