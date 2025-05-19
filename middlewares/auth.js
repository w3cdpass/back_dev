const { getUser } = require('../service/auth')
function checkForAuthentication(req, res, next) {
    // const authorizationHeaderValue = req.headers['authorization'];
    const authorizationHeaderValue = req.cookies?.token;
    req.user = null
    // if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer'))
    if (!authorizationHeaderValue)
        return next()

    // validate
    // const token = authorizationHeaderValue.split("Bearer")[1];
    const token = authorizationHeaderValue;
    const user = getUser(token)
    req.user = user;
    return next()
}

// restrict to the user
function restrictRole(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/login')
        if (!roles.includes(req.user.role)) return res.end("UnAuthorized")
            next()
    }
}
// async function restricTOlogginuser(req, res, next) {
//     // console.log(req)
//     // const userUid = req.cookies?.uid;
//     const userUid = req.headers['authorization'];
//     if (!userUid) return res.redirect('/login');
//     const token = userUid.split('Bearer ')[1] // beaerer ,["dfdfdfdfdfdf"]
//     const user = getUser(token);
//     if (!user)  return res.redirect('/login');

//     req.user = user;
//     next()
// }
// async function checkAuth(req,res, next) {
//     const userUid = req.headers['authorization'];
//     const token = userUid.split('Bearer ')[1]
//     // const userUid = req.cookies?.uid;
//     // if (!userUid) return res.redirect('/login');

//     const user = getUser(token);
//     // if (!user)  return res.redirect('/login');

//     req.user = user;
//     next()
// }
// module.exports = { restricTOlogginuser, checkAuth };
module.exports = { checkForAuthentication, restrictRole }