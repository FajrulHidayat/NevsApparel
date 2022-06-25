const user = require("./UserController")
const order = require("./OrderController")
const motif = require("./MotifController")

const controller = {
    user,
    order,
    motif
}

module.exports = controller