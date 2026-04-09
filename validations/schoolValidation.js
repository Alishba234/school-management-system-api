const Joi = require("joi");

exports.addSchoolSchema = Joi.object({
  name: Joi.string().min(3).required(),
  address: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});