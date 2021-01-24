const { Users } = require("../models");
module.exports = {
    post: async (req, res) => {

        const userId = req.session.userId;
        const { nickname, email, prevPassword, newPassword } = req.body;

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

            if (prevPassword) {
                const verificationPW = await Users.findOne({
                    where: {
                        id: userId,
                        password:prevPassword
                    }
                })
                //기존 password 가 존재하는 경우 
                if(verificationPW) {
            if (newPassword) {
                const pwUp = await Users.update(
                    { password: newPassword },
                    { where: { id: userId } },
                )
            }
        } else {
            res.status(400).json({ message: "The password is incorrect."})
            return;
        }
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