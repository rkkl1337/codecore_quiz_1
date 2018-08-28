const express = require('express');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`Cookies = `, req.cookies);
    const username = req.cookies.username;
    res.locals.username = "";

    if (username) {
        res.locals.username = username;
        console.log(`Signed in as ${username}`);
    }
    next();
})



app.get('/', (req, res) => {
    res.render(`./app`);
})



const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
app.post("/sign_in", (req, res) => {
    const username = req.body.username;
    res.cookie("username", username, {maxAge: COOKIE_MAX_AGE});
    res.redirect('/cluckr/new');
})

app.post("/sign_out", (req, res) => {
    res.clearCookie('username');
    res.redirect('/');
})

const cluckrRouter = require("./routes/cluckr");

app.use("/cluckr", cluckrRouter);

const DOMAIN = 'localhost';
const PORT = '4646';
app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`);
})