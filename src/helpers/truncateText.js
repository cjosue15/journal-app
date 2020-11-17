export const truncateText = (text) => (text.length > 40 ? `${text.substring(0, 40)}...` : text);
