import * as request from '~/utils/axiosInstances';

export const unFollowUser = async (id) => {
    try {
        const res = await request.post(`users/${id}/unfollow`, id);
        return res.data;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}