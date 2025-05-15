import multer from 'multer'

//image storage engine
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb)=>{
        return cb(null, file.originalname)
    }
})

const upload = multer({storage:storage})

export default upload