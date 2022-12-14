import * as request from '~/utils/axiosInstances';
import { toast } from 'react-toastify';

export const updateUser = async (formData) => {
    try {
        const res = await request.post('auth/me?_method=PATCH', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        toast.success('Cập nhật thông tin thành công');
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error('Cập nhật thông tin thất bại');
        return undefined;
    }
}