import routesConfig from '~/config/routes';
//Layout only
import { HeaderOnly } from '~/components/Layout';

//Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';

const publicRoutes = [
    //Dùng cho router không cần đăng nhập vẫn xem được
    //Riêng upload không có layout chung(defaultLayout)
    {
        path: routesConfig.home,
        component: Home,
    },
    {
        path: routesConfig.following,
        component: Following,
    },
    {
        path: routesConfig.profile,
        component: Profile,
    },
    {
        path: routesConfig.search,
        component: Search,
        layout: null,
    },
    {
        path: routesConfig.upload,
        component: Upload,
        layout: HeaderOnly,
    },
];

const privateRoutes = [
    //Dùng cho router phải đăng nhập mới xem được
];

export { publicRoutes, privateRoutes };
