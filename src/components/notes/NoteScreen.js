import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../actions/notesAction';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    const dispatch = useDispatch();

    const { active: note } = useSelector((state) => state.notes);
    const [values, handleInputChange, reset] = useForm(note);
    const { title, body } = values;
    const currentId = useRef(note.id);

    useEffect(() => {
        if (note.id !== currentId.current) {
            reset(note);
            currentId.current = note.id;
        }
    }, [note, reset]);

    useEffect(() => {
        dispatch(activeNote(values.id, { ...values }));
        console.log('ga');
    }, [values, dispatch]);

    return (
        <div className='notes__main-content animate__animated animate__fadeIn'>
            <NotesAppBar />
            <div className='notes__content'>
                <input
                    type='text'
                    name='title'
                    value={title}
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                    onChange={handleInputChange}
                />
                <textarea
                    name='body'
                    placeholder='What happened today'
                    className='notes__texarea'
                    value={body}
                    onChange={handleInputChange}
                ></textarea>
                {note.url && (
                    <div className='notes__image'>
                        <img
                            src={`${note.url || 'https://miro.medium.com/max/1051/1*vPmRhskB39yduuJobjgqwg.png'}`}
                            alt='Gatito'
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
