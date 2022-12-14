import * as request from '~/utils/axiosInstances';

export const likePost = async (id) => {
    try {
        const res = await request.post(`videos/${id}/like`);
        return res.data;
    } catch (error) {
        console.log(error);
        console.log('Something went wrong');
        return undefined;
    }
}