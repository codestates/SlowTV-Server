const { Contents, UsersContents, Categories } = require("../models")
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = {
    get: async (req, res) => {

        const userId = req.session.userId

        if (!userId) {
            res.status(404).json({ message: "Not authorized" })

            
        } else {
            const contentInfo = await UsersContents.findAll({
                attributes: ["Content_id"],
                where: { User_id: userId }
            })
            //console.log('contentInfo>>>', contentInfo)
            let contentIdArr = contentInfo.map(el => el.dataValues.Content_id) //  [ 2, 1 ]

            //유저가  즐겨찾기한 컨텐츠가 없는 경우
            if (contentIdArr.length === 0) {
                res.status(400).json({ message: "User has no favorite links" })

                //즐겨찾기한 컨텐츠가 있는 경우
            } else {

                // 제목, 링크, 카테고리  찾아서 보내주기
                const contentInfo = await Contents.findAll({
                    attributes: ["contentname", "contentlink", "Categories_id", "thumbnail"],
                    where: {
                        id: { [Op.or]: contentIdArr }
                    }
                })

                let categoriesId = contentInfo.map(el => el.Categories_id) //  [ 1 , 2 ] 
                // console.log('contentInfo>>>', contentInfo)
                let usersfavorites = contentInfo.map(el => el.dataValues)
                usersfavorites.map(el => { delete el.Categories_id })
                /*
                [
                    {
                        contentname: '따뜻한 모닥불 영상',
                        contentlink: 'https://youtu.be/-LBgxSaB-n8'
                    },
                    {
                        contentname: '파도 영상',
                        contentlink: 'https://www.youtube.com/watch?v=5d7BIN5gOqU'
                    }
                ]
                */
                const categoryInfo = await Categories.findAll({
                    attributes: ["categoryname"],
                    where: {
                        id: { [Op.or]: categoriesId }
                    }
                })

                let categoryArr = categoryInfo.map(el => el.dataValues) // [ { categoryname: 'fire' }, { categoryname: 'water' } ]

                for (let i = 0; i < usersfavorites.length; i++) {
                    usersfavorites[i].categoryname = categoryArr[i].categoryname
                }

                res.status(200).json({ usersfavorites })
            }
        }
    }
}
