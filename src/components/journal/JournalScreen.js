import React from 'react';
import { NoteScreen } from '../notes/NoteScreen';
// import { NothingSelected } from './NothingSelected/NothingSelected';
import { Sidebar } from './Sidebar/Sidebar';

export const JournalScreen = () => {
    return (
        <div className='journal__main-content'>
            <Sidebar />
            <main>
                {/* <NothingSelected /> */}
                <NoteScreen />
            </main>
        </div>
    );
};
