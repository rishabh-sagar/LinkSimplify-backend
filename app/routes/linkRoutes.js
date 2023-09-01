// linkRoutes.js
const express = require('express');
const router = express.Router();
const {createLink,getActualLink,getUserLinks,updateLink,deleteLink} = require('../controllers/linkController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/links', authMiddleware, createLink);
router.get('/user/links', authMiddleware, getUserLinks);
router.get('/:shortUrl', getActualLink);
router.put('/:shortUrl', updateLink);
router.delete('/:shortUrl', deleteLink);


module.exports = router;
