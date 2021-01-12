const express = require("express");
const session = require("express-session");
const fs = require('fs');
//const path = require('path');
const https = require('https');
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const router = require("./routes");
require("dotenv").config();

app.use(
    session({
        secret: "djfkladfj", // ssl 암호화에 쓰일 salt 
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 24 * 6 * 60 * 10000, // sec
            sameSite: "none", // none으로 설정하면 secure 강제됨, none은 모든 요청 >서버 -> 클라이언트 보내주는데 안전한가?
            httpOnly: true, // No JS
            secure: true, // HTTPS Protocol
        },
    })
);

app.use(morgan("dev"));

app.use(express.json()); // 내장된 바디파서
app.use(express.urlencoded({ extended: false }));

app.use(
    cors({
        origin: true, // 배포된  도메인 주소를 넣으면 더 안전할 것 같음.
        method: "GET,POST,OPTION",
        credentials: true, // 쿠키를 요청에 포함
    })
);

app.use("/", router);

//https
    // .createServer(
    //     {
    //         key: fs.readFileSync(__dirname + "/key.pem", "utf-8"),
    //         cert: fs.readFileSync(__dirname + "/cert.pem", "utf-8"),
    //     },
        app
    //)
    .listen(80, () => {
        console.log("server on 80");
    });