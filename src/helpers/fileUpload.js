export const fileUpload = async (file) => {
    const urLcloudinary = 'https://api.cloudinary.com/v1_1/dlnupm7d8/upload';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'react-journal');

    try {
        const response = await fetch(urLcloudinary, { method: 'POST', body: formData });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data.secure_url;
        } else {
            return await response.json();
        }
    } catch (error) {
        throw error;
    }
};
