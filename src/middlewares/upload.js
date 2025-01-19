import multer from "multer";

import { TEMP_UPLOAD_DIR } from "../constants/index.js";

const storage = multer.diskStorage({
    destination: TEMP_UPLOAD_DIR,
    filename: (req, file, cb) => {
        const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePreffix}_${file.originalname}`;
        cb(null, filename);
    },
});
    
const limit = {
    fileSize: 5 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
    const extantion = file.originalname.split('.').pop();
    if(extantion === 'exe') {
        return cb(new Error(400, 'exe files are not allowed'));
    }
};
export const upload = multer({
    storage,
    fileFilter,
    limit,
});