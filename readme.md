# BMI & Interest Calculator

A modern dark-themed calculator with two tools — BMI/Calories and Interest Calculator.

---

## Files

```
FUNCTIONAL CAL/
├── css/
│   ├── style.css
│   └── res.css
├── image/
├── js/
│   └── script.js
├── index.html
└── README.md

---

## How to Run

Just open `index.html` in any browser. No server needed.

---

## Features

**BMI & Calories**

- Male / Female toggle with avatar selector
- Calculates BMI and daily calorie needs
- Color-coded result: Underweight / Healthy / Overweight / Obese
- Activity level support (Sedentary to Very Active)

**Interest Calculator**

- Simple Interest and Compound Interest toggle
- Shows breakdown: Interest Earned, Total Amount, Principal, Rate×Time
- Indian Rupee (₹) format

**UX**

- Toast notification instead of browser alerts
- Shake animation on invalid input
- Fully responsive — works on mobile too

---

## Formulas Used

**BMI**

```
BMI = weight(kg) / height(m)²
```

**BMR (Mifflin-St Jeor)**

```
Male:   BMR = 10×weight + 6.25×height - 5×age + 5
Female: BMR = 10×weight + 6.25×height - 5×age - 161
```

**Daily Calories**

```
Calories = BMR × Activity Multiplier
```

**Simple Interest**

```
SI = (P × R × T) / 100
```

**Compound Interest**

```
A = P × (1 + R/100)^T
```

---

## Validations

| Field  | Rule                            |
| ------ | ------------------------------- |
| Age    | Required, positive, max 120     |
| Weight | Required, positive, max 500 kg  |
| Height | Required, positive, max 300 cm  |
| P/R/T  | Required, positive numbers only |

---

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Google Fonts — Outfit + DM Sans
- No frameworks, no libraries
