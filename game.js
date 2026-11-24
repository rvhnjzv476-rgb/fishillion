
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

// Temporary rarity levels for the prototype.
// Later, Firebase will calculate rarity from all players' answers.

const rarityLevels = [
  {
    name: "COMMON",
    points: 20,
    depth: 35,
    description: "A familiar answer. Keep diving!"
  },
  {
    name: "UNCOMMON",
    points: 40,
    depth: 95,
    description: "Not everyone thought of that!"
  },
  {
    name: "RARE",
    points: 60,
    depth: 155,
    description: "You're getting deeper!"
  },
  {
    name: "EPIC",
    points: 80,
    depth: 225,
    description: "An impressive discovery!"
  },
  {
    name: "LEGENDARY",
    points: 100,
    depth: 295,
    description: "You reached the deepest level!"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 25;
let timer;
let nextQuestionTimer;
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
  document.getElementById("results").hidden = true;
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

  clearTimeout(nextQuestionTimer);
  clearInterval(timer);

  timeLeft = 25;

  document.getElementById("diveScene").hidden = true;
  document.getElementById("progress").hidden = false;
  document.getElementById("timer").hidden = false;
  document.getElementById("question").hidden = false;

  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of 7`;

  document.getElementById("question").textContent =
    questions[currentQuestion].question;

  document.getElementById("timer").textContent = timeLeft;

  answerInput.value = "";
  answerInput.disabled = false;
  submitButton.disabled = false;
  answerInput.hidden = false;
  submitButton.hidden = false;

  document.getElementById("feedback").textContent = "";

  const diver = document.getElementById("diver");
  diver.style.transition = "none";
  diver.style.top = "10px";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      diver.style.transition =
        "top 2.2s cubic-bezier(.2,.7,.3,1)";
    });
  });

  answerInput.focus();

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

  const answer = answerInput.value
    .trim()
    .toLowerCase();

  const accepted = questions[currentQuestion].answers;

  const answerIndex = accepted.indexOf(answer);
  const correct = answerIndex !== -1;

  let rarity = null;

  if (correct) {
    const rarityPosition = Math.round(
      (answerIndex / Math.max(accepted.length - 1, 1)) * 4
    );

    rarity = rarityLevels[rarityPosition];
    score += rarity.points;
  }

  playerAnswers.push({
    answer: answer || "No answer",
    correct,
    rarity: rarity ? rarity.name : "Incorrect",
    points: rarity ? rarity.points : 0
  });

  answerInput.disabled = true;
  submitButton.disabled = true;
  answerInput.hidden = true;
  submitButton.hidden = true;

  document.getElementById("progress").hidden = true;
  document.getElementById("timer").hidden = true;
  document.getElementById("question").hidden = true;

  const scene = document.getElementById("diveScene");
  const diver = document.getElementById("diver");

  scene.hidden = false;

  // Start the diver at the surface.
  diver.style.transition = "none";
  diver.style.top = "10px";

  if (correct) {
    document.getElementById("rarityName").textContent =
      rarity.name;

    document.getElementById("depthScore").textContent =
      rarity.points + " POINTS";

    document.getElementById("depthDescription").textContent =
      rarity.description;

    document.getElementById("feedback").textContent =
      "Correct answer! Watch your dive!";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        diver.style.transition =
          "top 2.2s cubic-bezier(.2,.7,.3,1)";

        diver.style.top = rarity.depth + "px";
      });
    });
  } else {
    document.getElementById("rarityName").textContent =
      "NO RARITY";

    document.getElementById("depthScore").textContent =
      "0 POINTS";

    document.getElementById("depthDescription").textContent =
      "No discovery this time. Keep fishing!";

    document.getElementById("feedback").textContent =
      "Not quite!";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        diver.style.transition = "top 1s ease";
        diver.style.top = "15px";
      });
    });
  }

  nextQuestionTimer = setTimeout(function() {
    currentQuestion++;
    showQuestion();
  }, 3200);
}

function finishGame() {
  clearInterval(timer);
  clearTimeout(nextQuestionTimer);

  document.getElementById("game").hidden = true;
  document.getElementById("results").hidden = false;

  document.getElementById("score").textContent =
    score + " points";

  document.getElementById("summary").textContent =
    `You got ${playerAnswers.filter(a => a.correct).length} out of 7 questions correct!`;
}
