const express = require('express');
const Router = express.Router()
const { URL } = require('../model/url');
const { restrictRole } = require('../middlewares/auth');

Router.get('/admin/urls', restrictRole(['Admin']), async (req, res) => {
    const allurls = await URL.find({});

    return res.render('home', {
        urls: allurls
    })
})
Router.get('/', restrictRole(['Normal', 'Admin']), async (req, res) => {
    // if (!req.user) return res.redirect('/login');

    const allurls = await URL.find({ createdBy: req.user._id });

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