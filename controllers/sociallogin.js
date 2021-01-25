const {  Users } = require("../models")

module.exports = {
    post: async (req, res) => {
        //console.log('req.body>>>',req.body)
        const { nickname, email } = req.body
        
        //이메일과 닉네임을 조회
        const [userInfo, create] = await Users.findOrCreate({
            where: {
                email: email,
                nickname: nickname
            },
            defaults: {
                nickname,
                email,
            }
        });
        console.log("userInfo",userInfo)
        console.log("create",create)
        //이미 있는 email 일 경우
        if (!create) {
            req.session.userId = userInfo.dataValues.id;
            res.status(200).json({
                email:userInfo.email,
                nickname: userInfo.nickname,
                message: "Welcome back!"
            })
        // 없는 이메일일 경우 DB에  추가하고 세션과 함께 응답
        } else {
            req.session.userId = userInfo.dataValues.id
            res.status(201).send({
                email:userInfo.email,
                nickname: userInfo.nickname,
                message: "Hello!"
            })
        }
    }
}