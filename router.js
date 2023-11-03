const express = require('express');

const router = express.Router();
const myController = require('../controller/controller');

router.get('/' ,  myController.renderData);
router.post('/insertData',  myController.insertTask);
router.post('/delete-task',  myController.deleteTask);
router.post('/update-task', myController.updateTask);
module.exports = router ;
