const express = require('express');

const path = require('path')
const connectionDB = require('./connection')
const { URL } = require('./model/url')
const cookieParser  = require('cookie-parser')
const {checkForAuthentication,restrictRole} = require('./middlewares/auth')
const urlRoute = require('./router/urlRouter')
const staticRoute = require('./router/staticRoutes')
const userRoute = require('./router/user')

const app = express()
const PORT = 8080;
connectionDB('mongodb://localhost:27017/short_url')
    .then(() => console.log("connected"));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkForAuthentication)

app.set('view engine', 'ejs')

app.set('views', path.resolve('./views'))
app.use('/url',restrictRole(['Normal', 'Admin']), urlRoute)
app.use('/user', userRoute)

app.use('/', staticRoute)
app.get('/test', async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', { urls: allUrls})
    /**
     * end(`
        <html>
        <head></head>
        <ol>${allUrls.map(item =>  `<li>${item.shortId} - ${item.redirectURL} - ${item.visitHistory.length} </li>`).join('')}</ol>
        </html>
        `)
     */
})
app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamps: Date.now() } } }
    );
    res.redirect(entry.redirectURL)
})

app.listen(PORT, () => console.log(`Server is listen at Port http://localhost:${PORT}`));