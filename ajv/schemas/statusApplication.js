module.exports = {
  "maxProperties" : 3,
  "minProperties" : 3,
  "required" : ["id_offers", "id_candidates", "status"],
  "properties": {
    "id_offers" : {
      "type": ["number","string"],
    },
    "id_candidates" : {
      "type": ["number","string"],
    },
    "status": {
      "type": "string",
      "pattern": "validated|rejected",
    }
  },
};
