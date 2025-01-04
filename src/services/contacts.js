// src/services/contacts.js 
import { ContactsCollection } from "../db/models/contacts.js";

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = contactId => ContactsCollection.findById(contactId);

export const addContact = payload => ContactsCollection.create(payload);

export const updateContact = async (_contactId, payload) => {
  const result = await ContactsCollection.findOneAndUpdate({_contactId}, payload, {
    new: true,
});

  return result;
};

export const deleteContact = filter => ContactsCollection.findOneAndDelete(filter);