import { API_URL } from "./urls";

export const fetchDataFromApi = async (endpoint) => {
    // console.log(endpoint);

    const options = {
        method: "GET",
    };
    const res = await fetch(`${API_URL}${endpoint}`, options);
    const data = await res.json();
    // console.log(data)
    return data;
};