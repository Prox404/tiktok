import * as request from '~/utils/axiosInstances';
import { toast } from 'react-toastify';

export const comment = async (id, comment) => {
    try {
        const res = await request.post(`videos/${id}/comments`, comment);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
        return undefined;
    }
}