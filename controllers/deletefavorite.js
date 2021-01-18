const {Contents, UsersContents} = require("../models")

module.exports = {
    post: async (req, res) => {

        const userId = req.session.userId
        const { link } = req.body

        if (!userId) {
            res.status(404).json({ message: "Not authorized"})
        
        } else {
            const contentInfo = await Contents.findOne({
                attributes:["id"],
                where: { contentlink: link }
            })

            //링크가 DB에 있지 않은 경우
            if (!contentInfo) {
                res.status(400).json({ message: "This link does not exit" })

                //링크를 찾은 경우 UsersContents 테이블에서 삭제
            } else {

                const deletelink  = await UsersContents.destroy({
                    where: {
                        User_id: userId,
                        Content_id: contentInfo.id
                    }
                });
                console.log('deleteLink', deletelink)

                if (deletelink === 0 ){
                    res.status(409).json({ message : "This link has already been deleted." })
                } 

                res.status(200).json({ message: "Delete completed" })
            }

        }

    } 
}