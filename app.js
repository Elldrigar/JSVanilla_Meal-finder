const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    meals = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_meal = document.getElementById('single-meal');

function searchMeal(event) {
    event.preventDefault()
}

//EVENT LISTENERS
submit.addEventListener('submit', searchMeal);