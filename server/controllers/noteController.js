const Note = require('../models/noteModels');

const noteController = {};

noteController.getNotes = async (req, res, next) => {
  // const resBody = res.body;
  try {
    const notes = await Note.find({});
    res.locals.notes = notes;
    next();
  } catch (err) {
    next({
      log: 'Express error caught in noteController.getNotes middleware',
      message: {
        err: `An error occurred in noteController.getNotes middleware: ${err}`,
      },
    });
  }
};

noteController.addNote = (req, res, next) => {
  // write code here
  console.log('request body', req.body);
  const {
    title,
    note,
    objectID,
    primaryImage,
    primaryImageSmall,
    department,
    objectDate,
    dimensions,
    medium,
    artistDisplayName,
  } = req.body;
  Note.create({
    title,
    note,
    objectID,
    primaryImage,
    primaryImageSmall,
    department,
    objectDate,
    dimensions,
    medium,
    artistDisplayName,
  })
    .then((newNote) => {
      res.locals.newNote = newNote;
      console.log('newNote', newNote);
      return next();
    })
    .catch((err) =>
      next({
        log: 'Express error caught in noteController.addNote middleware',
        message: {
          err: `An error occurred in noteController.addNote middleware: ${err}`,
        },
      })
    );
};

noteController.deleteNote = (req, res, next) => {
  console.log('req Body: ', req.body);
  const id = req.body._id;
  Note.findOneAndDelete({ _id: id })
    .then((deletedNote) => {
      res.locals.deletedNote = deletedNote;
      console.log('deletedNote', deletedNote);
      return next();
    })
    .catch((err) =>
      next({
        log: 'Express error caught in noteController.deleteNote middleware',
        message: {
          err: `An error occurred in noteController.deleteNote middleware: ${err}`,
        },
      })
    );
};

module.exports = noteController;
