const { Users } = require("../models")

module.exports = {
    get: async (req, res) => {

        const userId = req.session.userId

        if (!userId) {
            res.status(404).json({ message: "Not authorized" })

            
        } else {
            const user = await Users.findOne({
                attributes: ["email", "nickname"],
                where: { id: userId }
            })

            let userInfo = user.dataValues

            res.status(200).json({userInfo})
        }
    }
}