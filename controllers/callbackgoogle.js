const axios = require("axios")
require("dotenv").config();

const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
const redirect_uri='https://localhost:3000/login'
const grant_type='authorization_code'

module.exports = {
    post: async (req, res) => {
        console.log("Authoriation code >>>>", req.body.authorizationCode)

        const code = req.body.authorizationCode

        const accessToken = await axios.post(
            "https://oauth2.googleapis.com/token",null,
            {
            params: {
                code,
                client_id,
                client_secret,
                redirect_uri,
                grant_type
            }, headers: {'content-type': 'application/x-www-form-urlencoded'}
        }
            )
        console.log("accessToken>>>", accessToken)

        if (!accessToken) {
            res.status(404).json( { message: "Not found accessToken" } )
        } else {
            res.status(200).json( {  accessToken: accessToken.data.access_token } )
        }
    }
}

