import { Router } from "express";
import { 
    getContactsController, 
    getContactByIdController,
    addContactController,
    patchContactController,
    deleteContactController } 
    from "../controllers/contacts.js";

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts', ctrlWrapper(addContactController));

router.patch('/:contactId', ctrlWrapper(patchContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;

