import Joi from "joi";

const urlRegex = /^(https?:\/\/.+)$|(^.*\.(png|jpg|jpeg|gif|webp|svg))$/i;

const editCardSchema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string()
        .regex(/^0[0-9]{1,2}-?\s?[0-9]{7}$/)
        .message('card "phone" must be a valid phone number')
        .required(),
    email: Joi.string()
        .regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
        .message('card "email" must be a valid email')
        .required(),
    web: Joi.string()
        .regex(urlRegex)
        .message('card "web" must be a valid URL')
        .allow(""), // Allow empty string if the website is optional
    image: Joi.object({
        url: Joi.string()
            .regex(urlRegex)
            .message('card.image "url" must be a valid URL')
            .allow(""),
        alt: Joi.string().min(2).max(256).allow(""),
    }).required(),
    address: Joi.object({
        state: Joi.string().allow(""),
        country: Joi.string().min(2).max(256).required(),
        city: Joi.string().min(2).max(256).required(),
        street: Joi.string().min(2).max(256).required(),
        houseNumber: Joi.number().required(),
        zip: Joi.number().allow(""), // Allow empty string if ZIP code is optional
    }).required(),
});

export default editCardSchema;
