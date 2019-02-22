const title = document.querySelector(".title");
const mainBody = document.querySelector(".main-body");
const allUrls = [`https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-1.json`,
    `https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-2.json`,
    `https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-3.json`,
    `https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-4.json`,
    `https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-5.json`];

let nextArticleButton = document.getElementById("next-article");
const prevArticleButton = document.getElementById("prev-article");

let pageCounter = 0;
let heading;
let para;
let image;
let list;

window.onload = function () {
    let url = allUrls[pageCounter];
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            makeContent(data);
        })
        .catch(error => console.log(error))

    prevArticleButton.addEventListener("click", function () {
        if (pageCounter === 0) {
            alert('This is the first page, cannot go back');
            return;
        }
        if (pageCounter < (allUrls.length - 1)) {
            pageCounter--;
            loadPage(pageCounter);
        }
    });

    nextArticleButton.addEventListener("click", function () {
        if (pageCounter === 3) {
            pageCounter++;
            loadPage(pageCounter);
            nextArticleButton.innerHTML = "Go to ratings";
            loadRatingPage();
        }
        if (pageCounter < (allUrls.length - 1)) {
            pageCounter++;
            loadPage(pageCounter);
            console.log(pageCounter);
        }
    });

    function loadRatingPage() {
        nextArticleButton.addEventListener("click", function () {
            window.location.href = "./ratingsPage.html";
        });
    }

    function loadPage(pageCounter) {
        url = allUrls[pageCounter];
        fetch(url)
            .then(response => {
                return response.json();

            })
            .then(data => {
                console.log(data);
                makeContent(data);
            })
            .catch(error => console.log(error))
    }

    function makeContent(data) {
        mainBody.innerHTML = "";
        title.textContent = data.title;
        heading = `<h4>${data.body[0].model.text}</h4>`;
        mainBody.innerHTML += heading;

        for (var key in data.body) {
            if (data.body[key].type === 'paragraph') {
                para = `<p>${data.body[key].model.text}</p>`;
                mainBody.innerHTML += para;
            }
            else if (data.body[key].type === 'image') {
                image = `<img src="${data.body[key].model.url}" alt="${data.body[key].model.altText}" 
                height="${data.body[key].model.height}" width="${data.body[key].model.width}">`;
                mainBody.innerHTML += image;
            }
            else if (data.body[key].type === 'list') {
                let listItems = "";
                for (var item = 0; item < data.body[key].model.items.length; item++) {
                    listItems += "<li>" + data.body[key].model.items[item] + "</li>"
                }
                list = "<ul>" + listItems + "</ul>";
                mainBody.innerHTML += list;
            }
        }
    }
}