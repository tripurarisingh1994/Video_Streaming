class Video {
    constructor(id, title, url) {
        this.id = id;
        this.title = title;
        this.url = url;
    }

    static findAll() {
        /* Fetch all videos from the database
        * and return an array of Video object */
    }

    static findById(id) {
        /* Find video with given id database
        * and return the database */
    }

    static create({ title, url }) {
        // Create a new video in the database and return the updated Video object
    }

    static update(id, { title, url}) {
        // Update the video in the database with given id and return the Video object
    }

    static delete(id) {
        // Delete the video with the given ID from the databse
    }
}

module.exports = Video