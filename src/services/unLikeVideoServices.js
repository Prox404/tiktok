import * as request from '~/utils/axiosInstances';

export const unLikePost = async (id) => {
    try {
        const res = await request.post(`videos/${id}/unlike`, id);
        return res.data;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}