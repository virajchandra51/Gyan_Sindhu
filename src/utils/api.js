import { base_url, api_key, org_id } from "./urls";

export const fetchDataFromApi = async (api_endpoint, api_parameter) => {
  // console.log(api_parameter);
  const options = {
    method: "GET",
  };
  // console.log(`${base_url}${api_endpoint}`+"/?apikey="+`${api_key}`+"&orgid="+`${org_id}`+"&"+`${api_parameter}`)
  const res = await fetch(
    `${base_url}${api_endpoint}` +
      "/?apikey=" +
      `${api_key}` +
      "&orgid=" +
      `${org_id}` +
      "&" +
      `${api_parameter}`,
    options
  );
  const data = await res.json();
  return data;
  // return undefined;
};

export const fetchDataFromApiWithResponse = async (
  bodyData,
  api_endpoint,
  api_parameter
) => {
  console.log(JSON.stringify(bodyData));
  const options = {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
  };
  const res = await fetch(
    `${base_url}${api_endpoint}` +
      "/?apikey=" +
      `${api_key}` +
      "&orgid=" +
      `${org_id}` +
      "&" +
      `${api_parameter}`,
    options
  );
  // console.log(`${base_url}${api_endpoint}`+"/?apikey="+`${api_key}`+"&orgid="+`${org_id}`+"&"+`${api_parameter}`)
  const data = await res.json();
  return data;
};
