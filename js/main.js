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