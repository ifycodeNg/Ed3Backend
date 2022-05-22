const Model = require("../db/sequelize")


let SaveToken = async (Token, Id, Key) => {
    let query = await Model.Token.create({
        userID: Id,
        token: Token,
        key: Key
    })
}

let findUserByToken = async (Id, token) => {

    TokenFound = Model.Token.findAll({
        where: {
            userID: Id,
            token: token
        }
    })

    let AwaitTokenFound = await TokenFound

    if (Array.isArray(AwaitTokenFound) && AwaitTokenFound.length == 0
    ) {

        return false

    }

    else return TokenFound
}
module.exports = { SaveToken, findUserByToken }