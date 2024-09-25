import Joi from "joi";

const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/i;

const cardSchema = {
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string()
        .ruleset.regex(/^0[0-9]{1,2}-?\s?[0-9]{7}$/)
        .rule({ message: 'card "phone" must be a valid phone number' })
        .required(),
    email: Joi.string().ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
        .rule({ message: 'card "email" must be a valid email' })
        .required(),
    webUrl: Joi.string()
        .ruleset.regex(urlRegex)
        .rule({ message: 'card "web" must be a valid URL' })
        .allow(""),
    imageUrl: Joi.string()
        .ruleset.regex(urlRegex)
        .rule({ message: 'card.image "url" must be a valid URL' })
        .allow(""),
    imageAlt: Joi.string().min(2).max(256).allow(""),
    state: Joi.string().allow(""),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().required(),
    zip: Joi.number(),
};

export default cardSchema;
