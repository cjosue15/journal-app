import { types } from '../types/types';
import { db } from '../firebase/firebaseConfig';
import { loadNotes } from '../helpers/loadNotes';
import Swal from 'sweetalert2';
import { fileUpload } from '../helpers/fileUpload';

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const newnote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };

        try {
            const docRef = await db.collection(`${uid}/journal/notes`).add(newnote);
            dispatch(activeNote(docRef.id, newnote));
            Swal.fire('Added', 'Added new note successfully ', 'success');
            dispatch(addNewNote({ id: docRef.id, ...newnote }));
        } catch (error) {
            Swal.fire('Error', 'Ops! try again please.', 'error');
        }
    };
};

export const startNoteUpdate = (note) => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().auth;

            const noteToFirestore = { ...note, url: note.url || null };
            delete noteToFirestore.id;

            await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

            dispatch(refreshNote(note.id, note));
            Swal.fire('Saved', note.title, 'success');
        } catch (error) {
            Swal.fire('Error', 'Ops! try again please.', 'error');
        }
    };
};

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    };
};

export const addNewNote = (note) => ({
    type: types.notesaAddNew,
    payload: note,
});

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

export const refreshNote = (id, note) => ({
    type: types.notesUpdate,
    payload: { id, note },
});

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;
        // const { uid } = getState().auth;

        Swal.fire({
            title: 'Uploading',
            text: 'Please wait...',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            },
        });

        const url = await fileUpload(file);
        activeNote.url = url;

        dispatch(startNoteUpdate(activeNote));

        Swal.close();
    };
};

export const startDeletingNote = (id) => {
    return async (dispatch, getState) => {
        try {
            const { uid } = getState().auth;
            const { id: idActive } = getState().notes.active;
            await db.doc(`${uid}/journal/notes/${id}`).delete();

            if (id === idActive) {
                // same screen
                dispatch(deleteNote(id));
            } else {
                dispatch(deleteNoteFromSidebar(id));
            }

            Swal.fire('Deleted', 'Deleted successfully ', 'success');
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Ops! try again please.', 'error');
        }
    };
};

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: { id },
});

export const deleteNoteFromSidebar = (id) => ({
    type: types.notesDeleteFromSidebar,
    payload: { id },
});

export const logoutNote = () => ({
    type: types.notesLogoutCleaning,
});
