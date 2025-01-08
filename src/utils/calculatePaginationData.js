export const calculatePaginationData = (total, perPage, page) => {
    const totalPages = Math.ceil(total / perPage);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
        totalPages,
        hasNextPage,
        hasPreviousPage,
    };
};