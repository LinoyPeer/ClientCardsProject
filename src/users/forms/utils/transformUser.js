export const normalizeUser = (flatUser) => ({
  "name": {
    "first": flatUser.first,
    "middle": flatUser.middle || "",
    "last": flatUser.last,
  },
  "phone": flatUser.phone,
  "email": flatUser.email,
  "password": flatUser.password,
  "image": {
    "url": flatUser.url || "",
    "alt": flatUser.alt || "",
  },
  "address": {
    "state": flatUser.state || "",
    "country": flatUser.country,
    "city": flatUser.city,
    "street": flatUser.street,
    "houseNumber": flatUser.houseNumber,
    "zip": flatUser.zip,
  },
  "isBusiness": flatUser.isBusiness,
})

export const flattenUser = (normalizedUser) => ({
  first: normalizedUser.name.first,
  middle: normalizedUser.name.middle,
  last: normalizedUser.name.last,
  phone: normalizedUser.phone,
  url: normalizedUser.image.url,
  alt: normalizedUser.image.alt,
  state: normalizedUser.address.state,
  country: normalizedUser.address.country,
  city: normalizedUser.address.city,
  street: normalizedUser.address.street,
  houseNumber: normalizedUser.address.houseNumber,
  zip: normalizedUser.address.zip,
});