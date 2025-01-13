import { Router } from "express";
import { 
    getContactsController, 
    getContactByIdController,
    addContactController,
    patchContactController,
    deleteContactController } 
    from "../controllers/contacts.js";

import { validateBody } from "../utils/validateBody.js";
import { contactAddSchema, contactUpdateSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post('/', validateBody(contactAddSchema), ctrlWrapper(addContactController));

router.patch('/:contactId', isValidId, validateBody(contactUpdateSchema), ctrlWrapper(patchContactController));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;

