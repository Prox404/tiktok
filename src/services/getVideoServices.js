import * as request from '~/utils/axiosInstances';

export const getVideo = async (id) => {
    try {
        const res = await request.get(`videos/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}