import { types } from '../types/types';

const initialState = {
    notes: [],
    active: null,
};

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesaAddNew:
            return {
                ...state,
                notes: [action.payload, ...state.notes],
            };
        case types.notesaActive:
            return {
                ...state,
                active: {
                    ...action.payload,
                },
            };
        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload],
            };
        case types.notesUpdate:
            return {
                ...state,
                notes: state.notes.map((note) => (note.id === action.payload.id ? action.payload.note : note)),
            };
        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter((note) => note.id !== action.payload.id),
            };
        case types.notesDeleteFromSidebar:
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== action.payload.id),
            };
        case types.notesLogoutCleaning:
            return {
                ...state,
                notes: [],
                active: null,
            };
        default:
            return state;
    }
};
