// export const base_url = "https://punaah.in:5002/";
export const base_url = "https://localhost:5002/";
export const token = localStorage.getItem('atoken');
interface ApiResponse {
    message: string;
    success: string;
}
export const getData = async (endpoint: string) => {
    try {
        const response = await fetch(base_url + 'api/v1/' + endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const postData = async <T, R>(
    endpoint: string,
    data: T
): Promise<R> => {
    const response = await fetch(`${base_url}api/v1/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const responseData: R = await response.json();
    return responseData;
};
export const postDataWithToken = async <T, R>(
    endpoint: string,
    data: T
): Promise<R> => {
    const response = await fetch(`${base_url}api/v1/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const responseData: R = await response.json();
    return responseData;
};
export const updateDataWithToken = async <T, R>(
    endpoint: string,
    data: T
): Promise<R> => {
    const response = await fetch(`${base_url}api/v1/${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const responseData: R = await response.json();
    return responseData;
};
export const formDataWithToken = async (
    endpoint: string,
    formData: FormData
): Promise<ApiResponse> => {
    // Log the token for debugging
    console.log('Token:', token);

    // Check if the token is well-formed (basic validation)
    if (!token) {
        throw new Error('Invalid Token: Token is not properly formatted');
    }

    const response = await fetch(`${base_url}api/v1/${endpoint}`, {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
};
export const formDataWithTokenUpdate = async (
    endpoint: string,
    formData: FormData
): Promise<ApiResponse> => {
    const response = await fetch(`${base_url}api/v1/${endpoint}`, {
        method: 'PUT',
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
};
export const delete_data = async (endpoint: string) => {
    try {
        const response = await fetch(`${base_url}api/v1/${endpoint}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Log the response status and response body
        console.log('Response Status:', response.status);
        const responseData = await response.json();
        console.log('Response Data:', responseData);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return responseData;
    } catch (error) {
        // Log any error that occurs
        console.error('Error:', error);
        throw error;
    }
};
