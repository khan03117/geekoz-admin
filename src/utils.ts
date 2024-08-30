import { useNavigate } from 'react-router-dom';
export const getToken = () => localStorage.getItem('atoken');
export const base_url = "https://punaah.in:5002/";
// export const base_url = "https://localhost:5002/";
export const token = localStorage.getItem('atoken');
interface ApiResponse {
    message: string;
    success: string;
}
const handleResponse = async (response: Response, navigate: ReturnType<typeof useNavigate>) => {
    if (response.status === 401) {
        // Token might be expired, redirect to login
        localStorage.removeItem('atoken');
        navigate('/login');
        throw new Error('Token expired, redirecting to login');
    }

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
};

export const getData = async (endpoint: string, navigate: ReturnType<typeof useNavigate>) => {
    try {
        const atoken = getToken()
        const response = await fetch(base_url + 'api/v1/' + endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${atoken}`
            },
        });
        return await handleResponse(response, navigate);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const postData = async <T, R>(
    endpoint: string,
    data: T
): Promise<R> => {
    try {

        const response = await fetch(`${base_url}api/v1/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const respo = await response.json();
        return respo;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const postDataWithToken = async <T, R>(
    endpoint: string,
    data: T,
    navigate: ReturnType<typeof useNavigate>
): Promise<R> => {
    try {
        const atoken = getToken();
        const response = await fetch(`${base_url}api/v1/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${atoken}`
            },
            body: JSON.stringify(data)
        });
        return await handleResponse(response, navigate);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateDataWithToken = async <T, R>(
    endpoint: string,
    data: T,
    navigate: ReturnType<typeof useNavigate>
): Promise<R> => {
    try {
        const atoken = getToken();
        const response = await fetch(`${base_url}api/v1/${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${atoken}`
            },
            body: JSON.stringify(data)
        });
        return await handleResponse(response, navigate);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const formDataWithToken = async (
    endpoint: string,
    formData: FormData,
    navigate: ReturnType<typeof useNavigate>
): Promise<ApiResponse> => {
    try {
        const atoken = getToken();
        const response = await fetch(`${base_url}api/v1/${endpoint}`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${atoken}`
            }
        });
        return await handleResponse(response, navigate);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const formDataWithTokenUpdate = async (
    endpoint: string,
    formData: FormData,
    navigate: ReturnType<typeof useNavigate>
): Promise<ApiResponse> => {
    try {
        const atoken = getToken();
        const response = await fetch(`${base_url}api/v1/${endpoint}`, {
            method: 'PUT',
            body: formData,
            headers: {
                Authorization: `Bearer ${atoken}`
            }
        });
        return await handleResponse(response, navigate);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const delete_data = async (endpoint: string, navigate: ReturnType<typeof useNavigate>) => {
    try {
        const atoken = getToken();
        const response = await fetch(`${base_url}api/v1/${endpoint}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${atoken}`
            }
        });

        return await handleResponse(response, navigate);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
