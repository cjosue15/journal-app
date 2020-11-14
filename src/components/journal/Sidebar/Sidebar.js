import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { startLogout } from '../../../actions/authActions';
import { JournalEntries } from '../JournalEntries/JournalEntries';

export const Sidebar = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(startLogout());
        history.replace('/auth/login');
    };

    return (
        <aside className='journal__sidebar'>
            <div className='journal__sidebar-navbar'>
                <h3>
                    <i className='far fa-moon'></i>
                    <span>Carlos</span>
                </h3>
                <button className='btn' onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <button className='journal__new-entry btn btn-primary'>
                <span>New entry</span>
                <i className='far fa-calendar-plus fa-2x'></i>
            </button>
            <JournalEntries />
        </aside>
    );
};
