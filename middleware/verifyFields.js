
export function validateFields(requiredFields) {
  return function (req, res, next) {
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `All fields are required : ${missingFields.join(', ')}`
      });
    }

    next();
  };
}

export function requireAtLeastOneField(fields) {
  return function (req, res, next) {
    const hasAtLeastOne = fields.some((field) => req.body[field] !== undefined);

    if (!hasAtLeastOne) {
      return res.status(400).json({
        error: `At least one of the following fields is required : ${fields.join(', ')}`,
      });
    }

    next();
  };
}
