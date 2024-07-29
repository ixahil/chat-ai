const AsyncHandler = (fnc) => {
  return (req, res, next) => {
    fnc(req, res, next).catch((err) => next(err));
  };
};

export default AsyncHandler;
