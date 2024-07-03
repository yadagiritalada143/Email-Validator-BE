import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.filename
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myFile');

function checkFileType(file: any, cb: any) {
    const filetypes = /js|application\/javascript/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    console.log(file.mimetype);
    console.log(filetypes.test(file.mimetype))
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Files with .js extension only allowed!');
    }
}

const scanFile = (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            if (req.file == undefined) {
                res.status(400).send('Error: No File Selected!');
            } else {
                // next();
                res.status(200).send(`File Uploaded: ${req.file.filename}`);
            }
        }
    });
}

export default { scanFile }