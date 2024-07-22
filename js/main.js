/// <reference types = "../@types/jquery/" />


let clickSearch = document.getElementById('search');
let clickCategory = document.getElementById('category');
let clickArea = document.getElementById('area');
let clickingr = document.getElementById('ingre');
let clickcontact = document.getElementById('contact');

function showLoaderSearch() {
    $('.load').css('display', 'flex').removeClass('d-none');
    $('body').css('overflow', 'hidden');
    $('.load').css('margin-top', '70px')
    $('aside').css('z-index', '9999')
}
function showLoader() {
    $('.load').css('display', 'flex').removeClass('d-none');
    $('body').css('overflow', 'hidden');
    $('.load').css('margin-top', '0')
    $('aside').css('z-index', '999')
}

function hideLoader() {
    $('.load').fadeOut(200, function () {
        $('.load').addClass('d-none');
        $('body').css('overflow', 'auto');

        $('.list').animate({ width: 'hide' }, 500)
        $('.open').animate({ left: 0 }, 500)
        $('#bars').removeClass('d-none')
        $('#close').addClass('d-none')
        $('.links li').animate({ top: '200px' }, 500)
    });
}



$('#bars').on('click', function () {
    $('.list').animate({ width: 'show' }, 500)
    $('.open').animate({ left: '259px' }, 500)
    $('#bars').addClass('d-none')
    $('#close').removeClass('d-none')
    for (let i = 0; i < 5; i++) {
        $('.links li').eq(i).animate({ top: '0' }, (i + 5) * 100)
    }
})
$('#close').on('click', function () {
    $('.list').animate({ width: 'hide' }, 500)
    $('.open').animate({ left: '0' }, 500)
    $('#bars').removeClass('d-none')
    $('#close').addClass('d-none')
    $('.links li').animate({ top: '200px' }, 500)
})

function search() {
    cartona = `
            <div class="col-md-6 ">
                <input oninput = getByName(this.value) id="byName" class="form-control" type="text" name="searchByName" placeholder="Search By Name">
            </div>
            <div class="col-md-6 ">
                <input oninput = getByFLetter(this.value) class="form-control" type="text" name="searchByFirstLetter" placeholder="Search By First Letter">
            </div>`

    document.getElementById('search-items').innerHTML = cartona
    document.getElementById('search-items').style.display = 'flex';
    document.getElementById('display').style.display = 'none';

}

$(clickSearch).on('click', function () {
    search();
    $('.list').animate({ width: 'hide' }, 500)
    $('.open').animate({ left: 0 }, 500)
    $('#bars').removeClass('d-none')
    $('#close').addClass('d-none')
    $('.links li').animate({ top: '200px' }, 500)
})




async function getByName(name) {
    showLoaderSearch()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let data = await response.json();
    console.log(data);

    hideLoader(); 

    if (data.meals) {
        displayMeals(data.meals);
    } else {
        displayMeals([]);
    }
}


async function getByFLetter(letter) {
    showLoaderSearch();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let data = await response.json();
    console.log(data);

    hideLoader();

    if (data.meals) {
        displayMeals(data.meals);
    } else {
        displayMeals([]);
    }
}



function displayMeals(meals) {
    let cartona = ``;
    for (let i = 0; i < meals.length; i++) {
        cartona += `
            <div class="col-md-3">
                <div class="overflow-hidden dish" onclick = details(${meals[i].idMeal})>
                    <img class="rounded-2" src="${meals[i].strMealThumb}" alt="${meals[i].strMeal}">
                    <div class="hover rounded-2">
                        <h2 class="ms-3">${meals[i].strMeal}</h2>
                    </div>
                </div>
            </div>`
    }


    document.getElementById("display").innerHTML = cartona;
    document.getElementById('display').style.display = 'flex';
}


async function details(id) {
    showLoader()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let data = await response.json();
    console.log(data);
    hideLoader()
    let cartona = `
            <div class="col-md-4 mt-5">
                <img class="rounded-2" style="width: 100%;" src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}">
                <h3 class="text-white mt-1">${data.meals[0].strMeal}</h3>
            </div>
            <div class="col-md-8 text-white mt-5">
                <h1>Instructions</h1>
                <p>${data.meals[0].strInstructions}</p>
                <h3>Area : <span>${data.meals[0].strArea}</span></h3>
                <h3>Category : <span>${data.meals[0].strCategory}</span></h3>
                <h3>Ingredients :</h3>
                <ul class="list-unstyled d-flex flex-wrap">
        `;

    for (let i = 1; i <= 100; i++) {
        if (data.meals[0][`strIngredient${i}`]) {
            cartona += `<li class="alert alert-info m-2 py-2">${data.meals[0][`strIngredient${i}`]} - ${data.meals[0][`strMeasure${i}`]}</li>`;
        }
    }

    cartona += `
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex flex-wrap">
        `;

    if (data.meals[0].strTags) {
        let tags = data.meals[0].strTags.split(',');
        tags.forEach(tag => {
            cartona += `<li class="alert alert-danger m-2 py-2">${tag.trim()}</li>`;
        });
    }

    cartona += `
                </ul>
                <a target="_blank" href="${data.meals[0].strSource}" class="btn btn-success py-2 m-1 source">Source</a>
                <a target="_blank" href="https://www.youtube.com/watch?v=${data.meals[0].strYoutube.slice(-11)}" class="btn btn-danger py-2 m-1">Youtube</a>
            </div>
        `;


    document.getElementById('display').innerHTML = cartona;
    document.getElementById('display').style.display = 'flex';
    document.getElementById('search-items').style.display = 'none';
}


$(clickCategory).on('click', function () {
    category()
    $('.list').animate({ width: 'hide' }, 500)
    $('.open').animate({ left: 0 }, 500)
    $('#bars').removeClass('d-none')
    $('#close').addClass('d-none')
    $('.links li').animate({ top: '200px' }, 500)
})


async function category() {
    showLoader();
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let data = await response.json();
    console.log(data);

    hideLoader();

    let cartona = '';
    for (let i = 0; i < data.categories.length; i++) {
        cartona += `
            <div class="col-md-3 mt-4">
                <div onclick="inCategory('${data.categories[i].strCategory}')" class="w-100 position-relative images overflow-hidden">
                    <img class="rounded-2" src="${data.categories[i].strCategoryThumb}" alt="${data.categories[i].strCategory}">
                    <div class="layer rounded-2">
                        <h3>${data.categories[i].strCategory}</h3>
                        <p>${data.categories[i].strCategoryDescription}</p>
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById('display').innerHTML = cartona;
    document.getElementById('display').style.display = 'flex';
    document.getElementById('search-items').style.display = 'none';
}



async function inCategory(cat) {
    showLoader()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    let data = await response.json();
    hideLoader()

    console.log(data);

    let cartona = '';
    for (let i = 0; i < data.meals.length; i++) {
        cartona += `
        <div class="col-md-3 mt-4">
            <div onclick="details(${data.meals[i].idMeal})" class="w-100 position-relative images overflow-hidden">
                <img class="rounded-2" src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}">
                <div class="layer rounded-2 d-flex align-items-center justify-content-center">
                    <h3>${data.meals[i].strMeal}</h3>
                </div>
            </div>
        </div>`
    }

    document.getElementById('display').innerHTML = cartona;
    document.getElementById('display').style.display = 'flex';
    document.getElementById('search-items').style.display = 'none';
}



$(clickArea).on('click', function () {
    area();
    $('.list').animate({ width: 'hide' }, 500)
    $('.open').animate({ left: 0 }, 500)
    $('#bars').removeClass('d-none')
    $('#close').addClass('d-none')
    $('.links li').animate({ top: '200px' }, 500)
})

async function area() {
    showLoader()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data = await response.json()
    console.log(data);
    hideLoader()

    let cartona = ``
    for (let i = 0; i < data.meals.length; i++) {
        cartona += `
            <div onclick = inArea('${data.meals[i].strArea}') class="col-md-3 text-center icon">
                <i style="color: #fff;"  class="fa-solid fa-house-laptop fa-4x"></i>
                <h3 style="color: #fff;">${data.meals[i].strArea}</h3>
            </div>
        `
    }
    document.getElementById('display').innerHTML = cartona;
    document.getElementById('display').style.display = 'flex';
    document.getElementById('search-items').style.display = 'none';
}



async function inArea(city) {
    showLoader();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${city}`);
    let data = await response.json();
    console.log(data);
    hideLoader()


    let cartona = '';
    for (let i = 0; i < data.meals.length; i++) {
        cartona += `
        <div class="col-md-3 mt-4">
            <div onclick="details(${data.meals[i].idMeal})" class="w-100 position-relative images overflow-hidden">
                <img class="rounded-2" src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}">
                <div class="layer rounded-2 d-flex align-items-center justify-content-center">
                    <h3>${data.meals[i].strMeal}</h3>
                </div>
            </div>
        </div>`;
    }
    document.getElementById('display').innerHTML = cartona;
    document.getElementById('display').style.display = 'flex';
    document.getElementById('search-items').style.display = 'none';
}

$(clickingr).on('click', function () {
    ingredients();
    $('.list').animate({ width: 'hide' }, 500)
    $('.open').animate({ left: 0 }, 500)
    $('#bars').removeClass('d-none')
    $('#close').addClass('d-none')
    $('.links li').animate({ top: '200px' }, 500)
})

async function ingredients() {
    showLoader()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await response.json()
    console.log(data);
    hideLoader()

    let cartona = ``
    for (let i = 0; i < 20; i++) {
        cartona += `
            <div onclick = iningredients('${data.meals[i].strIngredient}') class="col-md-3 text-center icon">
                <i style="color: #fff;"  class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3 style="color: #fff;">${data.meals[i].strIngredient}</h3>
                <p style="color: #fff;">${data.meals[i].strDescription.substring(0, 109)}</p>
            </div>
        `
    }
    document.getElementById('display').innerHTML = cartona;
    document.getElementById('display').style.display = 'flex';
    document.getElementById('search-items').style.display = 'none';
}



async function iningredients(type) {
    showLoader()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${type}`);
    let data = await response.json();
    console.log(data);
    hideLoader()

    let cartona = '';
    for (let i = 0; i < data.meals.length; i++) {
        cartona += `
        <div class="col-md-3 mt-4">
            <div onclick="details(${data.meals[i].idMeal})" class="w-100 position-relative images overflow-hidden">
                <img class="rounded-2" src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}">
                <div class="layer rounded-2 d-flex align-items-center justify-content-center">
                    <h3>${data.meals[i].strMeal}</h3>
                </div>
            </div>
        </div>`;
    }
    document.getElementById('display').innerHTML = cartona;
    document.getElementById('display').style.display = 'flex';
    document.getElementById('search-items').style.display = 'none';
}

$(clickcontact).on('click', function () {
    contact();
    $('.list').animate({ width: 'hide' }, 500)
    $('.open').animate({ left: 0 }, 500)
    $('#bars').removeClass('d-none')
    $('#close').addClass('d-none')
    $('.links li').animate({ top: '200px' }, 500)
})



function contact() {
    cartona = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input oninput="validateField('name')" id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input oninput="validateField('email')" id="emailInput" type="email" class="form-control" placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *example@yyy.xxx
                    </div>
                </div>
                <div class="col-md-6">
                    <input oninput="validateField('phone')" id="phoneInput" type="text" class="form-control" placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input oninput="validateField('age')" id="ageInput" type="number" class="form-control" placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input oninput="validateField('password')" id="passInput" type="password" class="form-control" placeholder="Enter Your Password">
                    <div id="passAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input oninput="validateField('repassword')" id="repassInput" type="password" class="form-control" placeholder="Re-enter Password">
                    <div id="repassAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Passwords do not match
                    </div>
                </div>
            </div>
            <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
    </div>
    `;
    document.getElementById('display').innerHTML = cartona;
    document.getElementById('display').style.display = 'flex';
    document.getElementById('search-items').style.display = 'none';

    $('#nameInput').on('input', function () {
        validationName();
        validateSubmitButton();
    });

    $('#emailInput').on('input', function () {
        validationEmail();
        validateSubmitButton();
    });

    $('#phoneInput').on('input', function () {
        validationPhone();
        validateSubmitButton();
    });

    $('#ageInput').on('input', function () {
        validationAge();
        validateSubmitButton();
    });

    $('#passInput').on('input', function () {
        validationPass();
        validateSubmitButton();
    });

    $('#repassInput').on('input', function () {
        validationRepass();
        validateSubmitButton();
    });
}

function validationName() {
    let name = $('#nameInput').val().trim();
    let regex = /^[a-zA-Z\s]{3,}$/;

    if (name === '') {
        $('#nameAlert').addClass('d-none');
        $('#nameAlert').removeClass('d-block');
        $('#nameInput').removeClass('is-valid');
        $('#nameInput').removeClass('is-invalid');
        return false;
    }

    if (regex.test(name)) {
        $('#nameAlert').addClass('d-none');
        $('#nameAlert').removeClass('d-block');
        $('#nameInput').addClass('is-valid');
        $('#nameInput').removeClass('is-invalid');
        return true;
    } else {
        $('#nameAlert').removeClass('d-none');
        $('#nameAlert').addClass('d-block');
        $('#nameInput').removeClass('is-valid');
        $('#nameInput').addClass('is-invalid');
        return false;
    }
}

function validationEmail() {
    let email = $('#emailInput').val().trim();
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
        $('#emailAlert').addClass("d-none");
        $('#emailAlert').removeClass("d-block");
        $('#emailInput').removeClass("is-valid");
        $('#emailInput').removeClass("is-invalid");
        return false;
    }

    if (regex.test(email)) {
        $('#emailAlert').addClass("d-none");
        $('#emailAlert').removeClass("d-block");
        $('#emailInput').addClass("is-valid");
        $('#emailInput').removeClass("is-invalid");
        return true;
    } else {
        $('#emailAlert').removeClass("d-none");
        $('#emailAlert').addClass("d-block");
        $('#emailInput').removeClass("is-valid");
        $('#emailInput').addClass("is-invalid");
        return false;
    }
}

function validationPhone() {
    let number = $('#phoneInput').val().trim();
    let regex = /^\d{11}$/;

    if (number === '') {
        $('#phoneAlert').addClass("d-none");
        $('#phoneAlert').removeClass("d-block");
        $('#phoneInput').removeClass("is-valid");
        $('#phoneInput').removeClass("is-invalid");
        return false;
    }

    if (regex.test(number)) {
        $('#phoneAlert').addClass("d-none");
        $('#phoneAlert').removeClass("d-block");
        $('#phoneInput').addClass("is-valid");
        $('#phoneInput').removeClass("is-invalid");
        return true;
    } else {
        $('#phoneAlert').removeClass("d-none");
        $('#phoneAlert').addClass("d-block");
        $('#phoneInput').removeClass("is-valid");
        $('#phoneInput').addClass("is-invalid");
        return false;
    }
}

function validationAge() {
    let age = $('#ageInput').val().trim();
    let regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][0-9]|200)$/;

    if (age === '') {
        $('#ageAlert').addClass("d-none");
        $('#ageAlert').removeClass("d-block");
        $('#ageInput').removeClass("is-valid");
        $('#ageInput').removeClass("is-invalid");
        return false;
    }

    if (regex.test(age)) {
        $('#ageAlert').addClass("d-none");
        $('#ageAlert').removeClass("d-block");
        $('#ageInput').addClass("is-valid");
        $('#ageInput').removeClass("is-invalid");
        return true;
    } else {
        $('#ageAlert').removeClass("d-none");
        $('#ageAlert').addClass("d-block");
        $('#ageInput').removeClass("is-valid");
        $('#ageInput').addClass("is-invalid");
        return false;
    }
}

function validationPass() {
    let pass = $('#passInput').val().trim();
    const regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;

    if (pass === '') {
        $('#passAlert').addClass("d-none");
        $('#passAlert').removeClass("d-block");
        $('#passInput').removeClass("is-valid");
        $('#passInput').removeClass("is-invalid");
        return false;
    }

    if (regex.test(pass)) {
        $('#passAlert').addClass("d-none");
        $('#passAlert').removeClass("d-block");
        $('#passInput').addClass("is-valid");
        $('#passInput').removeClass("is-invalid");
        return true;
    } else {
        $('#passAlert').removeClass("d-none");
        $('#passAlert').addClass("d-block");
        $('#passInput').removeClass("is-valid");
        $('#passInput').addClass("is-invalid");
        return false;
    }
}

function validationRepass() {
    let pass = $('#passInput').val().trim();
    let repass = $('#repassInput').val().trim();

    if (repass === '') {
        $('#repassAlert').addClass("d-none");
        $('#repassAlert').removeClass("d-block");
        $('#repassInput').removeClass("is-valid");
        $('#repassInput').removeClass("is-invalid");
        return false;
    }

    if (pass === repass) {
        $('#repassAlert').addClass("d-none");
        $('#repassAlert').removeClass("d-block");
        $('#repassInput').addClass("is-valid");
        $('#repassInput').removeClass("is-invalid");
        return true;
    } else {
        $('#repassAlert').removeClass("d-none");
        $('#repassAlert').addClass("d-block");
        $('#repassInput').removeClass("is-valid");
        $('#repassInput').addClass("is-invalid");
        return false;
    }
}

function validateSubmitButton() {
    let validName = validationName();
    let validEmail = validationEmail();
    let validPhone = validationPhone();
    let validAge = validationAge();
    let validPass = validationPass();
    let validRepass = validationRepass();

    let submitBtn = $('#submitBtn');

    if (validName && validEmail && validPhone && validAge && validPass && validRepass) {
        submitBtn.removeAttr("disabled");
    } else {
        submitBtn.attr("disabled", true);
    }
}



async function random() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=A`);
    let data = await response.json();
    $(function () {
        $('.load').fadeOut(200, function () {
            $('.load').addClass('d-none')
        })
        $('body').css('overflow', 'auto')
    })
    console.log(data);
    let cartona = '';
    for (let i = 0; i < data.meals.length; i++) {
        cartona += `
        <div class="col-md-3 mt-4">
            <div onclick="details(${data.meals[i].idMeal})" class="w-100 position-relative images overflow-hidden">
                <img class="rounded-2" src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}">
                <div class="layer rounded-2 d-flex align-items-center justify-content-center">
                    <h3>${data.meals[i].strMeal}</h3>
                </div>
            </div>
        </div>`
    }

    document.getElementById('display').innerHTML = cartona;
    document.getElementById('display').style.display = 'flex';
    document.getElementById('search-items').style.display = 'none';
}
random();