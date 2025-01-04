import createHttpError from 'http-errors';
import * as contactService from "../services/contacts.js";

export const getContactsController = async (req, res) => {
    const contacts = await contactService.getAllContacts();

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await contactService.getContactById(contactId);
    
    // Відповідь, якщо контакт не знайдено
    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    // Відповідь, якщо контакт знайдено
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

export const addContactController = async (req, res) => {
    const data  = await contactService.addContact(req.body);

    res.status(201).json({
        status: 201,
		message: "Successfully created a contact!",
		data,
    });
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const resalt  = await contactService.updateContact(contactId, req.body);

    if(!resalt) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
        status: 200,
	message: "Successfully patched a contact!",
    data: resalt.data,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const resalt  = await contactService.deleteContact({_contactId: contactId});

    if(!resalt) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(204).json({
        status: 204,
    });
};