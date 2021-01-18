const axios = require("axios")
require("dotenv").config();

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;

module.exports = {
    post: async (req, res) => {
        console.log("Authoriation code >>>>", req.body.authorizationCode)

        const code = req.body.authorizationCode

        const accessToken = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id,
                client_secret,
                code
            },
            {
                headers: { accept: "application/json", }
            });
        console.log("accessToken>>>", accessToken)

        if (!accessToken) {
            res.status(404).json( { message: "Not found accessToken" } )
        } else {
            res.status(200).json( {  accessToken: accessToken.data.access_token } )
        }
    }
}