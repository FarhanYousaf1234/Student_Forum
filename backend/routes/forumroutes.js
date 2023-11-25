const express = require('express');
const router = express.Router();
const {createForums,getForums,Comment}=require('../controllers/Forumcontroller');
router.get('/forums', getForums);
router.post('/forums', createForums);
router.post('/forums/:forumId/comments', Comment);
module.exports = router;
