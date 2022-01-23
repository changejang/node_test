export const asyncWrapper = (handler) => async (req, res, next) => {
  try {
    const response = await handler(req, res, next);
    res.json({
      success: true,
      response,
    });
    next();
  } catch (err) {
    next(err);
  }
};
export default asyncWrapper;
