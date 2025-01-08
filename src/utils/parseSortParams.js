const sortOrderList = ["asc", "dsc"];
import { sortByList } from "../db/models/contacts.js";

export const parseSortParams = ({sortBy, sortOrder}) => {
const parsedSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : sortOrderList[0];
const parsedSortBy = sortByList.includes(sortBy) ? sortBy : '_id';
return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
};
};
