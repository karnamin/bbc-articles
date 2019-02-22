const title = document.querySelector(".title");
const mainBody = document.querySelector(".main-body");
const allUrls = [`https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-1.json`,
    `https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-2.json`,
    `https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-3.json`,
    `https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-4.json`,
    `https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-5.json`];

let nextArticleButton = document.getElementById("next-article");
let pageCounter = 0;
let para;
let heading;

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
                console.log(data.body[key].model.url);
                let img = new Image();
                img.src = data.body[key].model.url;
                mainBody.appendChild(img);
            }
            else if(data.body[key].type === 'list') {
            }
        }
    }
}