import { Router } from "express";
import controller from '../controllers/controller.js'
import multer from "multer";//file upload

const router = Router();

//MULTER SECTION
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads')
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage})

router.post(`/addPost`,upload.single('file-input'),controller.postAddPost);
router.post(`/updatePic`,upload.single('file-input-pic'),controller.postUpdatePic);

router.get(`/`, controller.isLoggedIn, controller.getSchoolPage); //if logged in: can go here, otherwise goes back to login page 
router.get(`/user`, controller.isLoggedIn, controller.getUserPage); 
router.get(`/search`, controller.isLoggedIn, controller.getSearch); 
router.get(`/login`, controller.isLoggedOut, controller.getLogin); 
router.get(`/register`, controller.isLoggedOut, controller.getRegister); 
router.post(`/register`, controller.postRegister); 
router.post(`/login`, controller.postLogin); 
router.get(`/logout`, controller.isLoggedIn, controller.getLogout); 
router.get(`/checkEmailReg`, controller.getCheckEmailReg); 
router.get(`/checkUsernameReg`, controller.getCheckUsernameReg); 
router.get(`/deletePost`, controller.getDeletePost);
router.get(`/editPost`, controller.postEditPost);  
router.get('/editBio', controller.postEditBio);
router.get('/getbio', controller.getBio);
router.get('/getprofpic', controller.getPfp);
router.get(`/userAny`, controller.getAnyUserPage);  
router.get(`/home`, controller.isLoggedIn, controller.getSchoolPage); 

export default router;