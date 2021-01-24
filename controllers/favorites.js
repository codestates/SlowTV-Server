const { Contents, UsersContents, Categories } = require("../models")
const sequelize = require("sequelize");
const category = require("./category");
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
            if (!contentIdArr.length) {
                res.send({ message: "User has no favorite links." });
                //즐겨찾기한 컨텐츠가 있는 경우
            } else {

                // 제목, 링크, 카테고리  찾아서 보내주기
                const contentInfo = await Contents.findAll({
                    attributes: ["id", "contentname", "contentlink", "Categories_id", "thumbnail"],
                    where: {
                        id: { [Op.or]: contentIdArr }
                    }
                })

                let categoriesId = contentInfo.map(el => el.Categories_id) //  [ 1 , 2 ] 
                // console.log('contentInfo>>>', contentInfo)
                let userFavorites = contentInfo.map(el => el.dataValues)
                userFavorites.map(el => { delete el.Categories_id })
                /*
                [
                    {
                        id: '1'
                        contentname: '따뜻한 모닥불 영상',
                        contentlink: 'https://youtu.be/-LBgxSaB-n8'
                        thumbnail: '썸네일 주소'
                        categoryname: 'fire'
                        isFavorite: true
                    },
                    {
                        id: '2'
                        contentname: '파도 영상',
                        contentlink: 'https://www.youtube.com/watch?v=5d7BIN5gOqU'
                        thumbnail: '썸네일 주소'
                        categoryname: 'water'
                        isFavorite: true
                    }
                ]
                */
                for (let i = 0; i < categoriesId.length; i++) {
                    const categoryInfo = await Categories.findOne({
                        attributes: ["categoryname"],
                        where: { id: categoriesId[i] },
                    })

                    categoriesId[i] = categoryInfo.dataValues;
                }

                //  let categoryArr = categoryInfo.map(el => el.dataValues) // [ { categoryname: 'fire' }, { categoryname: 'water' } ]
                // console.log('카테고리 네임', categoryArr)
                for (let i = 0; i < userFavorites.length; i++) {
                    userFavorites[i].categoryname = categoriesId[i].categoryname;
                    userFavorites[i].isFavorite = true
                }

                res.status(200).json({ userFavorites })
            }
        }
    }
}
