// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar =  document.getElementById("progress");

const quizQuestions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: " Hyper Trainer Marking Language", correct: false },
      { text: "High Text Machine Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyperlinking and Text Management Language", correct: false },
    ],
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "JQuery", correct: false },
      { text: "XML", correct: false },
      { text: "CSS", correct: true },
    ],
  },
  {
    question: "What is the output of console.log(typeof null); in JavaScript?",
    answers: [
      { text: "null", correct: false },
      { text: "object", correct: true },
      { text: "boolean", correct: false },
      { text: "undefined", correct: false },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "React Js", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "In databases, what does CRUD stand for?",
    answers: [
      { text: "Create, Read, Update, Delete", correct: true },
      { text: "Control, Run, Update, Deploy", correct: false },
      { text: "Copy, Restore, Undo, Download", correct: false },
      { text: "Create, Run, Upload, Debug", correct: false },
    ],
  },
  {
    question: "Which company developed the React library?",
    answers: [
      { text: "MicroSoft", correct: false },
      { text: "Facebook", correct: true },
      { text: "Amazon", correct: false },
      { text: "Google", correct: false },
    ],
  },
  {
    question: "Which HTTP status code means 'Not Found'?",
    answers: [
      { text: "404", correct: true },
      { text: "500", correct: false },
      { text: "301", correct: false },
      { text: "200", correct: false },
    ],
  },
  {
    question: "Which of the following is used to create dynamic web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: false },
      { text: "JavaScript", correct: true },
      { text: "SQL", correct: false },
    ],
  },
  {
    question: "Which of the following is a NoSQL database?",
    answers: [
      { text: "MySQL", correct: false },
      { text: "Oracle", correct: false },
      { text: "MongoDB", correct: true },
      { text: "PostgreSQL", correct: false },
    ],
  },
  {
    question: " What does API stand for?",
    answers: [
      { text: "Advanced Programming Interface", correct: false },
      { text: "Application Programming Interface", correct: true },
      { text: "Applied Programming Integration", correct: false },
      { text: "Automated Process Interface", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } 
  else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } 
  else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } 
  else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } 
  else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function fireConfetti() {
    confetti({
      particleCount: 550,
      spread: 400,
      origin: { y: 0.6 }
    });
  }

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}