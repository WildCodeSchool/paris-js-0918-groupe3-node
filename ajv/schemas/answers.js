module.exports = {
  "maxProperties" : 4,
  "minProperties" : 3,
  "required" : ["text", "id_questions", "id_offers"],
  "properties": {
    "text" : {
      "type": "string",
    },
    "id_questions" : {
      "type": "string"
    },
    "id_offers" : {
      "type": "string",
    },
  },
};
