import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import json from "koa-json";
import mongooseConnect from './src/services/models/connect.js';
import cookieParser from 'cookie-parser';
import session from "koa-session";
import passport from "koa-passport";
import { Strategy as LocalStrategy} from 'passport-local'
import { Strategy as TwitterStrategy} from 'passport-twitter'
import _ from "lodash";
import md5 from "md5";
import { AuthDao } from "./src/daos/index.js";
import router from './src/routes/index.js'


const app = new Koa();
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'default';

app.use(bodyparser());
app.use(json());

mongooseConnect();

app.use(cookieParser(COOKIE_SECRET));


app.use(session({
    store: MongoStore.create(getStoreConfig()),
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false
    }
}));

passport.use('twitter', new TwitterStrategy({
    consumerKey:"DH98IJEVZjecdPig5BRdiEG5U",
    consumerSecret: "g2CsuAfcOKRB8gx5JFg55GmwT6sbqBZjB6vtgUu0QgsuSfKNI0",
    callbackURL: "http://localhost:3005/auth/twitter/callback"
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
}));

passport.use('login' ,new LocalStrategy(async (username, password, done) => {
    const user = await AuthDao.login(username, md5(password))

    if(!user){
        return done(null, false);
    }
    else{
        return done(null, user)
    }
}));

passport.use('signup', new LocalStrategy({ passReqToCallback: true},
    async (req, username, password, done) => {

        if (_.isNil(username) || _.isNil(password) || _.isNil(req.body.name)) {
            return res.status(400).json({
              success: false,
              message: `${httpStatus[400]}: Username, password or name missing`,
            });
        }

        else {
            const existUser = await AuthDao.signUp(
                username, 
                md5(password), 
                req.body.address, 
                req.body.age, 
                req.body.picture,
                req.body.name, 
                req.body.phone,
            );
            if(typeof existUser == 'boolean'){
                return done(null, false);
            }
            else{
                return done(null, existUser);
            }
        }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await AuthDao.findById(id)
    done(null, user);
});

app.use(router);



export default app;