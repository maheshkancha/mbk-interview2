const express = require("express");
const router = express.Router();
const { MongoClient } = require('mongodb');

const dbUrl = "mongodb://localhost:27017/commentsdb"

router.get("/", (req, res) => {
    const client = new MongoClient(dbUrl);

    async function getCommentList() {
        try{
            await client.connect();
            const db = client.db('commentsdb');
            const col = db.collection('comments');

            const result = await col.find({}).toArray();
            res.status(200).json(result);
        } catch(err) {
            console.log('Error while fetching comments...', err);
        } finally {
            await client.close();
        }
    }

    getCommentList();
});

module.exports = router;
