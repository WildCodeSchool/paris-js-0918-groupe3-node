module.exports = {
  "minProperties" : 6,
  "required" : ["email", "name", "password", "description", "link", "siret"],
  "properties": {
    "email" : {
      "type": "string",
      "format" : "email"
    },
    "name" : {"type": "string"},
    "password" : {
      "type": "string",
      "minLength": 6,
    },
    "description": {"type": "string"},
    "link": {"type": "string"},
    "siret": {"type": "string"},
  },
};
