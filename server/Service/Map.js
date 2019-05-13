const axios = require('axios');

module.exports = {
  ReverseGeocoding: async (locations, token, urlParts) => {
    const results = [];
    const url = (longitude, latitude) => {
      return urlParts[0] + longitude + urlParts[1] + latitude + urlParts[2] + token;
    };

    for (let i = 0; i < locations.length; i++) {
      const result = await axios(url(locations[i][0], locations[i][1]));

      results.push(result.data);
    }

    return results;
  }
};
