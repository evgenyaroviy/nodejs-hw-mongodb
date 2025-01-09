import { sortByList } from "../db/models/contacts.js";


const sortOrderList = ["asc", "desc"];

export const parseSortParams = ({sortBy, sortOrder}) => {
const parsedSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : sortOrderList[0];
const parsedSortBy = sortByList.includes(sortBy) ? sortBy : 'name';
console.log(parsedSortBy, parsedSortOrder, sortByList);
return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder, 
};
};
