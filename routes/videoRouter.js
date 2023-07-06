const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/', videoController.index);
router.get('/videos/:id', videoController.show);
router.post('/videos', videoController.create);
router.put('/videos/:id', videoController.update);
router.delete('/videos/:id', videoController.delete);
router.get('/stream/:id', videoController.stream);

module.exports = router;

