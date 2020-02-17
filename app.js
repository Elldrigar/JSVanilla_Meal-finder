const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    meals = document.querySelector('.meals'),
    resultHeading = document.querySelector('.result-heading'),
    single_meal = document.querySelector('.single-meal');

function searchMeal(event) {
    event.preventDefault()

    const term = search.value;

    console.log(term);

    //CHECK IS EMPTY
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search result for '<span class="textred">${term}</span>':</h2>`;

                if (data.meals === null) {
                    resultHeading.innerHTML = `<h2>Sorry! '<span class="textred">${term}</span>' not found. Try again.</h2>`
                } else {
                    meals.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                    `)
                        .join('')
                }
            })
    } else {
        alert('Please enter a search term!');
    }
}

//EVENT LISTENERS
submit.addEventListener('submit', searchMeal);