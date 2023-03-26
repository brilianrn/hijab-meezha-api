const axios = require("axios");

const Configs = {
  url: process.env.BASE_URL_REGIONS,
  method: "GET",
};

const fetchProvinces = async () => {
  try {
    const { data } = await axios({
      ...Configs,
      url: `${Configs.url}/provinsi/get/`,
    });
    if (data.status !== 200 && !data.result)
      return { error: "Data provinces not found", data: null };
    return { error: null, data: data.result };
  } catch (error) {
    return { data: null, error };
  }
};

const fetchCities = async (provinceId) => {
  try {
    const { data } = await axios({
      ...Configs,
      url: `${Configs.url}/kabkota/get/?d_provinsi_id=${provinceId}`,
    });
    if (data.status !== 200 && !data.result)
      return { error: "Data cities not found", data: null };
    return { error: null, data: data.result };
  } catch (error) {
    return { data: null, error };
  }
};

const fetchDistricts = async (cityId) => {
  try {
    const { data } = await axios({
      ...Configs,
      url: `${Configs.url}/kecamatan/get/?d_kabkota_id=${cityId}`,
    });
    if (data.status !== 200 && !data.result)
      return { error: "Data districts not found", data: null };
    return { error: null, data: data.result };
  } catch (error) {
    return { data: null, error };
  }
};

const fetchVillages = async (districtId) => {
  try {
    const { data } = await axios({
      ...Configs,
      url: `${Configs.url}/kelurahan/get/?d_kecamatan_id=${districtId}`,
    });
    if (data.status !== 200 && !data.result)
      return { error: "Data villages not found", data: null };
    return { error: null, data: data.result };
  } catch (error) {
    return { data: null, error };
  }
};

const fetchPostCodes = async (cityId, districtId) => {
  try {
    const { data } = await axios({
      ...Configs,
      url: `${Configs.url}/kodepos/get/?d_kabkota_id=${cityId}&d_kecamatan_id${districtId}`,
    });
    if (data.status !== 200 && !data.result)
      return { error: "Data post codes not found", data: null };
    return { error: null, data: data.result };
  } catch (error) {
    return { data: null, error };
  }
};

module.exports = {
  fetchProvinces,
  fetchCities,
  fetchDistricts,
  fetchVillages,
  fetchPostCodes,
};
