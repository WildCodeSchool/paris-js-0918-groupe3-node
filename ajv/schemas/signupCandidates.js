module.exports = {
  "maxProperties" : 3,
  "minProperties" : 3,
  "required" : ["email", "phone", "password"],
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
