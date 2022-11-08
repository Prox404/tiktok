import * as request from '~/utils/axiosInstances';
import { toast } from 'react-toastify';

export const upload = async (formData) => {
    try {
        const res = await request.post('videos', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        toast.success('Upload video thành công');
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error('Upload video failed');
        return undefined;
    }
}