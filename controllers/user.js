const { v4: uuidv4 } = require('uuid');
const User = require('../model/user')
const {setUser} = require('../service/auth')
async function handleusersinup(req, res) {
    const { name, email, password, role } = req.body;
    await User.create({
        name, email, password, role
    });
    return res.redirect('/')
}
async function handleuserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email, password
    });
    if (!user) return res.render('login', {
        error: 'invalid username or password'
    })
    // const sessionId = uuidv4()
    const token = setUser( user);
    res.cookie("token", token);
    // return res.json({token})
    return res.redirect('/')
}

module.exports = { handleusersinup, handleuserLogin };