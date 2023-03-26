const { successMessageTypes, errors } = require("../../constants");
const {
  fetchProvinces,
  fetchCities,
  fetchDistricts,
  fetchVillages,
  fetchPostCodes,
} = require("../../services/regions.service");
const formatResponse = require("../../utils/format-response");
const { successMessages } = require("../../utils/messages-generate");

const FindAllProvinces = async (_, res, next) => {
  try {
    const { data, error } = await fetchProvinces();
    if (error && !data) {
      return next({
        name: errors["404"],
        description: "Provinces",
      });
    }
    return res.status(200).json(
      formatResponse(
        true,
        200,
        successMessages(successMessageTypes.findAll, "Provinces"),
        data.map((e) => ({
          value: e.id,
          label: e.text,
        }))
      )
    );
  } catch (error) {
    next(error);
  }
};

const FindAllCities = async (req, res, next) => {
  try {
    const { provinceId } = req.params;
    const { data, error } = await fetchCities(provinceId);
    if (error && !data) {
      return next({
        name: errors["404"],
        description: "Cities",
      });
    }
    return res.status(200).json(
      formatResponse(
        true,
        200,
        successMessages(successMessageTypes.findAll, "Cities"),
        data.map((e) => ({
          value: e.id,
          label: e.text,
        }))
      )
    );
  } catch (error) {
    next(error);
  }
};

const FindAllDistricts = async (req, res, next) => {
  try {
    const { cityId } = req.params;
    const { data, error } = await fetchDistricts(cityId);
    if (error && !data) {
      return next({
        name: errors["404"],
        description: "Districts",
      });
    }
    return res.status(200).json(
      formatResponse(
        true,
        200,
        successMessages(successMessageTypes.findAll, "Districts"),
        data.map((e) => ({
          value: e.id,
          label: e.text,
        }))
      )
    );
  } catch (error) {
    next(error);
  }
};

const FindAllVillages = async (req, res, next) => {
  try {
    const { districtId } = req.params;
    const { data, error } = await fetchVillages(districtId);
    if (error && !data) {
      return next({
        name: errors["404"],
        description: "Villages",
      });
    }
    return res.status(200).json(
      formatResponse(
        true,
        200,
        successMessages(successMessageTypes.findAll, "Villages"),

        data.map((e) => ({
          value: e.id,
          label: e.text,
        }))
      )
    );
  } catch (error) {
    next(error);
  }
};

const FindAllPostCodes = async (req, res, next) => {
  try {
    const { cityId, districtId } = req.params;
    const { data, error } = await fetchPostCodes(cityId, districtId);
    if (error && !data) {
      return next({
        name: errors["404"],
        description: "Post Codes",
      });
    }
    return res.status(200).json(
      formatResponse(
        true,
        200,
        successMessages(successMessageTypes.findAll, "Post Codes"),

        data.map((e) => ({
          value: e.id,
          label: e.text,
        }))
      )
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  FindAllProvinces,
  FindAllCities,
  FindAllDistricts,
  FindAllVillages,
  FindAllPostCodes,
};
