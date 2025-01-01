const apiKey = "Xd82BfDEmNUYfsNYjjc5cTqxMoANEMdyI8r160k9";
const apiUrl = `https://quizapi.io/api/v1/questions?&apiKey=${apiKey}&%22limit=10%22`;
let questions;


async function fetchQuestions() {
    try {
        const response = await fetch(apiUrl);
        if(!response.ok) {
            throw new Error(`HTTP Request Error: ${response.status}`);
        }

        questions = await response.json();

    } catch(error) {
        console.log(error);
    }
}

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestions();
}

function showQuestions() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  showAnswers(currentQuestion);
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showAnswers(question) {
    Object.entries(question.answers).map(entry => {
        if(!entry[1])
            return;

        const button = document.createElement("button");
        button.innerHTML = entry[1];
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(question.correct_answers[entry[0]+"_correct"] === "true") {
            button.dataset.correct = question.correct_answers[entry[0]+"_correct"];
        }
        button.addEventListener("click", selectAnswer);
});
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startGame();
  }
});

let startGame = async () => {
    try {
      await fetchQuestions();
      startQuiz(); // Now call startQuiz after data is fetched
    } catch (error) {
      console.error(error);
    }
  }
startGame();