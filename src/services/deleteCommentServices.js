import * as request from '~/utils/axiosInstances';
import { toast } from 'react-toastify';

export const deleteComment = async (id, comment) => {
    try {
        const res = await request.del(`comments/${id}`, comment);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
        return undefined;
    }
}