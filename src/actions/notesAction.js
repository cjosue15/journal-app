import { types } from '../types/types';
import { db } from '../firebase/firebaseConfig';
import { loadNotes } from '../helpers/loadNotes';

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const newnote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };

        const docRef = await db.collection(`${uid}/journal/notes`).add(newnote);
        dispatch(activeNote(docRef.id, newnote));
    };
};

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    };
};

export const activeNote = (id, note) => ({
    type: types.notesaActive,
    payload: {
        id,
        ...note,
    },
});

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes,
});
