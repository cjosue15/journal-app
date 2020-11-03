import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
    return (
        <div className='notes__main-content'>
            <NotesAppBar />
            <div className='notes__content'>
                <input type='text' placeholder='Some awesome title' className='notes__title-input' autoComplete='off' />
                <textarea name='' placeholder='What happened today' className='notes__texarea'></textarea>
                <div className='notes__image'>
                    <img src='https://miro.medium.com/max/1051/1*vPmRhskB39yduuJobjgqwg.png' alt='Gatito' />
                </div>
            </div>
        </div>
    );
};
