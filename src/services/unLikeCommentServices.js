import * as request from '~/utils/axiosInstances';

export const unLikeComment = async (id) => {
    try {
        const res = await request.post(`comments/${id}/unlike`, id);
        return res.data;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}