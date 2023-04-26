const AddTaxToPrice = (tax = 0, price) => {
  if (tax) {
    const taxPrice = Math.round((tax / 100) * price);
    return taxPrice + price;
  }
  return price;
};

const AddPromoToPrice = (promo = 0, price) => {
  if (promo) {
    const promoPrice = Math.round((promo / 100) * price);
    return price - promoPrice;
  }
  return price;
};

module.exports = { AddTaxToPrice, AddPromoToPrice };
