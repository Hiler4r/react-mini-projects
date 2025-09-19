"use client";
import { useState } from "react";


export default function QuizApp() {
    const [started, setStarted] = useState(false);
    // Full pool of questions (20+)
    const questionPool = [
        { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
        { question: "Which language runs in a web browser?", options: ["Python", "C++", "JavaScript", "Java"], answer: "JavaScript" },
        { question: "Who developed React?", options: ["Google", "Facebook", "Microsoft", "Twitter"], answer: "Facebook" },
        { question: "What is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "Jupiter" },
        { question: "What is the boiling point of water?", options: ["100°C", "0°C", "50°C", "200°C"], answer: "100°C" },
        { question: "Which element has the chemical symbol 'O'?", options: ["Gold", "Oxygen", "Silver", "Iron"], answer: "Oxygen" },
        { question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Dickens", "Austen", "Hemingway"], answer: "Shakespeare" },
        { question: "What is the smallest prime number?", options: ["1", "2", "3", "5"], answer: "2" },
        { question: "Which continent is Egypt in?", options: ["Asia", "Africa", "Europe", "Australia"], answer: "Africa" },
        { question: "What is the chemical formula for water?", options: ["CO2", "H2O", "O2", "NaCl"], answer: "H2O" },
        { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"], answer: "Da Vinci" },
        { question: "What is the capital of Japan?", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"], answer: "Tokyo" },
        { question: "Which gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
        { question: "What is 9 x 9?", options: ["81", "72", "99", "18"], answer: "81" },
        { question: "Who is known as the father of computers?", options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"], answer: "Charles Babbage" },
        { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific" },
        { question: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Silver"], answer: "Diamond" },
        { question: "Which country is famous for pizza?", options: ["France", "Italy", "Spain", "Greece"], answer: "Italy" },
        { question: "What is the main language in Brazil?", options: ["Spanish", "Portuguese", "French", "English"], answer: "Portuguese" },
        { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
        { question: "What is the tallest animal?", options: ["Elephant", "Giraffe", "Lion", "Horse"], answer: "Giraffe" },
        { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Mercury"], answer: "Mars" },
        { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: "8" },
        { question: "Who discovered gravity?", options: ["Newton", "Einstein", "Galileo", "Tesla"], answer: "Newton" },
        { question: "Which animal is known as man's best friend?", options: ["Cat", "Dog", "Horse", "Parrot"], answer: "Dog" },
    ];

    // Shuffle and select 20 questions
    function getRandomQuestions(pool, count) {
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    const [questions, setQuestions] = useState(() => getRandomQuestions(questionPool, 20));

    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const handleAnswer = (option) => {
        if (option === questions[current].answer) {
            setScore(score + 1);
        }
        const next = current + 1;
        if (next < questions.length) {
            setCurrent(next);
        } else {
            setFinished(true);
        }
    };

    const restartQuiz = () => {
        setQuestions(getRandomQuestions(questionPool, 20));
        setScore(0);
        setCurrent(0);
        setFinished(false);
    };

    return (
        <div className="quiz-container">
            <div className="quiz-card">
                {!started ? (
                    <div className="quiz-welcome">
                        <h1>Quiz</h1>
                        <p>Welcome, read the instructions carefully:</p>
                        <ol>
                            <li>This quiz has 20 questions</li>
                            <li>Click on an option to select your answer</li>
                        </ol>
                        <button className="quiz-btn" onClick={() => setStarted(true)}>
                            Start
                        </button>
                    </div>
                ) : !finished ? (
                    <>
                        <h2 className="quiz-question">
                            {questions[current].question}
                        </h2>
                        <div className="quiz-options">
                            {questions[current].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(option)}
                                    className="quiz-btn"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <p className="quiz-progress">
                            Question {current + 1} of {questions.length}
                        </p>
                    </>
                ) : (
                    <div className="quiz-finish">
                        <h2 className="quiz-score">
                            Your Score: {score} / {questions.length}
                        </h2>
                        <button
                            onClick={restartQuiz}
                            className="quiz-btn"
                        >
                            Retake Quiz
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}