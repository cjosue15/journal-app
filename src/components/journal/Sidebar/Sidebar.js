import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startLogout } from '../../../actions/authActions';
import { startNewNote } from '../../../actions/notesAction';
import { JournalEntries } from '../JournalEntries/JournalEntries';

export const Sidebar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { img, name } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());
        history.replace('/auth/login');
    };

    const handleAddEntry = () => {
        dispatch(startNewNote());
    };

    return (
        <aside className='journal__sidebar'>
            <div className='journal__sidebar-navbar'>
                <div className='profile'>
                    <img
                        src={img || `${process.env.PUBLIC_URL}/images/noimage.png`}
                        alt='Profile'
                        className='profile'
                    />
                    <h3>
                        {/* <i className='far fa-moon'></i> */}
                        {name}
                    </h3>
                </div>
                <button className='btn' onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className='journal__content-button'>
                <button className='journal__new-entry btn btn-primary' onClick={handleAddEntry}>
                    <span>New entry</span>
                    <i className='far fa-calendar-plus fa-2x'></i>
                </button>
            </div>
            <JournalEntries />
        </aside>
    );
};
