//https://react.dev/learn/updating-objects-in-state

import { useState } from 'react';

import styles from './stylesimpleform.module.css';

export function SimpleForm() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }
    function handleSubmit(e) {
      e.preventDefault();
    }

  async function handleSubmitttt(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const todoTitle = formData.get('title');

    try {
      const newTodo = await fetch(endpoint + 's', {
        method: 'POST',
        body: JSON.stringify({
          title: todoTitle,
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




  return (
    <>
    <div className={styles.body}>
        <form className={styles.container} onSubmit={handleSubmit}>
      
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      </form>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
      </div>
    </>
  );
}
