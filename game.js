const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Inside which element do we put the JavaScript?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<srab>",
    answer: 1
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "alert box('Hello World');",
    choice2: "alert('Hello World');",
    choice3: "alert(Hello World)",
    choice4: "alert('Hello world')",
    answer: 2
  },
  {
    question: "What is 2 + 2?",
    choice1: "1",
    choice2: "6",
    choice3: "4",
    choice4: "7",
    answer: 3
  }
];


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  
  
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign("end.html")
  }
  questionCounter++;
 progressText.innerText = "Question number " + questionCounter + "/" +MAX_QUESTIONS;
 
 progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
 
  const questionIndex = Math.floor(Math.random() * availableQuestions.length );
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  choices.forEach( choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });
  availableQuestions.splice(questionIndex,1);
  
  acceptingAnswers = true;
};

choices.forEach( choice => {
  choice.addEventListener('click', e => {
   if (!acceptingAnswers) return;
   
   acceptingAnswers = false;
   const selectedChoice = e.target;
   const selectedAnswer = selectedChoice.dataset['number'];
   
   /*const classToApply = 'incorrect';
   
   if (selectedAnswer == currentQuestion.answer) {
     classToApply = 'correct';
   };*/
   
   const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
   
   if (classToApply === 'correct') {
     incrementScore(CORRECT_BONUS);
   }
   
   selectedChoice.parentElement.classList.add(classToApply);
   
   setTimeout( () => {
     selectedChoice.parentElement.classList.remove(classToApply);
   getNewQuestion();
   }, 1000);
   
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score
};


startGame()
