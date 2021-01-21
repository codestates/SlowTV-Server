const { Categories, Contents } = require("../models")

module.exports = {
    get: async (req, res) => {

        let categoryName = req.params.name
        console.log(categoryName)
        const categoryInfo = await Categories.findOne({
            attributes: ["id"],
            where: { categoryname: categoryName }
        })

        if (!categoryInfo.id) {
            res.status(400).json({ message: "Category does not exist" })
        } else {

            const contentInfo = await Contents.findAll({
                attributes: ["id","contentname", "contentlink", "thumbnail"],
                where: { Categories_id: categoryInfo.id }
            })
            let contents = contentInfo.map(el => el.dataValues)

            res.status(200).json({ contents })
        }
    }
}
