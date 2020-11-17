export const transformDate = (date) => {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    // const month
    const day = new Date(date).getDate();
    const month = monthNames[new Date(date).getMonth()];

    return { day, month };
};
