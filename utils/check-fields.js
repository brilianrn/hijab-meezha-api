const UuidCheck = (uuid) => {
  const regex = new RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  );
  return regex.test(uuid);
};

const NumberCheck = (num) => {
  if (typeof num !== 'number') return false;
  const regex = new RegExp(/^[0-9]*\.?[0-9]*$/);
  return regex.test(num);
};

module.exports = { UuidCheck, NumberCheck };
