export const validation = (joiSchema) => {
  return (req, res, next) => {
    const AllDataAllMethods = { ...req.body, ...req.params, ...req.query };
    const validationResult = joiSchema.validate(AllDataAllMethods, {
      abortEarly: false,
    });
    if (validationResult.error) {
      return res.json({
        Message: "validationError",
        validationError: validationResult.error.details,
      });
    }
   return next();
  };
};
