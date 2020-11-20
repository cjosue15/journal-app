import React from 'react';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../../actions/notesAction';
import { transformDate } from '../../../helpers/dateTransform';
import { truncateText } from '../../../helpers/truncateText';

export const JournalEntry = React.memo(function JournalEntry({ id, date, body, title, url }) {
    const dispatch = useDispatch();

    const handleActive = () => {
        dispatch(activeNote(id, { date, body, title, url }));
    };

    const { day, month } = transformDate(date);

    return (
        <div className='journal__entry' onClick={handleActive}>
            <div
                className='journal__entry-picture'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${url || process.env.PUBLIC_URL + '/images/noimage.png'})`,
                    backgroundPosition: 'center',
                }}
            ></div>
            <div className='journal__entry-body'>
                <p className='journal__entry-title'>{title}</p>
                <p className='journal__entry-content'>{truncateText(body)}</p>
            </div>
            <div className='journal__entry-date-box'>
                <span>{month}</span>
                <h4>{day}</h4>
            </div>
        </div>
    );
});

// function JournalEntry({ id, date, body, title, url }) {
//     const dispatch = useDispatch();

//     const handleActive = () => {
//         dispatch(activeNote(id, { date, body, title }));
//     };

//     console.log({ date, body, title });

//     const { day, month } = transformDate(date);

//     return (
//         <div className='journal__entry' onClick={handleActive}>
//             <div
//                 className='journal__entry-picture'
//                 style={{
//                     backgroundSize: 'cover',
//                     backgroundImage: `url(${url || 'https://miro.medium.com/max/1051/1*vPmRhskB39yduuJobjgqwg.png'})`,
//                 }}
//             ></div>
//             <div className='journal__entry-body'>
//                 <p className='journal__entry-title'>{title}</p>
//                 <p className='journal__entry-content'>{body}</p>
//             </div>
//             <div className='journal__entry-date-box'>
//                 <span>{month}</span>
//                 <h4>{day}</h4>
//             </div>
//         </div>
//     );
// }

// export default React.memo(JournalEntry);
