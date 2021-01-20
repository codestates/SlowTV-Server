const { Users } = require("../models");
module.exports = {
    post: async (req, res) => {

        const userId = req.session.userId;
        const { nickname, email, password } = req.body;

        if (!userId) {
            res.status(404).json({ message: "Not authorized" });
            // req.session.userId가 일치 하는 경우
        } else {
            if (nickname) {
                const nickUp  = await Users.update(
                    { nickname: nickname },
                    { where: { id: userId } },
                )
            }

            if (email) {
                const emailUp = await Users.update(
                    { email: email },
                    { where: { id: userId } },
                )
            }

            if (password) {
                const pwUp = await Users.update(
                    { password: password },
                    { where: { id: userId } },
                )
            }
            
            const userupdateInfo = await Users.findOne({
                attributes: ["nickname","email"],
                where: {id: userId}
            })
            let updateSuccess = userupdateInfo.dataValues

            res.status(200).json({ updateSuccess })
        }
    }
}