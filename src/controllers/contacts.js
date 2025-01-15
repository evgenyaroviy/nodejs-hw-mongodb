import createHttpError from 'http-errors';
import * as contactService from "../services/contacts.js";
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseContactsFilterParams } from '../utils/filters/parseFilterParams.js';

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseContactsFilterParams(req.query);
    filter.userId = req.user._id;

    const contacts = await contactService.getAllContacts({page, perPage, sortBy, sortOrder, filter});

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { contactId: _id } = req.params;
    const contact = await contactService.getContactById({_id, userId});
    
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
    const {_id: userId} = req.user;
    
    const data  = await contactService.addContact({...req.body, userId});

    res.status(201).json({
        status: 201,
		message: "Successfully created a contact!",
		data,
    });
};

export const patchContactController = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { contactId: _id } = req.params;
    const resalt  = await contactService.updateContact({_id, userId}, req.body);

    if(!resalt) {
        throw createHttpError(404, 'Contact not found');
    }

    const contact = await contactService.getContactById(contactId);
    
    res.status(200).json({
        status: 200,
	message: "Successfully patched a contact!",
    data: contact,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { contactId: _id } = req.params;
    const resalt  = await contactService.deleteContact({_id, userId});

    if(!resalt) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
};