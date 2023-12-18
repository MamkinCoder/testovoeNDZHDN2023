import fetchData from "./getmetrics.js";
import writeToGoogleSheets from "./sendmetrics.js";

const data = await fetchData();
console.log(data);

const spreadsheetId = "1-OtRd-11lSh3zhS0EIthUUma9cbZSAo8DxdxTuZcRvk";
const range = "Sheet1!A:B";

writeToGoogleSheets(data, spreadsheetId, range);
