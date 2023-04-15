import koaRouter from 'koa-router';
import httpStatus from 'http-status';
import passport from "passport";

import authMiddleware from '../../middlewares/authMiddleware.js';
import UserDTO from '../../dto/user/index.js';
import JwtService from '../../services/jwt/index.js';

const router = new koaRouter();
const jwtService = new JwtService();

router.get('/auth/test', authMiddleware, (req, res) => {
    try {
        res.status(200).json({holas: "hola"});         
    } catch (error) {
        console.log(error)
    }
});

router.post('/auth/signUp', (req, res, next) => {
    passport.authenticate('signup', {session: false}, (err, user, info) => {
        try {
            if (!user) {
                return res.status(409).json({
                    success: false,
                    message: `${httpStatus[409]}: User already exists`,
                });
            }
            const userDataFormatted = new UserDTO(user).build();
            const accessToken = jwtService.generateJwt(userDataFormatted);
        
            return res.status(200).json({
              success: true,
              expiresIn: 60 * 60,
              accessToken,
              data: userDataFormatted,
            });            
            
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: `${httpStatus[500]}: Internal error`,
            });            
        }
    })(req, res, next);
});

router.post('/auth/signin', (req, res, next) => {
    passport.authenticate('login', {session: false}, (err, user, info) => {
        try{
            if (!user) {
                return res.status(403).json({
                    success: false,
                    message: `${httpStatus[403]}: Bad username or password`,
                });
            }            
            const userDataFormatted = new UserDTO(user).build();
            const accessToken = jwtService.generateJwt(userDataFormatted);

            return res.status(200).json({
                success: true,
                expiresIn: 60 * 60,
                accessToken,
            });

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: `${httpStatus[500]}: Internal error`,
            });           
        }

    })(req, res, next);
});

export default router;