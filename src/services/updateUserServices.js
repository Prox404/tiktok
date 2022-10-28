import * as request from '~/utils/axiosInstances';

export const updateUser = async (formData) => {
    try {
        const res = await request.post('auth/me?_method=PATCH', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}