import multer from 'multer';

// We create a  new storage instance with multer for upload of file
const storage = multer.diskStorage({
    // We the path the location where the files will be downloaded
    destination: function(req, file, cb) {
      cb(null, 'public/images/');
    },
    //  We rename the upload file 
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +  '.' + path.extname(file.originalname))
    }
   })

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg','image/png']

  if(allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(console.error('Invalid file type'), false);
  }
}

   export const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter,
    });