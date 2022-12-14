import * as request from '~/utils/axiosInstances';
import { toast } from 'react-toastify';

export const followUser = async (id) => {
    try {
        const res = await request.post(`users/${id}/follow`, id);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        return undefined;
    }
}