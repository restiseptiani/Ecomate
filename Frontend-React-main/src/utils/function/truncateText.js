export const truncateText = (text, charLimit) => {
    if (text?.length > charLimit) {
        return text.slice(0, charLimit) + "...";
    }
    return text;
};
