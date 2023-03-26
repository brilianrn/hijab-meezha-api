const {
  successMessageTypes,
  errors,
  excludeColumns,
} = require("../../constants");
const { Address } = require("../../models");
const {
  rajaOngkirProvinces,
  rajaOngkirCities,
} = require("../../services/rajaongkir.service");
const formatResponse = require("../../utils/format-response");
const { successMessages } = require("../../utils/messages-generate");

const FindAll = async (req, res, next) => {
  try {
    const { id } = req.currentUser;
    const addresses = await Address.findAll({
      where: { userId: id },
      attributes: {
        exclude: excludeColumns,
      },
      order: [["createdAt", "DESC"]],
    });
    if (!addresses.length) {
      return next({
        name: errors["404"],
        description: "Address",
      });
    }
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.findAll, "Address"),
          addresses
        )
      );
  } catch (error) {
    next(error);
  }
};

const Add = async (req, res, next) => {
  try {
    const { id } = req.currentUser;
    const { isMainAddress, provinceId, city } = req.body;
    const { data } = await rajaOngkirCities(provinceId);
    const roCity = data.filter((e) =>
      city
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(`${e.type} ${e.city_name}`.toLowerCase().replace(/\s/g, ""))
    )[0];
    if (isMainAddress) {
      const existAddress = await Address.findOne({
        where: { isMainAddress, userId: id },
      });
      if (existAddress) {
        await Address.update(
          { isMainAddress: false },
          { where: { id: existAddress.id } }
        );
      }
    }
    const address = await Address.create({
      ...req.body,
      shippingDestinationId: roCity?.city_id || "",
      userId: id,
      createdBy: id,
      updatedBy: id,
    });
    if (!address) return next(address);
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.createData, "Address"),
          address
        )
      );
  } catch (error) {
    next(error);
  }
};

const FindOne = async (req, res, next) => {
  try {
    const opt = {
      where: { id: req.params.id },
      attributes: {
        exclude: excludeColumns,
      },
    };
    const address = await Address.findOne(opt);
    if (!address) {
      return next({
        name: errors["404"],
        description: "Address",
      });
    }
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.findDetail, "Address"),
          address
        )
      );
  } catch (error) {
    next(error);
  }
};

const Update = async (req, res, next) => {
  try {
    const { id } = req.currentUser;
    const opt = { where: { id: req.params.id } };
    const { isMainAddress, provinceId, city } = req.body;
    const { data } = await rajaOngkirCities(provinceId);
    const roCity = data.filter((e) =>
      city
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(`${e.type} ${e.city_name}`.toLowerCase().replace(/\s/g, ""))
    )[0];
    const existAddress = await Address.findOne(opt);

    if (!existAddress) {
      return next({
        name: errors["404"],
        description: "Address",
      });
    }

    if (isMainAddress) {
      const mainAddress = await Address.findOne({
        where: { isMainAddress, userId: id },
      });
      if (mainAddress) {
        await Address.update(
          { isMainAddress: false },
          { where: { id: mainAddress.id } }
        );
      }
      const payload = {
        ...req.body,
        shippingDestinationId: roCity?.city_id || "",
        updatedBy: id,
      };
      const [address] = await Address.update(payload, opt);
      if (!address) return next(address);
      return res
        .status(200)
        .json(
          formatResponse(
            true,
            200,
            successMessages(successMessageTypes.updateData, "Address"),
            existAddress
          )
        );
    }
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.updateData, "Address"),
          existAddress
        )
      );
  } catch (error) {
    next(error);
  }
};

const Delete = async (req, res, next) => {
  try {
    const opt = { where: { id: req.params.id } };
    const existAddress = await Address.findOne(opt);
    if (!existAddress) {
      return next({
        name: errors["404"],
        description: "Address",
      });
    }
    if (existAddress.isMainAddress) {
      const anotherAddress = await Address.findOne({
        where: { isMainAddress: false },
      });
      if (anotherAddress) {
        await Address.update(
          { isMainAddress: true },
          { where: { id: anotherAddress.id } }
        );
      }
    }
    const address = await Address.destroy(opt);
    if (!address) return next(address);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.deleteData, "Address"),
          existAddress
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { Add, Update, FindOne, Delete, FindAll };
