//https://react.dev/learn/updating-objects-in-state

import { useState } from 'react';
import clsx from 'clsx';

import styles from './stylesimpleform.module.css';

export function SimpleForm() {
    const [person, setPerson] = useState({
        firstName: 'Barbara',
        lastName: 'Hepworth',
        email: 'bhepworth@sculpture.com',
        password: '',
        retypepassword: '',
        gender: 'female',
    });
    const [errorMessage, setErrorMessage] = useState(null);


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
    function handlePasswordChange(e) {
        setPerson({
            ...person,
            password: e.target.value
        });
    }

    function handleRetypePasswordChange(e) {
        setPerson({
            ...person,
            retypepassword: e.target.value
        });
    }
    function handleGenderChange(e) {
        setPerson({
            ...person,
            gender: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const submit_firstname = formData.get('firstName');
        const submit_lastname = formData.get('lastName');
        const submit_email = formData.get('email');
        const submit_password = formData.get('password');
        const submit_retypepassword = formData.get('retypepassword');
        const submit_gender = formData.get('gender');

        // console.log('Submitted password:', submit_password);
        // console.log('Submitted retype password:', submit_retypepassword);
        // console.log('Submitted gender:', submit_gender);
        // console.log('Submitted first name:', submit_firstname);
        // console.log('Submitted last name:', submit_lastname);
        // console.log('Submitted email:', submit_email);

        if (submit_firstname.length < 2) {
            // alert('First name must be at least 2 characters long!');  
            const newErrorMessage = 'First name must be at least 2 characters long!';
            setErrorMessage(newErrorMessage);
            return;
        }
        if (submit_lastname.length < 2) {
            // alert('Last name must be at least 2 characters long!');
            const newErrorMessage = 'Last name must be at least 2 characters long!';
            setErrorMessage(newErrorMessage);
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(submit_email)) {
            const newErrorMessage = 'Please enter a valid email address!';
            setErrorMessage(newErrorMessage);
            // alert('Please enter a valid email address!');
            return;
        }
        if (submit_password.length < 4) {
            // alert('Passwords do not match!');
            const newErrorMessage = 'Passwords too short!';
            setErrorMessage(newErrorMessage);
            return;
        }

        if (submit_password !== submit_retypepassword) {
            // alert('Passwords do not match!');
            const newErrorMessage = 'Passwords do not match!';
            setErrorMessage(newErrorMessage);
            return;
        }


        const newErrorMessage = 'Form submitted successfully!';
        setErrorMessage(newErrorMessage);
        // alert('Form submitted successfully!')


        form.reset();



    }


    // style={{ border: '4px solid #bc2121', fontWeight: 'bold' }}

    return (
        <>
            <button onClick={() => window.location.href = "/"} >Home</button>
            <div className={styles.bodySimpleform}>
                <div className={styles.containerSimpleform}>
                    <form className={styles.displayDataSimpleform} onSubmit={handleSubmit}>

                        <label className={clsx({
                            [styles.errorLabel]: errorMessage && errorMessage.includes('First name')
                        })}
                        >
                            First name:{' '}
                            
                            <input 
                                type="text"
                                name="firstName"
                                value={person.firstName}
                                onChange={handleFirstNameChange}
                            />
                        </label>
                        <label className={clsx({
                            [styles.errorLabel]: errorMessage && errorMessage.includes('Last name')
                        })}
                        >
                            Last name:
                            <input
                                type="text"
                                name="lastName"
                                value={person.lastName}
                                onChange={handleLastNameChange}
                            />
                        </label>

                        <label htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" value={person.gender} onChange={handleGenderChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="none">Prefer not to say</option>
                        </select>

                        <label className={clsx({
                            [styles.errorLabel]: errorMessage && errorMessage.includes('email')
                        })}
                        >
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={person.email}
                                onChange={handleEmailChange}
                            />
                        </label>
                        <label className={clsx({
                            [styles.errorLabel]: errorMessage && errorMessage.includes('Passwords too short')
                        })}
                        >
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={person.password}
                                onChange={handlePasswordChange}
                            />
                        </label>
                        <label className={clsx({
                            [styles.errorLabel]: errorMessage && errorMessage.includes('do not match')
                        })}
                        >
                            Retype Password:
                            <input
                                type="password"
                                name="retypepassword"
                                value={person.retypepassword}
                                onChange={handleRetypePasswordChange}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                    <div className={styles.displayDataSimpleform}>
                        <p>
                            {person.firstName}{', '}
                            {person.lastName}{', '}
                            {person.gender}{', '}
                            {person.email}{' '}

                        </p>
                    </div>
                    <div className={styles.displayError}>
                        <p>
                            {errorMessage}
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
}
