module.exports = {
  "maxProperties" : 1,
  "minProperties" : 1,
  "required" : ["is_sent"],
  "properties": {
    "is_sent" : {
      "type": "string",
      "minLength": 1,
      "maxLength": 1,
      "pattern": "0|1",
    },
  },
};
