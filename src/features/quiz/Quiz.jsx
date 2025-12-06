import { useEffect, useState } from 'react';
import clsx from 'clsx';
// import styles from '../mystyles.module.css';
import styles from './quiz.module.css';

// const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = "http://localhost:3000/";
const endpoint = `${apiUrl}quiz`;




function processServerResponse(res) {
    if (!res.ok) {
        if (res.status === 404) {
            console.warn('Resource not found!');
        }

        if (res.status === 401) {
            console.warn('Please log in');
        }

        throw new Error('HTTP request error!');
    }
    return res.json();
}




// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};


export function Quiz() {

    const [todos, setTodos] = useState(null);
    const [quizResults, setQuizResults] = useState(null);

    // READ/RETRIEVE
    useEffect(() => {
        fetch(endpoint)
            .then(processServerResponse)
            .then((data) => setTodos(data))
            .catch(console.warn);
    }, []);


    // CREATE
    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const mainQuestion = formData.get('myQuestion');
        const correctAnswer = formData.get('correctAnswer');
        const firstAnswer = formData.get('firstAnswer');//"Paris";
        const secondAnswer = formData.get('secondAnswer');//"Rome";
        const thirdAnswer = formData.get('thirdAnswer');//"Madrid";



        try {
            const newTodo = await fetch(endpoint, { // + 's'
                method: 'POST',
                body: JSON.stringify({
                    myQuestion: mainQuestion,
                    correctAnswer: correctAnswer,
                    firstAnswer: firstAnswer,
                    secondAnswer: secondAnswer,
                    thirdAnswer: thirdAnswer
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(processServerResponse);

            const newTodoList = [...todos, newTodo];
            setTodos(newTodoList);
            form.reset();
        } catch (e) {
            console.warn(e);
        }
    }
    async function handleQuizSubmit(e) {
        e.preventDefault();

        let score = 0;
        const form = e.target;
        const formData = new FormData(form);
        const results = [];
        let isCorrect = false;


        todos.forEach((todo) => {
            const selectedAnswer = formData.get(`q${todo.id}`);
            if (selectedAnswer === todo.correctAnswer) {
                score++;
                isCorrect = true;
            } else {
                isCorrect = false;
            }
            results.push({
                question: todo.myQuestion,
                selectedAnswer: selectedAnswer,
                correctAnswer: todo.correctAnswer,
                isCorrect: isCorrect
            });
        });

        setQuizResults({
            score: score,
            total: todos.length,
            answers: results
        });


        alert(`Quiz submitted! Your score: ${score} out of ${todos.length}`);
    }
    // DELETE
    async function handleDeleteTodo(todo) {
        // console.log(e.target.dataset.todoId);
        // console.log(todo.id);

        await fetch(`${endpoint}/${todo.id}`, { method: 'DELETE' });

        const newTodoList = todos.filter((t) => t !== todo);
        setTodos(newTodoList);
    }

    // UPDATE
    async function handleCompleteTodo(todo) {
        const updatedTodo = await fetch(`${endpoint}/${todo.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: !todo.completed,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(processServerResponse);

        const indexOfOldTodo = todos.findIndex((t) => t === todo);
        const newTodoList = todos.toSpliced(indexOfOldTodo, 1, updatedTodo);

        setTodos(newTodoList);
    }
    //className={styles.quiz_container}
    //  className={styles.body}
    // className={styles.question}
    // className={styles.answers}
    return (
        <>
            <button onClick={() => window.location.href = "/"} >Home</button>
            <div className={styles.body}>
                {/* quiz creation page */}
                <h1>Create a quiz</h1>
                <div className={styles.generator}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.form_group}>
                            <label htmlFor="myQuestion">Create a quiz question</label>{' '}
                            <input type="text" id="myQuestion" name="myQuestion" />
                        </div>
                        <div className={styles.form_group}>
                            <label htmlFor="correctAnswer">Create a quiz correct answer</label>{' '}
                            <input type="text" id="correctAnswer" name="correctAnswer" />
                        </div>
                        <div className={styles.form_group}>
                            <label htmlFor="firstAnswer">Create first wrong answer</label>{' '}
                            <input type="text" id="firstAnswer" name="firstAnswer" />
                        </div>
                        <div className={styles.form_group}>
                            <label htmlFor="secondAnswer">Create second wrong answer</label>{' '}
                            <input type="text" id="secondAnswer" name="secondAnswer" />
                        </div>
                        <div className={styles.form_group}>
                            <label htmlFor="thirdAnswer">Create third wrong answer</label>{' '}
                            <input type="text" id="thirdAnswer" name="thirdAnswer" />
                        </div>
                        <button type="submit">Add question</button>
                    </form>
                </div>

                {/* asta e conditional rendering !!! */}
                {!todos && <strong>Loading ...</strong>}
                {todos && (
                    <form onSubmit={handleQuizSubmit}>
                        <div className={styles.quiz}>
                            <ol >
                                {todos.map((todo) => {
                                    // Shuffle answers for each question
                                    const answers = shuffleArray([
                                        todo.correctAnswer,
                                        todo.firstAnswer,
                                        todo.secondAnswer,
                                        todo.thirdAnswer
                                    ]);

                                    return (
                                        <li key={todo.id}>
                                            <div>
                                                <div className={styles.question}>{todo.myQuestion}</div>
                                                <div className={styles.answers}>
                                                    {answers.map((answer, index) => (
                                                        <label key={index}>
                                                            <input type="radio" name={`q${todo.id}`} value={answer} /> {answer}
                                                        </label>
                                                    ))}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteTodo(todo)}
                                                >
                                                    Delete Question
                                                </button>
                                            </div>
                                        </li>

                                    );
                                })}
                            </ol>
                        </div>
                        <button type="submit">Submit Quiz</button>
                    </form>
                )}
                {/* <div>this is your result</div> */}
                {/* asta e conditional rendering of quiz results!!! */}
                {quizResults && (
                    <div className={styles.results}>
                        <h2>Quiz Results</h2>
                        <div className={styles.score}>
                            <strong>Your Score: {quizResults.score} out of {quizResults.total}</strong>
                            <span> ({Math.round((quizResults.score / quizResults.total) * 100)}%)</span>
                        </div>

                        <div className={styles.answers_review}>
                            <h3>Answer Review:</h3>
                            <ol>
                                {quizResults.answers.map((result, index) => (
                                    <li key={index} className={result.isCorrect ? styles.correct : styles.incorrect}>
                                        <div className={styles.question}>{result.question}</div>
                                        <div>
                                            <strong>Your answer:</strong> {result.selectedAnswer || "Not answered"}
                                            {result.isCorrect ? " ✓" : " ✗"}
                                        </div>
                                        {!result.isCorrect && (
                                            <div>
                                                <strong>Correct answer:</strong> {result.correctAnswer}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <button type="button" onClick={() => setQuizResults(null)}>
                            Retake Quiz
                        </button>
                    </div>
                )}
            </div>
        </>
    );

}