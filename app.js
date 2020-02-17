const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    meals = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_meal = document.getElementById('single-meal');

function searchMeal(event) {
    event.preventDefault()

    const term = search.value;

    console.log(term);

    //CHECK IS EMPTY
    if (term.trim()) {

    } else {
        alert('Please enter a search term!');
    }
}

//EVENT LISTENERS
submit.addEventListener('submit', searchMeal);