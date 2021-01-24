const { Categories, Contents, UsersContents } = require("../models")

module.exports = {
    get: async (req, res) => {

        let categoryName = req.params.name
        const userId = req.session.userId;

        if (!userId) {
            console.log(categoryName)
            const categoryInfo = await Categories.findOne({
                attributes: ["id"],
                where: { categoryname: categoryName }
            })

            if (!categoryInfo.id) {
                res.status(400).json({ message: "Category does not exist" })
            } else {

                const contentInfo = await Contents.findAll({
                    attributes: ["id", "contentname", "contentlink", "thumbnail"],
                    where: { Categories_id: categoryInfo.id }
                })
                let contents = contentInfo.map(el => el.dataValues)

                res.status(200).json({ contents })
            }
            //회원일 경우 즐겨찾기한 컨텐츠는  isFavorite : true 값을 추가
        } else {

            const categoryInfo = await Categories.findOne({
                attributes: ["id"],
                where: { categoryname: categoryName }
            })

            if (!categoryInfo.id) {
                res.status(400).json({ message: "Category does not exist" })
            } else {

                const contentInfo = await Contents.findAll({
                    attributes: ["id", "contentname", "contentlink", "thumbnail"],
                    where: { Categories_id: categoryInfo.id }
                })
                let contents = contentInfo.map(el => el.dataValues)

                for (let i = 0; i < contents.length; i++) {
                    const usercontentId = await UsersContents.findOne({
                        attributes: ["Content_id"],
                        where: {
                            User_id: userId,
                            Content_id: contents[i].id
                        }
                    })
                    if (usercontentId) {
                        contents[i].isFavorite = true
                    }
                }
                res.status(200).json({ contents })
            }
        }
    }
}
