// src/services/contacts.js 
import { ContactsCollection } from "../db/models/contacts.js";

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = contactId => ContactsCollection.findById(contactId);

export const addContact = payload => ContactsCollection.create(payload);

export const updateContact = async (_id, payload) => {
  const result = await ContactsCollection.findOneAndUpdate({_id}, payload, {
    new: true,
});

  return result;
};

export const deleteContact = async (_id) => {
  const result = await ContactsCollection.findOneAndDelete({ _id });
  return result;
};