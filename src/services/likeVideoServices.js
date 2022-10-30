import * as request from '~/utils/axiosInstances';

export const likePost = async (id) => {
    try {
        const res = await request.post(`videos/${id}/like`, id);
        return res.data;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}