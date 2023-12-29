const express = require('express');

const routes = express.Router();

const multer = require('multer') 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const uploadimage = multer({ storage: storage }).single('images');

const usercontrollers = require('../controllers/usercontrollers');

routes.get('/',usercontrollers.index);
routes.get('/view',usercontrollers.view);
routes.post('/add',uploadimage,usercontrollers.add);
routes.get('/deleterecord',uploadimage,usercontrollers.deleterecord);
routes.get('/editrecord',uploadimage,usercontrollers.editrecord);
routes.post('/update',uploadimage,usercontrollers.update);

module.exports = routes;