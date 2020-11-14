import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleAuth, startLoginEmailPassword } from '../../actions/authActions';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
    // // const history = useHistory();

    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.ui);

    const [values, handleInputChange] = useForm({ email: '', password: '' });

    const { email, password } = values;

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(startLoginEmailPassword(email, password));

        // history.replace('/');
    };

    const handleLoginGoogle = () => {
        dispatch(startGoogleAuth());
    };

    return (
        <>
            <h3 className='auth__title'>Login</h3>
            <form>
                <input
                    type='email'
                    className='auth__input'
                    placeholder='email@example.com'
                    name='email'
                    value={email}
                    autoComplete='off'
                    onChange={handleInputChange}
                />
                <input
                    type='password'
                    className='auth__input'
                    placeholder='******'
                    name='password'
                    value={password}
                    onChange={handleInputChange}
                />
                <button type='submit' className='btn btn-primary btn-block' disabled={loading} onClick={handleLogin}>
                    Login
                </button>
                <div className='auth__social-network'>
                    <p>Login with social networks</p>
                    <div className='google-btn' onClick={handleLoginGoogle}>
                        <div className='google-icon-wrapper'>
                            <img
                                className='google-icon'
                                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                                alt='google button'
                            />
                        </div>
                        <p className='btn-text'>Sign in with google</p>
                    </div>
                </div>
                <Link className='link' to='/auth/register'>
                    Create new Account
                </Link>
            </form>
        </>
    );
};
