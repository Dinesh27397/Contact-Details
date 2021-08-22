var express=require('express')
var router = express.Router()
const upload =require('../Controller/upload')
var mongoose=require('mongoose')
const Grid = require("gridfs-stream");
var auth =require('../Controller/auth')
const jwt = require("jsonwebtoken");
let gfs;
var Contact=require('../Controller/contact')
mongoose.connection.once('open',()=>{
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection("photos");
})
var sessionCheck=function(req,res,next)
{
    const token = req.header("token");
    if (!token) return res.status(401).json({ message: "Auth Error" });
    try {
      const decoded = jwt.verify(token, "randomString");
      req.user = decoded.user;
      next();
    } catch (e) {
      res.status(401).send({status:false, message: "Unauthorized Token" });
    }
}

router.post("/file/upload",upload.single('file'),async (req,res)=>{
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `${req.protocol + '://' + req.get('host')}/file/${req.file.filename}`;
    return res.send(imgUrl);
})
router.get("/file/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        console.log(error)
        res.send("not found");
    }
});
/**
 * @swagger
 * 
 * /auth/login :
 *   name : Auth 
 *   post :
 *        description: login in using auth 
 *        parameters:
 *        in : body
 *        name : data
 *        required : true
 *        schema : 
 *          type : object 
 * 
 *        responses:
 *            '200' :  
 *              description: A successfull response  
 */

router.post('/auth/login',(req,res)=>{
    auth.login(req,res)
})
router.post('/auth/register',(req,res)=>{
    auth.register(req,res)
})
router.get('/contacts/',sessionCheck,(req,res)=>{
    Contact.getContactDetails(req,res)
})
router.get('/contacts/:id',sessionCheck,(req,res)=>{
    Contact.getSingleContact(req,res)
})
router.patch('/contacts/update',sessionCheck,(req,res)=>{
    Contact.updateContactDetails(req,res)
})
router.post('/contacts/add',sessionCheck,(req,res)=>{
    Contact.addContactDetails(req,res)
})
router.post('/contacts/delete/:id',sessionCheck,(req,res)=>{
    Contact.deleteContactdetails(req,res)
})

module.exports=router


