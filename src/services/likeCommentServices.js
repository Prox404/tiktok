import * as request from '~/utils/axiosInstances';

export const likeComment = async (id) => {
    try {
        const res = await request.post(`comments/${id}/like`);
        return res.data;
    } catch (error) {
        console.log(error);
        console.log('Something went wrong');
        return undefined;
    }
}