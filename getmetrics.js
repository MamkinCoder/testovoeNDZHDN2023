const API_URL = "https://api-metrika.yandex.net/stat/v1/data";
const OAUTH_TOKEN = process.env.OAUTH_TOKEN;
const COUNTER_ID = process.env.COUNTER_ID;

export default async function fetchData() {
  console.log("trying to fetch");
  try {
    const response = await fetch(
      `${API_URL}?ids=${COUNTER_ID}&metrics=ym:s:visits&dimensions=ym:s:date&date1=2023-08-01&date2=2023-12-18`,
      {
        headers: {
          Authorization: `OAuth ${OAUTH_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    const formattedData = formatDataForGoogle(data.data);

    return formattedData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function formatDataForGoogle(data) {
  let result = [["Date", "Visits"]];
  data.forEach((item) => {
    result.push([item.dimensions[0].name, item.metrics[0]]);
  });
  return result;
}
