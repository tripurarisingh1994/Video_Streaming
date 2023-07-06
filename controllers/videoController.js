const Video = require('../models/Video');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: '/public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 }, // 100 MB
}).single('videoFile');

const videoController = {
    index: (req, res) => {
        // Fetch all videos from the database
        const videos = Video.findAll();
        res.render('index', { videos });
    },

    show: (req, res) => {
        const { id } = req.params;
        // Fetch the video with the given ID from the database
        const video = Video.findById(id);
        res.render('show', { video });
    },

    create: (req, res) => {
        upload(req, res, function (err) {
            if (err) {
                // Handle the upload error
                console.log(err);
                return res.status(500).json({ error: 'Error uploading the video' });
            }

            const { title } = req.body;
            const url = req.file.filename;

            // Create a new video in the database
            const video = Video.create({ title, url });

            // Redirect to the video's details page
            res.redirect(`/videos/${video.id}`);
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { title } = req.body;

        // Update the video with the given ID in the database
        const updatedVideo = Video.update(id, { title });

        res.json(updatedVideo);
    },

    delete: (req, res) => {
        const { id } = req.params;

        // Delete the video with the given ID from the database
        Video.delete(id);

        res.json({ message: 'Video deleted successfully' });
    },

    stream: (req, res) => {
        const { id } = req.params;
        // Fetch the video with the given ID from the database
        const video = Video.findById(id);

        // Stream the video file to the client
        const videoPath = path.join(__dirname, '../public/uploads', video.url);
        res.sendFile(videoPath);
    }
};

module.exports = videoController;
