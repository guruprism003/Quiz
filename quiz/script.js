const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const ansButtonElement = document.getElementById('ans-button');
const rightAnsElement = document.getElementById('right-ans');

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;
let answered = false; //Added this flag to prevent multiple clicks

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    quizScore = 0;
    answered = false; // Reset the flag when starting a new game
    rightAnsElement.innerText = 'Score: 0/' + questions.length;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        questionContainerElement.classList.add('hide');
        startButton.innerText = "Restart";
        startButton.classList.remove('hide');
        rightAnsElement.innerText = `Final Score: ${quizScore}/${questions.length}`;
    }
}

function showQuestion(question) {
    answered = false; //Reset flag when a new question is shown
    const questionText = document.createElement('h2');
    questionText.innerText = question.question;
    questionContainerElement.insertBefore(questionText, ansButtonElement);

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        ansButtonElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (ansButtonElement.firstChild) {
        ansButtonElement.removeChild(ansButtonElement.firstChild);
    }
    const existingQuestionText = questionContainerElement.querySelector('h2');
    if (existingQuestionText) {
        existingQuestionText.remove();
    }
}

function selectAnswer(e) {
    if (answered) return; //Prevents multiple clicks from increasing score
    answered = true; 

    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    setStatusClass(selectedButton, correct);
    if (correct) {
        quizScore++;
    }

    Array.from(ansButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true; //Disable all buttons after first click
    });

    rightAnsElement.innerText = `Score: ${quizScore}/${questions.length}`;
    nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is the purpose of the <div> element in HTML?',
        answers: [
            { text: 'To define a paragraph', correct: false },
            { text: 'To define a division or section', correct: true },
            { text: 'To define a heading', correct: false },
            { text: 'To define a link', correct: false },
        ]
    },
    {
        question: 'Which HTML element is used to define a table?',
        answers: [
            { text: '<table>', correct: true },
            { text: '<list>', correct: false },
            { text: '<div>', correct: false },
            { text: '<span>', correct: false },
        ]
    },
    {
        question: 'What is the difference between <b> and <strong> elements in HTML?',
        answers: [
            { text: '<b> is used for bold text, while <strong> is used for italic text', correct: false },
            { text: '<b> is used for bold text, while <strong> is used for emphasizing important text', correct: true },
            { text: '<b> is used for italic text, while <strong> is used for bold text', correct: false },
            { text: '<b> is used for emphasizing important text, while <strong> is used for bold text', correct: false },
        ]
    },
    {
        question: 'Which HTML element is used to define a hyperlink?',
        answers: [
            { text: '<a>', correct: true },
            { text: '<link>', correct: false },
            { text: '<href>', correct: false },
            { text: '<url>', correct: false },
        ]
    },
    {
        question: 'What is the purpose of the alt attribute in HTML?',
        answers: [
            { text: 'To specify the alternative text for an image', correct: true },
            { text: 'To specify the width of an image', correct: false },
            { text: 'To specify the height of an image', correct: false },
            { text: 'To specify the border of an image', correct: false },
        ]
    },
    {
        question: 'Which HTML element is used to define a list?',
        answers: [
            { text: '<ul>', correct: true },
            { text: '<ol>', correct: true },
            { text: '<li>', correct: false },
            { text: '<dl>', correct: false },
        ]
    },
    {
        question: 'What is the purpose of the title attribute in HTML?',
        answers: [
            { text: 'To specify the title of a page', correct: false },
            { text: 'To specify the title of an element', correct: true },
            { text: 'To specify the alternative text for an image', correct: false },
            { text: 'To specify the width of an image', correct: false },
        ]
    },
    {
        question: 'What is the purpose of the color property in CSS?',
        answers: [
            { text: 'To specify the background color of an element', correct: false },
            { text: 'To specify the text color of an element', correct: true },
            { text: 'To specify the border color of an element', correct: false },
            { text: 'To specify the width of an element', correct: false },
        ]
    },
    {
        question: 'Which CSS property is used to specify the font family of an element?',
        answers: [
            { text: 'font-size', correct: false },
            { text: 'font-style', correct: false },
            { text: 'font-family', correct: true },
            { text: 'font-weight', correct: false },
        ]
    },
    {
        question: 'What is the purpose of the margin property in CSS?',
        answers: [
            { text: 'To specify the padding of an element', correct: false },
            { text: 'To specify the border of an element', correct: false },
            { text: 'To specify the margin of an element', correct: true },
            { text: 'To specify the width of an element', correct: false },
        ]
    },
    {
        question: 'What is the purpose of the display property in CSS?',
        answers: [
            { text: 'To specify the visibility of an element', correct: false },
            { text: 'To specify the display type of an element', correct: true },
            { text: 'To specify the position of an element', correct: false },
            { text: 'To specify the size of an element', correct: false },
        ]
    },
    {
        question: 'What is the purpose of the position property in CSS?',
        answers: [
            { text: 'To specify the display type of an element', correct: false },
            { text: 'To specify the position of an element', correct: true },
            { text: 'To specify the size of an element', correct: false },
            { text: 'To specify the margin of an element', correct: false },
        ]
    },
    {
        question: 'What is the purpose of the console.log() function in JavaScript?',
        answers: [
            { text: 'To display an alert message', correct: false },
            { text: 'To display a confirmation message', correct: false },
            { text: 'To print output to the console', correct: true },
            { text: 'To prompt the user for input', correct: false },
        ]
    },
    {
        question: 'Which JavaScript data type is used to store a collection of key-value pairs?',
        answers: [
            { text: 'Array', correct: false },
            { text: 'Object', correct: true },
            { text: 'String', correct: false },
            { text: 'Number', correct: false },
        ]
    },
    {
        question: 'What is the purpose of the if statement in JavaScript?',
        answers: [
            { text: 'To repeat a block of code', correct: false },
            { text: 'To skip a block of code', correct: false },
            { text: 'To execute a block of code if a condition is true', correct: true },
            { text: 'To exit a program', correct: false },
        ]
    },
    {
        question: 'How do you declare a variable in JavaScript?',
        answers: [
            { text: 'var name = "John";', correct: true },
            { text: 'let name = "John";', correct: true },
            { text: 'const name = "John";', correct: true },
            { text: 'All of the above', correct: true },
        ]
    },
    {
        question: 'What is the purpose of the for loop in JavaScript?',
        answers: [
            { text: 'To repeat a block of code for a specified number of times', correct: true },
            { text: 'To skip a block of code', correct: false },
            { text: 'To execute a block of code if a condition is true', correct: false },
            { text: 'To exit a program', correct: false },
        ]
    },
    {
        question: 'How do you add an event listener to an HTML element in JavaScript?',
        answers: [
            { text: 'element.addEventListener("click", function(){ });', correct: true },
            { text: 'element.attachEvent("onclick", function(){ });', correct: true },
            { text: 'element.onclick = function(){ };', correct: true },
            { text: 'All of the above', correct: true },
        ]
    },
    {
        question: 'What is the purpose of the switch statement in JavaScript?',
        answers: [
            { text: 'To repeat a block of code for a specified number of times', correct: false },
            { text: 'To skip a block of code', correct: false },
            { text: 'To execute a block of code based on the value of a variable', correct: true },
            { text: 'To exit a program', correct: false },
        ]
    },
    {
        question: 'How do you create a new array in JavaScript?',
        answers: [
            { text: 'var arr = new Array();', correct: true },
            { text: 'var arr = [];', correct: true },
            { text: 'var arr = Array();', correct: true },
            { text: 'All of the above', correct: true },
        ]
    }    
];

