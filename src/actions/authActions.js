import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { finishLoading, startLoading } from './uiActions';
import Swal from 'sweetalert2';

export const startLoginEmailPassword = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const {
                user: { uid, displayName, photoURL },
            } = await firebase.auth().signInWithEmailAndPassword(email, password);
            dispatch(login(uid, displayName, photoURL));
            dispatch(finishLoading());
        } catch (error) {
            dispatch(finishLoading());
            Swal.fire('Error', error.message, 'error');
        }
    };
};

export const startRegisterWithEmailPassword = (email, password, name) => {
    return async (dispatch) => {
        try {
            const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await user.updateProfile({ displayName: name });
            const { uid, displayName, photoURL } = user;
            dispatch(login(uid, displayName, photoURL));
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };
};

export const startGoogleAuth = () => {
    return (dispatch) => {
        firebase
            .auth()
            .signInWithPopup(googleAuthProvider)
            .then(({ user: { uid, displayName, photoURL } }) => dispatch(login(uid, displayName, photoURL)))
            .catch((e) => console.log(e));
        // dispatch();
    };
};

export const login = (uid, displayName, img) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        img,
    },
});

export const startLogout = () => {
    return async (dispatch) => {
        try {
            await firebase.auth().signOut();
            dispatch(logout());
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };
};

const logout = () => ({
    type: types.logout,
});
