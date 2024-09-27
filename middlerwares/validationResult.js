const { validationResult } = require("express-validator");

const validatFields = (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: error.mapped()
        })
    }
    //sigue tu flujo normal
    next()
}

module.exports = validatFields
