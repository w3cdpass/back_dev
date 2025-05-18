const express = require('express');
const Router = express.Router()
const {URL} = require('../model/url')
Router.get('/', async (req, res) => {
    if (!req.user) return res.redirect('/login');

    const allurls = await URL.find({createdBy: req.user._id});

    return res.render('home', {
        urls: allurls
    })
});
Router.get('/signup', (req, res) => {
    return res.render('signup')
})
Router.get('/login', (req, res) => {
    return res.render('login')
})
module.exports = Router;