const axios = require("axios");

const Configs = {
  url: process.env.BASE_URL_RAJA_ONGKIR,
  method: "GET",
  headers: {
    key: process.env.API_KEY_RAJA_ONGKIR,
  },
};

const rajaOngkirProvinces = async () => {
  try {
    const { data } = await axios({
      ...Configs,
      url: `${Configs.url}/province`,
    });
    if (
      !data.rajaongkir.results.length &&
      data.rajaongkir.status.code !== 200
    ) {
      throw new Error(JSON.stringify(data));
    }
    return { error: null, data: data.rajaongkir.results };
  } catch (error) {
    return { data: null, error };
  }
};

const rajaOngkirCities = async (provinceId) => {
  try {
    const { data } = await axios({
      ...Configs,
      url: `${Configs.url}/city?province=${provinceId}`,
    });
    if (
      !data.rajaongkir.results.length &&
      data.rajaongkir.status.code !== 200
    ) {
      throw new Error(JSON.stringify(data));
    }
    return { error: null, data: data.rajaongkir.results };
  } catch (error) {
    return { data: null, error };
  }
};

const rajaOngkirShippingPrices = async ({
  origin = "409",
  destination,
  weight = "1100",
  courier,
}) => {
  try {
    const { data } = await axios({
      ...Configs,
      url: `${Configs.url}/cost`,
      method: "POST",
      data: { origin, destination, weight, courier },
    });
    if (
      !data.rajaongkir.results.length &&
      data.rajaongkir.status.code !== 200
    ) {
      throw new Error(JSON.stringify(data));
    }
    return { error: null, data: data.rajaongkir.results[0] };
  } catch (error) {
    return { data: null, error };
  }
};

module.exports = {
  rajaOngkirProvinces,
  rajaOngkirCities,
  rajaOngkirShippingPrices,
};
