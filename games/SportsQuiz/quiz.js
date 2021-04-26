// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What is the national sport of the USA?",
        choiceA : "Baseball",
		choiceB : "Football",
		choiceC : "Soccer", 
		correct : "A"
    },{
        question : "The Olympics are held every how many years?",
        choiceA : "2",
		choiceB : "6",
		choiceC : "4",
		correct : "C"
    },{
        question : "Which male tennis player has won the most Grand Slam titles?",
        choiceA : "Rafael Nadal",
		choiceB : "Roger Federer",
		choiceC : "Novak Djokovic",
		correct : "B"
    },{
		question : "What color are goalposts in football?",
		choiceA : "Yellow",
		choiceB : "Red",
		choiceC : "White",
		correct : "A"
	},{
		question : "Which sport uses a net, a racquet, and a shuttlecock?",
		choiceA : "Tennis",
		choiceB : "Badminton",
		choiceC : "Lacrosse",
		correct : "B"
	},{
		question : "What type of race is the Tour de France?",
		choiceA : "Golf",
		choiceB : "Cross country",
		choiceC : "Bicycle",
		correct : "C"
	},{
		question : "In football, how many points does a touchdown hold?",
		choiceA : "6",
		choiceB : "10",
		choiceC : "5",
		correct : "A"
	},{
		question : "Which of the following is not an Olympic sport?",
		choiceA : "Swimming",
		choiceB : "Cricket",
		choiceC : "Gymnastics",
		correct : "B"
	},{
		question : "How many holes are played in an average round of golf?",
		choiceA : "25",
		choiceB : "10",
		choiceC : "18",
		correct : "C"
	},{
		question : "What is the only sport to be played on the moon?",
		choiceA : "Tennis",
		choiceB : "Golf",
		choiceC : "Basketball",
		correct : "B"
	}
];

// create some variables

const lastQuestion = questions.length-1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function displayQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    displayQuestion();
    quiz.style.display = "block";
    displayProgress();
    //TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// display progress
function displayProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// display counter

function displayCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            displayQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            displayScore();
        }
    }
}

// check answer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score = score+10;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        displayQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        displayScore();
    }
}

// answer is correct
// change progress color to green
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is wrong
// change progress color to red
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// display score
function displayScore(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const finalScore = score;
   
    scoreDiv.innerHTML += "<p>You scored "+ finalScore +" points</p>";
    // added sql for score
    var form = document.getElementById("score");
    form.value = finalScore;
}
