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
        const correctAnswer = formData.get('correctanswer');
        const firstAnswer = formData.get('firstAnswer');//"Paris";
        const secondAnswer = formData.get('secondAnswer');//"Rome";
        const thirdAnswer = formData.get('thirdAnswer');//"Madrid";
       

        try {
            const newTodo = await fetch(endpoint, { // + 's'
                method: 'POST',
                body: JSON.stringify({
                    myQuestion: mainQuestion,
                    correctanswer: correctAnswer,
                    firstAnswer: firstAnswer,
                    secondAnswer: secondAnswer,
                    thirdAnswer: thirdAnswer,
                    completed: false,
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


                    {!todos && <strong>Loading ...</strong>}
                    {todos && (
                        <div className={styles.quiz}>

                            {todos.map((todo) => (
                                <ol>
                                    <li key={todo.id}>


                                        <div>
                                            <div className={styles.question} >{todo.myQuestion}</div>
                                            <div className={styles.answers}>
                                                <label><input type="radio" name="q1" /> {todo.correctAnswer}</label>
                                                <label><input type="radio" name="q1" /> {todo.secondAnswer}</label>
                                                <label><input type="radio" name="q1" /> {todo.thirdAnswer}</label>
                                                <label><input type="radio" name="q1" /> {todo.firstAnswer}</label>
                                            </div>
                                        </div>



                                    </li>
                                </ol>

                            ))}

                        </div>
                    )}
                    <button>Submit Quiz</button>
                
            </div>
        </>
    );

}