// src/services/contacts.js 
import { ContactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
    page = 1, 
    perPage = 10, 
    sortBy = 'name', 
    sortOrder = 'asc',
    filter = {},
}) => {
  try {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const contactsQuery = ContactsCollection.find();

  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if(filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }


  const totalItems = await ContactsCollection.find().merge(contactsQuery).countDocuments();
  const data = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder });

  // if (totalItems == null) {
  //   throw new Error('Total items not calculated correctly');
  // }
  const paginationData = calculatePaginationData(totalItems, page, perPage);

  return {
    data,
    page, 
    perPage, 
    totalItems,
    ...paginationData, 
  };
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

export const getContactById = contactId => ContactsCollection.findById(contactId);

export const getContact = filter => ContactsCollection.findOne(filter);

export const addContact = payload => ContactsCollection.create(payload);

export const updateContact = async (filter, payload) => {
  const result = await ContactsCollection.findOneAndUpdate(filter, payload);

  return result;
};

export const deleteContact = async (_id) => {
  const result = await ContactsCollection.findOneAndDelete({ _id });
  return result;
};