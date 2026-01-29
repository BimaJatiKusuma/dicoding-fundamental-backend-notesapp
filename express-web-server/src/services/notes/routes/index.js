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

router.post('/notes', authenticateToken, validate(notePayloadSchema), addNote);
router.get('/notes', authenticateToken, getNotes);
router.get('/notes/:id', authenticateToken, getNoteById);
router.put('/notes/:id', authenticateToken, validate(noteUpdatePayloadSchema), editNoteById);
router.delete('/notes/:id', authenticateToken, deleteNoteById);

export default router;


