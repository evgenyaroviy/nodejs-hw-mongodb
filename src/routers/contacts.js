import { Router } from "express";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import * as contactsController from "../controllers/contacts.js";

import { validateBody } from "../utils/validateBody.js";
import { contactAddSchema, contactUpdateSchema } from "../validation/contacts.js";

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

contactsController.use(authenticate);

router.get('/', ctrlWrapper(contactsController.getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(contactsController.getContactByIdController));

router.post('/', validateBody(contactAddSchema), ctrlWrapper(contactsController.addContactController));

router.patch('/:contactId', isValidId, validateBody(contactUpdateSchema), ctrlWrapper(contactsController.patchContactController));

router.delete('/:contactId', isValidId, ctrlWrapper(contactsController.deleteContactController));

export default router;

