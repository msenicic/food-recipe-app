let searchButton = document.querySelector("#button");
let products = document.querySelector(".products");
let details = document.querySelector(".details");
let select = document.querySelector("#list");

searchButton.addEventListener("click", () => {
    let searchValue = document.querySelector("input").value.trim();
    let selectValue = select.value;
    let letter;
    selectValue == "ingredient" ? letter = "i" : selectValue == "category" ? letter = "c" : letter = "a";
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${letter}=${searchValue}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(item => {
                    html += `
                    <div class="product" data-id="${item.idMeal}">
                        <div class="inner">
                            <img src="${item.strMealThumb}" alt="">
                            <div class="product-details">
                                <div class="name">
                                    <p>${item.strMeal}</p>
                                </div>
                                <div class="product-button">Get Recipe</div>
                            </div>
                        </div>
                    </div>
                `;
                });
            }
            else {
                html = `
                    <p>Sorry, we didn't find any meal!</p>
                `;
            }
            products.innerHTML = html;
        });
});

select.addEventListener("change", () => {
    let selectValue = select.value;
    let input = document.querySelector("input");
    selectValue == "ingredient" ? input.placeholder = "Enter an ingredient" : selectValue == "category" ? input.placeholder = "Enter an category" : input.placeholder = "Enter an area";
});

products.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains('product-button')) {
        let meal = e.target.parentElement.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.dataset.id}`)
            .then(response => response.json())
            .then(data => {
                let html = "";
                html = `
                    <div class="button"><i class="fas fa-times"></i></div>
                    <div class="title">
                        <p>${data.meals[0].strMeal}</p>
                        <div class="category"><span>${data.meals[0].strCategory}</span></div>
                    </div>
                    <div class="instruction">
                        <p>Instruction: </p>
                        <p>${data.meals[0].strInstructions}</p>
                        <div class="watch">
                            <img src="${data.meals[0].strMealThumb}" alt="">
                            <a href="${data.meals[0].strYoutube}">Watch Video</a>
                        </div>
                    </div>
                `;
                details.innerHTML = html;
                details.classList.add("show");
                let detailsButton = document.querySelector(".button");
                detailsButton.addEventListener("click", () => {
                    details.classList.remove("show");
                });
            });
    }
});