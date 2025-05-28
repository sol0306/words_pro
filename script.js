
let words = [];
let shuffledWords = [];
let currentIndex = 0;
let timer = 0;
let stopwatchInterval;

// JSON 파일 이름을 'words.json'으로 수정
fetch('words.json?_=' + new Date().getTime())
  .then(response => response.json())
  .then(data => {
    words = data;
    shuffleWords(); // 처음 한 번 셔플
  });

function shuffleWords() {
  shuffledWords = [...words].sort(() => Math.random() - 0.5);
  currentIndex = 0;
}

function startApp() {
  document.getElementById("start_section").style.display = "none";
  document.getElementById("app_section").style.display = "block";
  generateWord();
}

function generateWord() {
  if (shuffledWords.length === 0) return;

  if (currentIndex >= shuffledWords.length) {
    shuffleWords();
  }

  const random = shuffledWords[currentIndex++];
  document.getElementById("word_display").innerText = `단어: ${random.ko_word}`;
  document.getElementById("jp_word").innerText = random.jp_word;
  document.getElementById("jp_meaning").innerText = random.jp_meaning;

  document.getElementById("jp_display").style.display = "none";
  document.getElementById("meaning_display").style.display = "none";

  document.getElementById("btn_show_jp").style.display = "inline-block";
  document.getElementById("btn_show_meaning").style.display = "none";
  document.getElementById("btn_next").style.display = "none";
  document.getElementById("btn_stop").style.display = "none";

  clearInterval(stopwatchInterval);
  timer = 0;
  document.getElementById("stopwatch").innerText = "스톱워치: 00:00";
  stopwatchInterval = setInterval(updateStopwatch, 1000);
}

function revealJapanese() {
  document.getElementById("jp_display").style.display = "block";
  document.getElementById("btn_show_jp").style.display = "none";
  document.getElementById("btn_show_meaning").style.display = "inline-block";
}

function revealMeaning() {
  document.getElementById("meaning_display").style.display = "block";
  document.getElementById("btn_show_meaning").style.display = "none";
  document.getElementById("btn_next").style.display = "inline-block";
  document.getElementById("btn_stop").style.display = "inline-block";
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
}

function updateStopwatch() {
  timer++;
  const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
  const seconds = String(timer % 60).padStart(2, '0');
  document.getElementById("stopwatch").innerText = `스톱워치: ${minutes}:${seconds}`;
}
