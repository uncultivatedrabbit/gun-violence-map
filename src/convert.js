const csvToJson = require("convert-csv-to-json");
const csvInput = "./data/gun-violence-data_01-2013_03-2018.csv";
const outputJson = "./data/gundata.json";

csvToJson
  .fieldDelimiter(',')
  .formatValueByType()
  .generateJsonFileFromCsv(csvInput, outputJson);
