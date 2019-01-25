module.exports = {
  "maxProperties" : 6,
  "minProperties" : 1,
  "properties": {
    "email" : {
      "type": "string",
      "format" : "email"
    },
    "password" : {
      "type": "string",
      "minLength": 6,
    },
    "name" : {
      "type" : "string",
    },
    "description" : {
      "type" : "string",
    },
    "siret" : {
      "type" : "string",
      "minLength": 14,
      "maxLength": 14,
    },
    "link": {
      "type": "string",
    },
  },
};
