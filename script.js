const maxQuestions = 20;
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let quizType = '';
let maxNumber = 0;

function startQuiz(type, number) {
    quizType = type;
    maxNumber = number;
    questions = generateQuestions(type, number);
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    document.getElementById('result-page').style.display = 'none';
    showQuestion();
}

function generateQuestions(type, number) {
    let questions = [];
    for (let i = 0; i < maxQuestions; i++) {
        let a = type === 'multiply' ? number : Math.floor(Math.random() * (number + 1));
        let b = Math.floor(Math.random() * (type === 'multiply' ? 10 : number + 1));  // Kertolaskuissa 0–10
        let correctAnswer;
        let questionText;

        if (type === 'plus') {
            correctAnswer = a + b;
            questionText = `${a} + ${b} = ?`;
        } else if (type === 'minus') {
            if (a < b) [a, b] = [b, a];
            correctAnswer = a - b;
            questionText = `${a} - ${b} = ?`;
        } else if (type === 'multiply') {
            correctAnswer = a * b;
            questionText = `${a} × ${b} = ?`;
        } else if (type === 'mixed') {
            const operation = Math.random() > 0.5 ? 'plus' : 'minus';
            if (operation === 'plus') {
                correctAnswer = a + b;
                questionText = `${a} + ${b} = ?`;
            } else {
                if (a < b) [a, b] = [b, a];
                correctAnswer = a - b;
                questionText = `${a} - ${b} = ?`;
            }
        }

        questions.push({
            question: questionText,
            answer: correctAnswer,
            isComplete: !questionText.includes('?')
        });
    }
    return questions;
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-container').textContent = question.question;
    document.getElementById('answer-buttons').innerHTML = '';
    const answers = [question.answer];

    while (answers.length < 4) {
        let randomAnswer = Math.floor(Math.random() * (maxNumber + 1));
        if (!answers.includes(randomAnswer)) {
            answers.push(randomAnswer);
        }
    }

    answers.sort(() => Math.random() - 0.5);
    answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(button, answer));
        document.getElementById('answer-buttons').appendChild(button);
    });
}
