// ── BMI Elements ──
const ageEl = document.getElementById('age');
const weightEl = document.getElementById('weight');
const heightEl = document.getElementById('height');
const activityEl = document.getElementById('activity');
const boyEl = document.getElementById('boy');
const girlEl = document.getElementById('girl');

// ── BMI Result Elements (new IDs) ──
const bmiResultBox = document.getElementById('bmi-result');   // was: 'result'
const bmiVal = document.getElementById('bmi-val');
const bmiTag = document.getElementById('bmi-tag');
const bmiCal = document.getElementById('bmi-cal');

// ── Interest Elements ──
const principalEl = document.getElementById('principal');
const rateEl = document.getElementById('rate');          // was: 'interest'
const timeEl = document.getElementById('time');
const simpleEl = document.getElementById('simple');
const compoundEl = document.getElementById('compound');

// ── Interest Result Elements (new IDs) ──
const intResultBox = document.getElementById('int-result');    // was: 'calculation-result'
const intDetails = document.getElementById('int-details');
const intTotal = document.getElementById('int-total');
const intTypeLabel = document.getElementById('int-type-label');
const intEarned = document.getElementById('int-earned');
const intAmount = document.getElementById('int-amount');
const intPrincipal = document.getElementById('int-principal');
const intRt = document.getElementById('int-rt');

// ── Activity multipliers ──
const activityLevels = {
     '1.2': 1.2,
     '1.375': 1.375,
     '1.55': 1.55,
     '1.725': 1.725,
     '1.9': 1.9
};


//    GENDER AVATAR SYNC --
function selectGender(g) {
     boyEl.checked = g === 'male';
     girlEl.checked = g === 'female';
     document.getElementById('male-avatar').classList.toggle('active', g === 'male');
     document.getElementById('female-avatar').classList.toggle('active', g === 'female');
}

boyEl.addEventListener('change', () => selectGender('male'));
girlEl.addEventListener('change', () => selectGender('female'));


//    BMI & CALORIES CALCULATOR --

function calcBMI() {
     const a = Number(ageEl.value);
     const w = Number(weightEl.value);
     const h = Number(heightEl.value);

     // ── Validations FIRST ──
     if (!ageEl.value || !weightEl.value || !heightEl.value) {
          showToast('Please fill in all fields.');
          shakeBox('bmi-result');
          return;
     }

     if (isNaN(a) || isNaN(w) || isNaN(h)) {
          showToast('Please enter valid numbers.');
          shakeBox('bmi-result');
          return;
     }

     if (a <= 0 || w <= 0 || h <= 0) {
          showToast('Please enter positive values.');
          shakeBox('bmi-result');
          return;
     }

     if (a > 120) {
          showToast('Age must be 120 or less.');
          shakeBox('bmi-result');
          return;
     }

     if (h > 300) {
          showToast('Height must be 300cm or less.');
          shakeBox('bmi-result');
          return;
     }

     if (w > 500) {
          showToast('Weight must be 500kg or less.');
          shakeBox('bmi-result');
          return;
     }

     // ── Calculation ──
     const hm = h / 100;
     const bmi = w / (hm * hm);
     const actMul = Number(activityEl.value);
     const bmr = boyEl.checked
          ? (10 * w) + (6.25 * h) - (5 * a) + 5
          : (10 * w) + (6.25 * h) - (5 * a) - 161;
     const calories = Math.round(bmr * actMul);

     // ── BMI Category ──
     let cat, tagColor, tagBg;
     if (bmi < 18.5) { cat = 'Underweight'; tagColor = '#00d4ff'; tagBg = 'rgba(0,212,255,0.12)'; }
     else if (bmi < 25) { cat = 'Healthy'; tagColor = '#00e5a0'; tagBg = 'rgba(0,229,160,0.12)'; }
     else if (bmi < 30) { cat = 'Overweight'; tagColor = '#ffb83f'; tagBg = 'rgba(255,184,63,0.12)'; }
     else { cat = 'Obese'; tagColor = '#ff5f7e'; tagBg = 'rgba(255,95,126,0.12)'; }

     // ── Update Result DOM ──
     bmiVal.textContent = bmi.toFixed(2) + ' kg/m²';
     bmiTag.textContent = cat;
     bmiTag.style.color = tagColor;
     bmiTag.style.background = tagBg;
     bmiCal.textContent = 'Daily calories: ' + calories.toLocaleString() + ' kcal';

     bmiResultBox.classList.add('has-result');
     pulse(bmiResultBox);
}


//    INTEREST CALCULATOR --
function calcInterest() {
     const p = Number(principalEl.value);
     const r = Number(rateEl.value);
     const t = Number(timeEl.value);

     // ── Validations FIRST ──
     if (!principalEl.value || !rateEl.value || !timeEl.value) {
          showToast('Please fill in all fields.');
          shakeBox('int-result');
          return;
     }

     if (isNaN(p) || isNaN(r) || isNaN(t)) {
          showToast('Please enter valid numbers.');
          shakeBox('int-result');
          return;
     }

     if (p <= 0 || r <= 0 || t <= 0) {
          showToast('Please enter positive values.');
          shakeBox('int-result');
          return;
     }

     // ── Calculation ──
     let interest, total;  //  let — no global leak

     if (simpleEl.checked) {
          interest = (p * r * t) / 100;
          total = p + interest;
     } else {
          total = p * Math.pow(1 + r / 100, t);
          interest = total - p;
     }

     const fmt = n => '₹' + Math.round(n).toLocaleString('en-IN');

     // ── Update Result DOM ──
     intTotal.textContent = fmt(total);
     intTypeLabel.textContent = simpleEl.checked ? 'Simple Interest Total' : 'Compound Interest Total';
     intEarned.textContent = fmt(interest);
     intAmount.textContent = fmt(total);
     intPrincipal.textContent = fmt(p);
     const rtLabel = document.getElementById('int-rt-label');
     if (simpleEl.checked) {
          if (rtLabel) rtLabel.textContent = 'Rate \u00d7 Time';
          intRt.textContent = (r * t).toFixed(2) + '%';
     } else {
          if (rtLabel) rtLabel.textContent = 'Total Growth';
          intRt.textContent = (((total / p) - 1) * 100).toFixed(2) + '%';
     }

     intResultBox.classList.add('has-result');
     intDetails.classList.add('visible');
     pulse(intResultBox);
}


//    HELPERS --

// Smooth pulse on result reveal
function pulse(el) {
     el.style.transition = 'transform 0.1s';
     el.style.transform = 'scale(1.015)';
     setTimeout(() => { el.style.transform = 'scale(1)'; }, 130);
}

// Shake animation on error
function shakeBox(id) {
     const el = document.getElementById(id);
     el.style.borderColor = 'rgba(255,95,126,0.5)';
     setTimeout(() => { el.style.borderColor = ''; }, 700);
     el.animate([
          { transform: 'translateX(0)' },
          { transform: 'translateX(-6px)' },
          { transform: 'translateX(6px)' },
          { transform: 'translateX(-4px)' },
          { transform: 'translateX(4px)' },
          { transform: 'translateX(0)' }
     ], { duration: 340, easing: 'ease-out' });
}

// Toast notification (replaces alert)
let toastTimer;
function showToast(msg) {
     let toast = document.getElementById('app-toast');
     if (!toast) {
          toast = document.createElement('div');
          toast.id = 'app-toast';
          toast.className = 'toast';
          document.body.appendChild(toast);
     }
     toast.textContent = msg;
     toast.classList.add('show');
     clearTimeout(toastTimer);
     toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}