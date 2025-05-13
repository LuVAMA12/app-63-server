import multer from 'multer';

// We create a  new storage instance with multer for upload of file
const storage = multer.diskStorage({
    // We the path the location where the files will be downloaded
    destination: function(req, file, cb) {
      cb(null, 'public/images/');
    },
    //  We rename the upload file 
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +  '.' + file.originalname.split('.').pop());
    }
   })

   export const upload = multer({ storage });