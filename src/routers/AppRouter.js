import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notesAction';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName, user.photoURL));

                dispatch(startLoadingNotes(user.uid));
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);

    if (checking) {
        return <h1>Espere</h1>;
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path='/auth' isLogged={isLoggedIn} component={AuthRouter} />
                    {/* <Route path='/auth' component={AuthRouter} /> */}
                    <PrivateRoute exact path='/' isLogged={isLoggedIn} component={JournalScreen} />
                    {/* <Route exact path='/' component={JournalScreen} /> */}
                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </Router>
    );
};
