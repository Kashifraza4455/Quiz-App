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
const submit = document.getElementById("submit");
const scoreDisplay = document.getElementById("score-display");

const timerDisplay = document.createElement("p");
timerDisplay.id = "timer";
timerDisplay.style.textAlign = "center";
timerDisplay.style.fontSize = "1.2rem";
quizContainer.insertBefore(timerDisplay, quizContainer.firstChild);

const correctPassword = "1234";

const quiz = [
    {
        question: "What is the most used programming language?",
        ans1text: "Java",
        ans2text: "C++",
        ans3text: "Python",
        ans4text: "JavaScript",
        answer: "JavaScript",
    },
    {
        question: "What is Js?",
        ans1text: "Language",
        ans2text: "Key",
        ans3text: "Extension",
        ans4text: "None of the above",
        answer: "Language",
    },
    {
        question: "What does HTML stand for?",
        ans1text: "Hypertext Markup Language",
        ans2text: "Cascading Style Sheet",
        ans3text: "Jason Object Notation",
        ans4text: "None of the above",
        answer: "Hypertext Markup Language",
    },
    {
        question: "What year was JavaScript launched?",
        ans1text: "1996",
        ans2text: "1995",
        ans3text: "1994",
        ans4text: "None of the above",
        answer: "1995",
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
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
    selectedAnswer = null;

    document.querySelectorAll("ul li").forEach(li => {
        li.classList.remove("correct", "incorrect");
        li.style.background = "#ffebee";  
        li.style.color = "black";
        li.style.borderColor = "transparent";
    });

    document.querySelectorAll("input[type='radio']").forEach(input => {
        input.checked = false;
        input.disabled = false;
    });

    submit.disabled = true;
    submit.style.background = "gray";

    question.textContent = quiz[currentQuestion].question;
    option_a.textContent = quiz[currentQuestion].ans1text;
    option_b.textContent = quiz[currentQuestion].ans2text;
    option_c.textContent = quiz[currentQuestion].ans3text;
    option_d.textContent = quiz[currentQuestion].ans4text;
}

document.querySelectorAll("ul li").forEach(li => {
    li.addEventListener("click", () => {
        if (selectedAnswer) return;

        let radio = li.querySelector("input[type='radio']");
        radio.checked = true;
        selectedAnswer = radio;

        document.querySelectorAll("input[type='radio']").forEach(input => {
            input.disabled = true;
        });

        let selectedLabel = radio.nextElementSibling;
        let correctAnswerText = quiz[currentQuestion].answer;
        let allLiElements = document.querySelectorAll("ul li");

        allLiElements.forEach(li => {
            let label = li.querySelector("label");
            if (label.textContent === correctAnswerText) {
                li.classList.add("correct");
                li.style.background = "green"; 
                li.style.color = "white";
            } else {
                li.classList.add("incorrect");
                li.style.background = "orange"; 
                li.style.color = "black";
            }
        });

        if (selectedLabel.textContent === correctAnswerText) {
            score++;
            scoreDisplay.textContent = `Score: ${(score * 10)}/40`;
        }

        submit.disabled = false;
        submit.style.background = "red";
    });
});

submit.addEventListener("click", () => {
    if (!selectedAnswer) {
        alert("Please select an answer before continuing!");
        return;
    }

    if (currentQuestion < quiz.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showScore();
    }

    submit.disabled = true;
    submit.style.background = "gray";
});

function showScore() {
    clearInterval(timer);
    quizContainer.style.display = "none"; 
    scoreBox.style.display = "block"; 

    let finalScore = (score * 10); 
    let resultMessage = finalScore > 20 ? "🎉 Pass! Congratulations!" : "❌ Fail! Try Again.";

    scoreText.innerHTML = `
        <h2>Your Score: ${finalScore}/40</h2>
        <h3 style="color: ${finalScore > 20 ? 'green' : 'red'};">${resultMessage}</h3>
        <p>✅ Correct Answers: ${score}</p>
        <p>❌ Incorrect Answers: ${quiz.length - score}</p>
    `;
}

restartQuizBtn.addEventListener("click", () => {
    score = 0;
    currentQuestion = 0;
    selectedAnswer = null;

    scoreText.innerHTML = "";
    scoreDisplay.textContent = `Score: 0/40`; 
    scoreBox.style.display = "none"; 
    quizContainer.style.display = "none";  
    startScreen.style.display = "block"; 

});
startQuizBtn.addEventListener("click", () => {
    let userPassword = prompt("Enter Password to Start Quiz:"); 

    if (userPassword === correctPassword) {
        startScreen.style.display = "none";
        quizContainer.style.display = "block";
        startTimer();
        loadQuestion();
    } else {
        alert("Incorrect Password! Try Again ❌."); 
    }
});
