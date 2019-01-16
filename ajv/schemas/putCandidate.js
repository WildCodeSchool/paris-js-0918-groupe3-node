module.exports = {
  "maxProperties" : 3,
  "minProperties" : 1,
  "properties": {
    "email" : {
      "type": "string",
      "format" : "email"
    },
    "phone" : {"type": "string"},
    "password" : {
      "type": "string",
      "minLength": 6,
    },
  },
};
