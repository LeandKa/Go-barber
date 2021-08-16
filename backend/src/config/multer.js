import multer from 'multer';
import path from 'path';

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../images/avatar'));
    },
    filename: (req, files, cb) => {
        cb(null, Date.now() + '-' + files.originalname);
    },
});

const upload = multer({
    storage: fileStorage,
});

export default upload;
