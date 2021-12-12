import { Router } from 'wxapp-router';
const router = new Router();
router.register({
    path:'/address',
    route:'/miniprogram/pages/address/address'
})
router.register({
    path:'/addAddress',
    route:'/miniprogram/pages/address/addAddress/addAddress'
})
router.register({
    path:'/wallet',
    route:'/miniprogram/pages/wallet/wallet'
})

router.register({
    path:'/collection',
    route:'/miniprogram/pages/collection/collection'
})

export default router