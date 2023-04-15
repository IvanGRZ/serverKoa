import koaRouter from 'koa-router';
import authMiddleware from '../../middlewares/authMiddleware.js';

const router = new koaRouter();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/home', authMiddleware, (req, res) => {
    res.render('home');
});

router.get('/info', (req, res) => {
    res.render('info');
});

router.get('/random', (req, res) => {
    res.render('random');
});

export default router;
