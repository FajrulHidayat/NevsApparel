
const fs = require('fs');
const { model } = require('mongoose');
const path = require('path');
const basename = path.basename(__filename);

const db = {}
fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    db[file.slice(0, file.length - 3)] = require(`./${file.slice(0, file.length - 3)}`)
    // console.log(db);
})
module.exports = db;

