import * as request from '~/utils/axiosInstances';

export const getUser = async (pathname) => {
    try {
        const res = await request.get(`users${pathname}`);
        return res.data;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}