
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
import response from '../../../utils/response.js';
import noteRepositories from '../repositories/note-repositories.js';
import AuthorizationError from '../../../exceptions/authorizatization-error.js';

export const addNote = async (req, res, next) => {
  const {title, body, tags } = req.validated;
  const {id: owner} = req.user;
  const note = await noteRepositories.createNote({
    title,
    body,
    tags,
    owner
  })

  if(!note){
    return next(new InvariantError('Catatan gagal ditambahkan'));
  }

  return response(res, 201, 'Catatan berhasil ditambahkan', { noteId: note.id });
};

export const getNotes = async (req, res) => {
  const { id: owner } = req.user;
  const notes = await noteRepositories.getNotes(owner);
  return response(res, 200, 'Catatan sukses ditampilkan', { notes });
};

export const getNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const isOwner = await noteRepositories.verifyNoteAccess(id, owner);

  if(isOwner === null){
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  if (isOwner === false) {
    return next( new AuthorizationError('Anda tidak berhak mengakses resource ini'))
  }

  const note = await noteRepositories.getNoteById(id);

  return response(res, 200, 'Catatan sukses ditampilkan', {note});
};

export const editNoteById = async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    body,
    tags
  } = req.validated;

  const {id: owner } = req.user;

  const isOwner = await noteRepositories.verifyNoteAccess(id, owner);

  if(isOwner === null) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  if (isOwner === false) {
    return next( new AuthorizationError('Anda tidak berhak mengakses resource ini'));
  }

  const note = await noteRepositories.editNote({
    id,
    title,
    body,
    tags
  })

  return response(res, 200, 'Catatan berhasil diperbarui', note);
};


export const deleteNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const isOwner = await noteRepositories.verifyNoteOwner(id, owner);
  if(isOwner === null) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }
  if (isOwner === false) {
    return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
  }

  const deletedNoteId = await noteRepositories.deleteNote(id);

  return response(res, 200, 'Catatan berhasil dihapus', { noteId: deletedNoteId});
};
