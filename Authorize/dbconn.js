const mongoose = require('mongoose');
async function connectionDB(params) {
    return await mongoose.connect(params)
}

module.exports = connectionDB