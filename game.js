
const questions = [
  {
    question: "Name a species of freshwater fish.",
    answers: ["largemouth bass", "smallmouth bass", "northern pike", "muskie", "walleye"]
  },
  {
    question: "Name a brand of fishing reel.",
    answers: ["shimano", "daiwa", "abu garcia", "penn", "lew's"]
  },
  {
    question: "Name a musky fishing lure.",
    answers: ["suick", "bulldawg", "medussa", "cowgirl"]
  },
  {
    question: "Name a type of fishing line.",
    answers: ["monofilament", "fluorocarbon", "braid", "copolymer"]
  },
  {
    question: "Name a saltwater fish.",
    answers: ["tuna", "marlin", "swordfish", "tarpon", "barracuda"]
  },
  {
    question: "Name a fishing technique.",
    answers: ["jigging", "trolling", "fly fishing", "drop shot"]
  },
  {
    question: "Name a fishing rod brand.",
    answers: ["shimano", "st croix", "daiwa", "fenwick", "abu garcia"]
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 25;
let timer;

const playButton = document.getElementById("playButton");
const submitButton = document.getElementById("submitButton");
const answerInput = document.getElementById("answer");

playButton.addEventListener("click", startGame);
submitButton.addEventListener("click", submitAnswer);

answerInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") submitAnswer();
});

function startGame() {
  currentQuestion = 0;
  score = 0;

  document.querySelector(".welcome").hidden = true;
  document.getElementById("results").hidden = true;
  document.getElementById("game").hidden = false;

  showQuestion();
}

function showQuestion() {
  clearInterval(timer);

  if (currentQuestion >= questions.length) {
    finishGame();
    return;
  }

  timeLeft = 25;

  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of 7`;

  document.getElementById("timer").textContent = timeLeft;
  document.getElementById("question").textContent =
    questions[currentQuestion].question;

  document.getElementById("progress").hidden = false;
  document.getElementById("timer").hidden = false;
  document.getElementById("question").hidden = false;

  document.getElementById("diveScene").hidden = true;

  answerInput.value = "";
  answerInput.disabled = false;
  answerInput.hidden = false;

  submitButton.disabled = false;
  submitButton.hidden = false;

  document.getElementById("feedback").textContent = "";

  answerInput.focus();

  timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) submitAnswer();
  }, 1000);
}

function submitAnswer() {
  if (submitButton.disabled) return;

  clearInterval(timer);

  const answer = answerInput.value.trim().toLowerCase();
  const accepted = questions[currentQuestion].answers;
  const correct = accepted.includes(answer);

  if (correct) score += 50;

  document.getElementById("feedback").textContent =
    correct ? "Correct! +50 points" : "Not quite!";

  answerInput.disabled = true;
  submitButton.disabled = true;

  currentQuestion++;

  setTimeout(showQuestion, 1500);
}

function finishGame() {
  clearInterval(timer);

  document.getElementById("game").hidden = true;
  document.getElementById("results").hidden = false;

  document.getElementById("score").textContent = score + " points";
  document.getElementById("summary").textContent =
    "Challenge complete! Thanks for playing Fishillion.";
}

