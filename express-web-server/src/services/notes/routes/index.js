import express from 'express';
import {
  addNote,
  getNotes,
  getNoteById,
  editNoteById,
  deleteNoteById
} from '../controller/note-controller.js';
import validate from '../../../middlewares/validate.js';
import { notePayloadSchema, noteUpdatePayloadSchema } from '../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticateToken, validate(notePayloadSchema), addNote);
router.get('/', authenticateToken, getNotes);
router.get('/:id', authenticateToken, getNoteById);
router.put('/:id', authenticateToken, validate(noteUpdatePayloadSchema), editNoteById);
router.delete('/:id', authenticateToken, deleteNoteById);

export default router;


