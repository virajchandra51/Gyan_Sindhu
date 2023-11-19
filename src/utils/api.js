import { API_URL, api_key, org_id } from "./urls";

export const fetchDataFromApi = async (type, endpoint) => {
    // console.log(endpoint);
    const options = {
        method: "GET",
    };
    console.log(`${API_URL}${type}${api_key}${org_id}${endpoint}`)
    const res = await fetch(`${API_URL}${type}${api_key}${org_id}${endpoint}`, options);
    const data = await res.json();
    return data;
    // return undefined;
};