import koaRouter from 'koa-router';
import passport from "passport";

const router = new koaRouter();

router.use(pagesRouter)
router.use('/api', authRoutes);
router.use('/api', productsRoutes)
router.use('/api', messagesRoutes);
router.use('/api', infoRoutes)
router.use('/api', randomRoutes)

router.get('/api/auth/twitter', passport.authenticate('twitter'));
router.get('/api/auth/twitter/callback', passport.authenticate('twitter', {successRedirect: '/', failureRedirect: '/signin'}));


export default router;