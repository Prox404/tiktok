import { HeaderOnly } from "~/components/Layout";

import Home from "~/pages/Home";
import Following from "~/pages/Following";
import Upload from "~/pages/Upload";
import Feedback from "~/pages/Feedback";

const publicRoutes = [
    {
        path: "/",
        component: Home
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
    }
];

const privateRoutes = [

];
export { publicRoutes, privateRoutes }; 
