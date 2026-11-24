
const questions = [
  {
    question: "Name a species of freshwater fish.",
    answers: [
      "largemouth bass",
      "smallmouth bass",
      "northern pike",
      "muskie",
      "walleye",
      "yellow perch",
      "bowfin",
      "chain pickerel",
      "lake trout",
      "alligator gar"
    ]
  },
  {
    question: "Name a brand of fishing reel.",
    answers: [
      "shimano",
      "daiwa",
      "abu garcia",
      "penn",
      "lew's",
      "13 fishing"
    ]
  },
  {
    question: "Name a musky fishing lure.",
    answers: [
      "mepps musky killer",
      "suick",
      "bulldawg",
      "medussa",
      "shallow invader",
      "cowgirl"
    ]
  },
  {
    question: "Name a type of fishing line.",
    answers: [
      "monofilament",
      "fluorocarbon",
      "braid",
      "copolymer"
    ]
  },
  {
    question: "Name a saltwater fish.",
    answers: [
      "tuna",
      "marlin",
      "swordfish",
      "tarpon",
      "barracuda",
      "snook"
    ]
  },
  {
    question: "Name a fishing technique.",
    answers: [
      "jigging",
      "trolling",
      "fly fishing",
      "drop shot",
      "crankbait fishing",
      "jerkbait fishing"
    ]
  },
  {
    question: "Name a fishing rod brand.",
    answers: [
      "shimano",
      "st croix",
      "daiwa",
      "abu garcia",
      "fenwick",
      "g loomis"
    ]
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 25;
let timer;
let playerAnswers = [];

const playButton = document.getElementById("playButton");
const submitButton = document.getElementById("submitButton");
const answerInput = document.getElementById("answer");

playButton.addEventListener("click", startGame);
submitButton.addEventListener("click", submitAnswer);

answerInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    submitAnswer();
  }
});

function startGame() {
  document.querySelector(".welcome").hidden = true;
  document.getElementById("game").hidden = false;
  currentQuestion = 0;
  score = 0;
  playerAnswers = [];
  showQuestion();
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    finishGame();
    return;
  }

  timeLeft = 25;

  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of 7`;

  document.getElementById("question").textContent =
    questions[currentQuestion].question;

  document.getElementById("timer").textContent = timeLeft;

  answerInput.value = "";
  answerInput.disabled = false;
  submitButton.disabled = false;
  answerInput.focus();

  clearInterval(timer);

  timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      submitAnswer();
    }
  }, 1000);
}

function submitAnswer() {
  if (submitButton.disabled) return;

  clearInterval(timer);

  const answer = answerInput.value.trim().toLowerCase();
  const accepted = questions[currentQuestion].answers;

  const correct = accepted.includes(answer);

  let points = 0;

  if (correct) {
    const answerIndex = accepted.indexOf(answer);
    points = Math.max(10, 100 - answerIndex * 10);
    score += points;
  }

  playerAnswers.push({
    answer: answer || "No answer",
    correct,
    points
  });

  answerInput.disabled = true;
  submitButton.disabled = true;

  document.getElementById("feedback").textContent =
    correct ? `Correct! +${points} points` : "Incorrect or unanswered!";

  setTimeout(function() {
    currentQuestion++;
    document.getElementById("feedback").textContent = "";
    showQuestion();
  }, 1200);
}

function finishGame() {
  document.getElementById("game").hidden = true;
  document.getElementById("results").hidden = false;

  document.getElementById("score").textContent =
    score + " points";

  document.getElementById("summary").textContent =
    `You got ${playerAnswers.filter(a => a.correct).length} out of 7 questions correct!`;
}

