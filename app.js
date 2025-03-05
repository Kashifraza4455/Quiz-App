const startScreen = document.getElementById("start-screen");
const startQuizBtn = document.getElementById("start-quiz");
const quizContainer = document.getElementById("quiz-container");
const scoreBox = document.getElementById("score-box");
const scoreText = document.getElementById("score-text");
const restartQuizBtn = document.getElementById("restart-quiz");

const question = document.getElementById("quiz-question");
const option_a = document.getElementById("text_option_a");
const option_b = document.getElementById("text_option_b");
const option_c = document.getElementById("text_option_c");
const option_d = document.getElementById("text_option_d");
const option_e = document.getElementById("text_option_e");
const submit = document.getElementById("submit");

const timerDisplay = document.createElement("p");
timerDisplay.id = "timer";
timerDisplay.style.textAlign = "center";
timerDisplay.style.fontSize = "1.2rem";
quizContainer.insertBefore(timerDisplay, quizContainer.firstChild);

const quiz = [
    {
        question: "What is the most used programming language",
        ans1text: "Java",
        ans2text: "C++",
        ans3text: "Python",
        ans4text: "JavaScript",
        answer: "JavaScript",
        ans5text : "1/4"
    },
    {
        question: "What is Js",
        ans1text: "Language",
        ans2text: "Key",
        ans3text: "Extension",
        ans4text: "None of the above",
        answer: "Language",
        ans5text : "2/4"
    },
    {
        question: "What does HTML stand for?",
        ans1text: "Hypertext Markup Language",
        ans2text: "Cascading Style Sheet",
        ans3text: "Jason Object Notation",
        ans4text: "None of the above",
        answer: "Hypertext Markup Language",
         ans5text : "3/4"
    },
    {
        question: "What year was JavaScript launched?",
        ans1text: "1996",
        ans2text: "1995",
        ans3text: "1994",
        ans4text: "None of the above",
        answer: "1995",
        ans5text : "4/4"
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
const totalTime = 60;
let timeLeft;

function startTimer() {
    timeLeft = totalTime;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            showScore();
        }
    }, 1000);
}

function loadQuestion() {
    question.textContent = quiz[currentQuestion].question;
    option_a.textContent = quiz[currentQuestion].ans1text;
    option_b.textContent = quiz[currentQuestion].ans2text;
    option_c.textContent = quiz[currentQuestion].ans3text;
    option_d.textContent = quiz[currentQuestion].ans4text;
    option_e.textContent = quiz[currentQuestion].ans5text;
}

startQuizBtn.addEventListener("click", () => {
    startScreen.style.display = "none"; 
    quizContainer.style.display = "block"; 
    startTimer();
    loadQuestion();
});


submit.addEventListener("click", () => {
    const checkedAns = document.querySelector('input[type="radio"]:checked');

    if (!checkedAns) {
        alert("Please select an answer");
    } else {
        let selectedLabel = checkedAns.nextElementSibling;
        let correctAnswerText = quiz[currentQuestion].answer;
        let allLiElements = document.querySelectorAll("ul li");

        // Reset all <li> elements before applying new styles
        allLiElements.forEach(li => {
            li.classList.remove("correct", "incorrect");
            li.style.background = ""; 
            li.style.color = "black";
        });

        if (selectedLabel.textContent === correctAnswerText) {
            // Set all <li> elements to orange first
            allLiElements.forEach(li => {
                li.style.background = "#ff9800"; 
                li.style.color = "white"; 
            });

            // Set the correct answer to green
            selectedLabel.parentElement.classList.add("correct");
            score++;
        } else {
            // If incorrect, turn all <li> elements orange
            allLiElements.forEach(li => {
                li.classList.add("incorrect");
                li.style.background = "#ff9800"; 
                li.style.color = "white";
            });

            // Highlight the correct answer in green
            document.querySelectorAll("li label").forEach(label => {
                if (label.textContent === correctAnswerText) {
                    label.parentElement.classList.add("correct");
                }
            });
        }

        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < quiz.length) {
                loadQuestion();
            } else {
                showScore();
            }
        }, 1000);
    }
});








function showScore() {
    quizContainer.style.display = "none";
    scoreBox.style.display = "block";

    let correctAnswers = score; 
    let incorrectAnswers = quiz.length - score; 

    scoreText.innerHTML = `
        <p>Your Score: ${score} / ${quiz.length}</p>
        <p>Correct Answers: ${correctAnswers}</p>
        <p>Incorrect Answers: ${incorrectAnswers}</p>
    `;
}


restartQuizBtn.addEventListener("click", () => {
    scoreText.innerHTML = `<p>Your Score: ${score} / ${quiz.length}</p>`;

});



