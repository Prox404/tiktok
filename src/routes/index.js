import { HeaderOnly } from "~/components/Layout";

import Home from "~/pages/Home";
import Following from "~/pages/Following";
import Upload from "~/pages/Upload";
import Feedback from "~/pages/Feedback";
import Profile from "~/pages/Profile";
import NotFound from "~/pages/NotFound";
import VideoModal from "~/components/VideoModal";

const publicRoutes = [
    {
        path: "/",
        component: Home
    },
    {
        path: '/@:nickname',
        component: Profile
    },
    {
        path: "/following",
        component: Following
    },
    {
        path: "/upload",
        component: Upload,
        layout: HeaderOnly
    },
    {
        path: "/feedback",
        component: Feedback,
        layout: HeaderOnly
    },
    {
        path: "/videos/:id",
        component: VideoModal,
        layout: HeaderOnly
    }
    ,
    {
        path: "*",
        component: NotFound,
        layout: HeaderOnly
    }

];

const privateRoutes = [

];
export { publicRoutes, privateRoutes }; 
