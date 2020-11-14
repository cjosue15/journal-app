import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/uiActions';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterWithEmailPassword } from '../../actions/authActions';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const {
        ui: { msgError },
    } = useSelector((state) => state);

    const [values, handleInputChange] = useForm({
        name: 'Josue Navarro',
        email: 'carlosjosuemn98@gmail.com',
        password1: '123456',
        password2: '123456',
    });

    const { name, email, password1, password2 } = values;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch(startRegisterWithEmailPassword(email, password1, name));
        }
    };

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('Name is required'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email is required'));
            return false;
        } else if (password1 !== password2 || password1.length < 5) {
            dispatch(setError('Password should be at least 6 characters and match each other'));
            return false;
        }

        dispatch(removeError());
        return true;
    };

    return (
        <>
            {msgError && <div className='auth__alert-error'>{msgError}</div>}

            <h3 className='auth__title'>Register</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    className='auth__input'
                    placeholder='Name'
                    name='name'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />
                <input
                    type='email'
                    className='auth__input'
                    placeholder='email@example.com'
                    name='email'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type='password'
                    className='auth__input'
                    placeholder='Password'
                    name='password1'
                    value={password1}
                    onChange={handleInputChange}
                />
                <input
                    type='password'
                    className='auth__input'
                    placeholder='Confirm Password'
                    name='password2'
                    value={password2}
                    onChange={handleInputChange}
                />
                <button type='submit' className='btn btn-primary btn-block mb-5'>
                    Login
                </button>
                <Link className='link' to='/auth/login'>
                    Already registered?
                </Link>
            </form>
        </>
    );
};
