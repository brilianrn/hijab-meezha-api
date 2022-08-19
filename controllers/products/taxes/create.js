const { errors, successMessageTypes } = require('../../../constants');
const { Tax } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');
const { NumberCheck } = require('../../../utils/check-fields');

const CreateProductTax = async (req, res, next) => {
  const { name, amount } = req.body;
  const { id } = req.currentAdmin;

  if (!name)
    return next({ name: errors['400_EMPTY_FIELD'], description: 'Tax name' });
  if (!amount)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Amount',
    });
  if (!NumberCheck(amount))
    return next({
      name: errors['400_WRONG_FIELD'],
      description: 'Amount',
    });

  try {
    const tax = await Tax.findOne({ where: { name, amount, isActive: true } });
    if (tax) {
      if (tax.name === name && tax.amount === amount) {
        return next({
          name: errors['400_EXIST_DATA'],
          description: 'Tax',
        });
      }
    }

    const newTax = await Tax.create({
      name,
      amount,
      createdBy: id,
      updatedBy: id,
    });
    if (!newTax) return next(newTax);
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.createData, 'Tax'),
          { name, amount }
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { CreateProductTax };
