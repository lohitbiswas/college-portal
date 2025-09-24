const redisClient = require('../config/redisConfig');


const cacheMiddleware = (keyPrefix) => {
  return (req, res, next) => {
    const { id } = req.params;
    const cacheKey = `${keyPrefix}:${id}`;

    redisClient.get(cacheKey, (err, data) => {
      if (err) {
        console.error('Redis Error:', err);
        return next(); // Skip the cache if there's an error
      }
      if (data) {
        res.status(200).json(JSON.parse(data)); 
      } else {
        next(); // Proceed to the controller if cache is empty
      }
    });
  };
};

module.exports = cacheMiddleware;
