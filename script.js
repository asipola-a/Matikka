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
    showPage('quiz-page');
    showQuestion();
}

function showPage(pageId) {
    // Piilottaa kaikki sivut
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'none';
    // Näyttää vain valitun sivun
    document.getElementById(pageId).style.display = 'block';
}

function generateQuestions(type, number) {
    let questions = [];
    for (let i = 0; i < maxQuestions; i++) {
        let a = type === 'multiply' ? number : Math.floor(Math.random() * (number + 1));
        let b = Math.floor(Math.random() * (number + 1));
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
            answer: correctAnswer
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
        let randomAnswer = Math.floor(Math.random() * (maxNumber * 2 + 1));
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

function selectAnswer(button, selectedAnswer) {
    const question = questions[currentQuestionIndex];
    if (selectedAnswer === question.answer) {
        score++;
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
    }
    setTimeout(() => {
        button.classList.remove('correct', 'incorrect');
        currentQuestionIndex++;
        if (currentQuestionIndex < maxQuestions) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    const resultText = `Oikein meni ${score} / ${maxQuestions}. `;
    document.getElementById('result-text').textContent = resultText + (score >= 15 ? 'Hienosti laskettu!' : score < 5 ? 'Nyt pitäisi kyllä harjoitella vielä lisää.' : 'Hyvin tehty!');
    showPage('result-page');
}

function goBack() {
    // Palautetaan peli alkuun
    currentQuestionIndex = 0;
    score = 0;
    showPage('welcome-page');
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    showPage('quiz-page');
}
