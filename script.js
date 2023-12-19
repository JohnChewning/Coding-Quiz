//Quiz questions

let questions = [

    {
        prompt: `What element is used to insert Javascript into HTML?`,
        options: [
            "<scripting>",
            "<javascript>",
            "<js>",
            "<script>",
        ],
        answer: "<script>",
    },

    {
        prompt: `How do you call a function named startGame?`,
        options: [
            "call startGame()",
            "startGame()",
            "call function startGame",
            "Call.startGame",
        ],
        answer: "startGame()",
    },

    {
        prompt: `How does a for loop start?`,

        options: [
            "for (i = 0; i <= 5)",
            "for i = 1 to 5",
            "for (i = 0; i <= 5; i++)",
            "for (i <= 5; i++)",
        ],
        answer: "for (i = 0; i <= 5; i++)",
    },

    {
        prompt: `What is the purpose of the querySelector method in JavaScript?`,

        options: [
            "To select and manipulate HTML elements",
            "To perform mathematical calculations",
            "To create a new JavaScript object",
            "To define a new JavaScript function",
        ],
        answer: "To select and manipulate HTML elements",
    },

    {
        prompt: `How do you write 'Hello World' in an alert box?`,
        
        options: [
            "msgBox('Hello World');",
            "msg('Hello World');",
            "alert('Hello World');",
            "alertBox('Hello World');",
        ],
        answer: "alert('Hello World');",
    },
];

// Get Dom Elements 

let questionsEl =
    document.querySelector("#questions");
let timerEl =
    document.querySelector("#timer");
let choicesEl =
    document.querySelector("#options");
let submitBtn =
    document.querySelector("#submit-score");
let startBtn =
    document.querySelector("#start");
let nameEl =
    document.querySelector("#name");
let responseEl =
    document.querySelector("#response");
let reStartBtn =
    document.querySelector("#restart");

// Before you start the quiz

let currentQuestionIndex = 0;
let time = 100;
let timerId;

// This function starts the Quiz and hides the homepage

function quizStart() {
    timerId = setInterval(countdown, 1000);
    timerEl.textContent = time;
    let landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// This funstions pulls questions and shows answers as buttons

function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let promptEl = document.getElementById("question-words");
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(
        function (choice, i) {
            let choiceBtn = document.createElement("button");
            choiceBtn.setAttribute("value", choice);
            choiceBtn.textContent = i + 1 + ". " + choice;
            choiceBtn.onclick = questionClick;
            choicesEl.appendChild(choiceBtn);
        }
    );
}

// This function check for the right answers and gives a response if its right or wrong

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        responseEl.textContent = `Wrong! The correct answer was 
		${questions[currentQuestionIndex].answer}.`;
        responseEl.style.color = "red";
    }

    else {
        responseEl.textContent =
            "Correct!";
        responseEl.style.color =
            "green";
    }
    responseEl.setAttribute("class", "response");
    setTimeout(function () {
        responseEl.setAttribute("class", "response hide");
    },
        2000);

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        quizEnd();
    }

    else {
        getQuestion();
    }
}

// End quiz. Hides the questions and shows the final score 

function quizEnd() {
    clearInterval(timerId);
    let endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    let finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

// End quiz if timer reaches 0 

function countdown() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

// Save score in local storage 

function saveHighscore() {
    let name = nameEl.value.trim();
    if (name !== "") {
        let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        let newScore = {
            score: time,
            name: name,
        };
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        alert("Check the High Scores page for your score");
    }
}

// Save user score after pressing Enter 

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
        alert("Check the High Scores page for your score");
    }
}
nameEl.onkeyup = checkForEnter;

// Save score when you click Submit 

submitBtn.onclick = saveHighscore;

// Start quiz on button click

startBtn.onclick = quizStart;
