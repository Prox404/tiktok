import * as request from '~/utils/axiosInstances';
import { toast } from 'react-toastify';

export const getComment = async (id) => {
    try {
        const res = await request.get(`videos/${id}/comments`);
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error('Error while loading data. Try again later.');
        return undefined;
    }
}