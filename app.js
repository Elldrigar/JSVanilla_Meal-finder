const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    meals = document.querySelector('.meals'),
    resultHeading = document.querySelector('.result-heading'),
    single_meal = document.querySelector('.single-meal');

function searchMeal(event) {
    event.preventDefault()

    const term = search.value;

    //CHECK IS EMPTY
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
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
                    `).join('')
                }
            });
        //CLEAR     
        clearAll();

    } else {
        alert('Please enter a search term!');
    }
};

function clearAll() {
    search.value = '';
    single_meal.innerHTML = '';
    resultHeading.innerHTML = '';
}


//FETCH MEALI BY ID

function getMealById(mealID) {
    clearAll();
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];

            addMealToDOM(meal);
        })
}

//FETCH RANDOM MEAL FROM API

function getRandomMeal() {
    meals.innerHTML = '';
    clearAll();

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            resultHeading.innerHTML = `<h2>Search result for '<span class="textred">Random</span>':</h2>`

            addMealToDOM(meal);
        })

}

//ADD MEAL TO DOM
function addMealToDOM(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    single_meal.innerHTML = `
    <div class="single-meal">
        <h2 class="textred">${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
         ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
         ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
        </div>
        <div>
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
    </div>
    `;
}

//EVENT LISTENERS
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

meals.addEventListener('click', event => {
    const mealInfo = event.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });

    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }
});