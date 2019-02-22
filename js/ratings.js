const ratingsBody = document.querySelector(".ratingsBody");
const allUrls = [`https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-1.json`,
    `https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-2.json`,
    `https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-3.json`,
    `https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-4.json`,
    `https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-5.json`];
const articlesCount = [0, 1, 2, 3, 4];
let url;
let titles;
let n = 0;
let allTitles = [];
const articleSelect = document.getElementById('article-select');
const ratingControl = document.getElementById('rating-control');

for (var i = 0; i < allUrls.length; i++) {
    url = allUrls[i];
    fetch(url)
        .then(response => {
            return response.json();

        })
        .then(data => {
            allTitles.push(data.title);
            makeTable(data);
            getRatings();
        })
        .catch(error => console.log(error))
}

function makeTable(data) {
    titles = `<tr class="obj${articlesCount[n]}">
        <td>${data.title}</td>
        <td>
            <div class="stars-outer">
                <div class="stars-inner"></div>
            </div>
            <span class="number-rating"></span>
        </td>
        </tr>`
    ratingsBody.innerHTML += titles;
    n++;
}

setTimeout(function makeList() {
    let option;
    for (var i = 0; i < allTitles.length; i++) {
        option = `<option value="obj${i}">${allTitles[i]}</option>`;
        articleSelect.innerHTML += option;
    }
}, 1000)

// Initial ratings
const ratings = {
    obj0: 0.0,
    obj1: 0.0,
    obj2: 0.0,
    obj3: 0.0,
    obj4: 0.0
}

// Total Stars
const starsTotal = 5;

// Init article
let article;

articleSelect.addEventListener('change', (e) => {
    article = e.target.value;
    ratingControl.disabled = false;
    ratingControl.value = ratings[article];
});

ratingControl.addEventListener('blur', (e) => {
    const rating = e.target.value;

    // Make sure 5 or under
    if (rating > 5) {
        alert('Please rate 1-5');
        return;
    }

    // Change rating
    ratings[article] = rating;

    getRatings();
});

// Get ratings
function getRatings() {
    for (let rating in ratings) {

        // Get percentage
        const starPercentage = (ratings[rating] / starsTotal) * 100;

        //Round to nearest 10
        const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

        // Set width of stars-inner to percentage
        document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;

        // Add number rating
        document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];
    }
}