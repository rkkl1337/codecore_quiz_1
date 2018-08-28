const express = require('express');
const router = express.Router();
const knex = require('../db/client');

router.post("/", (req, res) => {
    const {content, image_url} = req.body;
     knex("cluckr")
        .insert({
            username: req.cookies.username,
            content,
            image_url
        })
        .then(() => {
            res.redirect('./cluckr');
        });
})

router.get("/", (req, res) => {
    knex("cluckr")
        .orderBy("created_at", "DESC")
        .then(cluckr => {
            res.render("cluckr", { cluckr });
        })
})

router.get("/new", (req, res) => {
    res.render('./new');
})

module.exports = router;