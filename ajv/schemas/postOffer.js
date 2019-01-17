module.exports = {
  "maxProperties" : 5,
  "minProperties" : 5,
  "required" : ["title", "description", "contract_type", "place", "is_published"],
  "properties": {
    "title" : {
      "type": "string",
    },
    "description" : {
      "type": "string",
    },
    "contract_type" : {
      "type" : "string",
      "pattern" : "CDI|CDD|Stage",
    },
    "place" : {
      "type" : "string",
    },
    "is_published" : {
      "type" : "string",
      "minLength": 1,
      "maxLength": 1,
      "pattern": "0|1",
    },
  },
};
