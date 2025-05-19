// stateFull auth
// const sessionIdToUserMap = new Map();
// function setUser(id, user) {
//     sessionIdToUserMap.set(id, user);
// }

// stateless
const jwt = require('jsonwebtoken');
const sercret = "g@(090)";
function setUser(user) {
    // const payload = {
    //     ...user
    // }
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role
    }, sercret)
}

function getUser(token) {
    // return sessionIdToUserMap.get(id)
    if (!token) return null;
    try {
        return jwt.verify(token, sercret)
    } catch (error) {
        return null
    }
    
}

module.exports = { setUser, getUser };