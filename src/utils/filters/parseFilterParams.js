const parseBoolean = (bool) => (typeof bool === 'boolean' ? bool : undefined);
export const parseContactsFilterParams = ({isFavourite}) => {
    const parsedIsFavourite = parseBoolean(isFavourite);

    return {isFavourite: parsedIsFavourite};
};