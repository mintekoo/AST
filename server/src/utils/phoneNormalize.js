//utils/phoneNormalize.js
export const normalizePhone = phone => {
  if (!phone) return '';
  if (phone.startsWith('09')) {
    phone = phone.replace(/^09/, '2519');
  } else if (phone.startsWith('07')) {
    phone = phone.replace(/^07/, '2517');
  } else if (phone.startsWith('+251')) {
    phone = phone.replace(/^\+251/, '251');
  } else if (!phone.startsWith('251')) {
    throw new Error('Phone number must start with 09, 07, or +251');
  }
  if (!phone.match(/^251(9|7)\d{7,8}$/))
    throw new Error('Phone must be in format 251[9|7]xxxxxxxx[x]');

  return '+' + phone;
};

export const stripPlus = phone => {
  console.log('phone', phone);
  if (!phone) return '';
  if (phone.startsWith('09')) {
    phone = phone.replace(/^09/, '2519');
  } else if (phone.startsWith('07')) {
    phone = phone.replace(/^07/, '2517');
  } else if (phone.startsWith('+251')) {
    phone = phone.replace(/^\+251/, '251');
  } else if (!phone.startsWith('251')) {
    throw new Error('Phone number must start with 09, 07, or 251');
  }
  if (!phone.match(/^251(9|7)\d{7,8}$/))
    throw new Error('Phone must be in format 251[9|7]xxxxxxxx[x]');
  return phone;
};
