import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDeletingNote, startNoteUpdate, startUploading } from '../../actions/notesAction';

export const NotesAppBar = () => {
    const dispatch = useDispatch();

    const { active } = useSelector((state) => state.notes);

    const handleSave = () => {
        dispatch(startNoteUpdate(active));
    };

    const handlePictureClick = () => {
        document.querySelector('#fileUpload').click();
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        dispatch(startUploading(file));
        document.querySelector('#fileUpload').value = '';
    };

    const handleDelete = () => {
        dispatch(startDeletingNote(active.id));
    };

    return (
        <div className='notes__appbar'>
            <span>28 de agosto del 2020</span>

            <input
                style={{ display: 'none' }}
                type='file'
                name='file'
                id='fileUpload'
                accept='.png,.jpg,.jpeg'
                onChange={handleFileUpload}
            />

            <div>
                <button className='btn' onClick={handlePictureClick}>
                    Picture
                </button>
                <button className='btn' onClick={handleSave}>
                    Save
                </button>
                <button className='btn' onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};
