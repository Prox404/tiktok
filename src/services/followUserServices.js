import * as request from '~/utils/axiosInstances';

export const followUser = async (id) => {
    try {
        const res = await request.post(`users/${id}/follow`, id);
        return res.data;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}