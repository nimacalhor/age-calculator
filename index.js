const formGregorianEl = document.querySelector("form#gregorian")
const formSolarEl = document.querySelector("form#solar")
const containerGreOutput = document.querySelector("#gregorianOutput")
const containerSolOutput = document.querySelector("#solarOutput")
// all number type inputs elements
const inputsEl = {};
["gregorianYear", "gregorianMonth", "gregorianDay", "solarYear", "solarMonth", "solarDay"]
    .forEach(el => inputsEl[`${el}Input`] = document.querySelector(`#${el}`))

const userInputGregorian = {}
const userInputSolar = {}

class CalculateAge {
    #nowDate = new Date();
    #nowYear;
    #userInput = [];
    #userAge = {};
    constructor(type, ...userBirthDate) {
        // calculate age based on solar or gregorian date
        this.#nowYear = type === "solar" ? +this.#nowDate.toLocaleString("en-US", { year: "numeric", calendar:"persian" }).slice(0,4) : this.#nowDate.getFullYear()
        // save user input values in obj
        userBirthDate.forEach((date, i) => this.#userInput[i] = date)
        // calculate and return [day, month, year]
        this.#calculateYear().#calculateMonth().#calculateDay();
        return [this.#userAge.day, this.#userAge.month, this.#userAge.year]
    }

    #calculateYear() {
        this.#userAge.year = this.#nowYear - this.#userInput[2];
        return this
    }
    #calculateMonth() {
        this.#userAge.month = (this.#userAge.year * 12) + (this.#userInput[1])
        return this
    }
    #calculateDay() {
        this.#userAge.day = (this.#userAge.year * 365) + (this.#userAge.month * 29) + (this.#userInput[0])
        return this
    }
}

formGregorianEl.addEventListener("submit", function (e) {
    e.preventDefault();
    // get and set input values
    ["gregorianYear", "gregorianMonth", "gregorianDay"].forEach(el => {
        const inputValue = +inputsEl[`${el}Input`].value;
        if (!inputValue) return alert("...");
        userInputGregorian[el] = inputValue
    })
    const [day, month, year] = new CalculateAge("gregorian", userInputGregorian.gregorianDay, userInputGregorian.gregorianMonth, userInputGregorian.gregorianYear)
    // render to the dom
    containerGreOutput.insertAdjacentHTML("afterbegin", `${year} years, ${month} months and around ${day} days`)
})

formSolarEl.addEventListener("submit", function (e) {
    e.preventDefault();
    ["solarYear", "solarMonth", "solarDay"].forEach(el => {
        const inputValue = +inputsEl[`${el}Input`].value;
        if (!inputValue) return alert("...");
        userInputSolar[el] = inputValue
    })
    const [day, month, year] = new CalculateAge("solar", userInputSolar.solarDay, userInputSolar.solarMonth, userInputSolar.solarYear)
    containerSolOutput.insertAdjacentHTML("afterbegin", `شما ${year} سال و ${month} ماه و حدود ${day} روز عمر کرده اید`)
})