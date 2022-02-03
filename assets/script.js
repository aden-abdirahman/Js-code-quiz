// variables
const introEl = document.querySelector("#intro");

// time and score
let timeEl = document.querySelector("p.time");
let secondsLeft = 75;
let scoreEl = document.querySelector("#score");

//question section
const questionsEl = document.querySelector("#questions");

let questionEl = document.querySelector("#question");

let questionCount = 0;

const yesNoEl = document.querySelector("#yesNo");

// section final
const finalEl = document.querySelector("#final");

// user initials
let initialsInput = document.querySelector("#initials");

// section highscores
const highscoresEl = document.querySelector("#highscores");


// ordered list
let scoreListEl = document.querySelector("#score-list");


// array of scores
let scoreList = [];

// buttons
// start
const startBtn = document.querySelector("#start");

const ansBtn = document.querySelectorAll("button.ansBtn");

const ans1Btn = document.querySelector("#answer1");



const ans2Btn = document.querySelector("#answer2");

const ans3Btn = document.querySelector("#answer3");

const ans4Btn = document.querySelector("#answer4");

const submitScrBtn = document.querySelector("#submit-score");

const clearScrBtn = document.querySelector("#clearscores");

const goBackBtn = document.querySelector("#goback");

const viewScrBtn = document.querySelector("#view-scores");

// Array of question objects
const questions = [ 
    {
       
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["commmas", "curly brackets", "quotes", "parentheses"],
        correctAnswer: "2"
    },
    {
       
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "3"
    },
    {
        
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["Javascript", "terminal", "for loops", "console.log"],
        correctAnswer: "3"
    },
    {
       
        question: "Commonly used data types do NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "2"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correctAnswer: "1"
       
    }
];


// Functions

// start quiz function
function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}


// timer
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}


// function to set question
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

// function to check answer 
function checkAnswer(event) {
    event.preventDefault();

    yesNoEl.style.display = "block";
    let p = document.createElement("p");
    yesNoEl.appendChild(p);

    // time out after 1 second
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // answer checker
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    // increment so the questions index is increased
    if (questionCount < questions.length) {
        questionCount++;
    }
    // setQuestion to bring in next question 
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });


    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // Add to local storage
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    // Get stored scores from localStorage
    // Parsing the JSON string to an object
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// clear scores
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

// EventListeners

startBtn.addEventListener("click", startQuiz);

// Check answers loop
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// Add score
submitScrBtn.addEventListener("click", addScore);

// Go Back Button
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 75;
    timeEl.textContent = `Time:${secondsLeft}s`;
});

// Clear the scores
clearScrBtn.addEventListener("click", clearScores);

// View/Hide High Scores Button
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});
