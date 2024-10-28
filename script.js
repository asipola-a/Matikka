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
        let b = Math.floor(Math.random() * (number + 1));
        let correctAnswer;
        let questionText;

        if (type === 'plus') {
            correctAnswer = a + b;
            if (Math.random() > 0.5) {
                questionText = `${a} + ${b} = ?`;
            } else {
                questionText = `${a} + ? = ${correctAnswer}`;
                correctAnswer = b;
            }
        } else if (type === 'minus') {
            if (a < b) [a, b] = [b, a];
            correctAnswer = a - b;
            if (Math.random() > 0.5) {
                questionText = `${a} - ${b} = ?`;
            } else {
                questionText = `${a} - ? = ${correctAnswer}`;
                correctAnswer = b;
            }
        } else if (type === 'multiply') {
            correctAnswer = a * b;
            if (Math.random() > 0.5) {
                questionText = `${a} × ${b} = ?`;
            } else {
                questionText = `${a} × ? = ${correctAnswer}`;
                correctAnswer = b;
            }
        } else if (type === 'mixed') {
            let operation = Math.random() > 0.5 ? 'plus' : 'minus';
            if (operation === 'plus') {
                correctAnswer = a + b;
                if (Math.random() > 0.5) {
                    questionText = `${a} + ${b} = ?`;
                } else {
                    questionText = `${a} + ? = ${correctAnswer}`;
                    correctAnswer = b;
                }
            } else {
                if (a < b) [a, b] = [b, a];
                correctAnswer = a - b;
                if (Math.random() > 0.5) {
                    questionText = `${a} - ${b} = ?`;
                } else {
                    questionText = `${a} - ? = ${correctAnswer}`;
                    correctAnswer = b;
                }
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
        let randomAnswer = Math.floor(Math.random() * (maxNumber * 10 + 1));
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
        setTimeout(() => button.classList.remove('correct'), 1000);
    } else {
        button.classList.add('incorrect');
        setTimeout(() => button.classList.remove('incorrect'), 1000);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < maxQuestions) {
        setTimeout(showQuestion, 1000);
    } else {
        setTimeout(showResults, 1000);
    }
}

function showResults() {
    document.getElementById('quiz-page').style.display = 'none';
    const resultText = `Oikein meni ${score} / ${maxQuestions}. `;
    if (score >= 15) {
        document.getElementById('result-text').textContent = resultText + 'Hienosti laskettu!';
    } else if (score < 5) {
        document.getElementById('result-text').textContent = resultText + 'Nyt pitäisi kyllä harjoitella vielä lisää.';
    } else {
        document.getElementById('result-text').textContent = resultText + 'Hyvin tehty!';
    }
    document.getElementById('result-page').style.display = 'block';
}

function goBack() {
    document.getElementById('quiz-page').style.display = 'none';
    document.getElementById('result-page').style.display = 'none';
    document.getElementById('welcome-page').style.display = 'block';
}

function restartQuiz() {
    document.getElementById('result-page').style.display = 'none';
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('quiz-page').style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}
