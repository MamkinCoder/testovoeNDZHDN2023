import { readFileSync } from "fs";
import { google } from "googleapis";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const CREDENTIALS_PATH = join(__dirname, ".credentials.json");

const credentials = JSON.parse(readFileSync(CREDENTIALS_PATH, "utf8"));
const { client_email, private_key } = credentials;

const jwtClient = new google.auth.JWT(client_email, null, private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

const sheets = google.sheets({ version: "v4", auth: jwtClient });

/**
 * Writes data to Google Sheets.
 * @param {Array<Array<string | number>>} data - The data to write to the sheet.
 * @param {string} spreadsheetId - The ID of the spreadsheet.
 * @param {string} range - The A1 notation of the range to write data to.
 */
export default async function writeToGoogleSheets(data, spreadsheetId, range) {
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: data,
      },
    });

    console.log("Data successfully written to Google Sheets.");
  } catch (error) {
    console.error("Error writing to Google Sheets:", error);
  }
}
