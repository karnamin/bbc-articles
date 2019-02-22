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