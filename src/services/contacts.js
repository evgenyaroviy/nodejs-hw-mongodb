// src/services/contacts.js 
import { ContactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
    page = 1, 
    perPage = 10, 
    sortBy = "name", 
    sortOrder = "asc",
    filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const contactsQuery = ContactsCollection.find();

  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  const data = await ContactsCollection.find().skip(skip).limit(limit).sort({ [sortBy]: sortOrder });
  const total = ContactsCollection.countDocuments();
  const paginationData = calculatePaginationData({total, page, perPage});

  return {
    data,
    page, 
    perPage, 
    totalItems: total,
    ...paginationData, 
  };
};

export const getContactById = contactId => ContactsCollection.findById(contactId);

export const addContact = payload => ContactsCollection.create(payload);

export const updateContact = async (_id, payload) => {
  const result = await ContactsCollection.findOneAndUpdate({_id}, payload);

  return result;
};

export const deleteContact = async (_id) => {
  const result = await ContactsCollection.findOneAndDelete({ _id });
  return result;
};