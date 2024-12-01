export async function GET(req, res) {
  // Log that the API is being accessed
  console.log("in the weather API page");

  try {
    // Fetch data from the external weather API
    const res2 = await fetch('https://api.weatherapi.com/v1/current.json?key=043454a0665c4c34a7f135617230911&q=Dublin&aqi=no');

    // Parse the JSON response
    const data = await res2.json();

    // Log the current temperature to the console
    console.log(data.current.temp_c);

    // Get the current temperature from the response
    let currentTemp = data.current.temp_c;

    // Send the temperature data back in the response
    return new Response(JSON.stringify({ temp: currentTemp }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return new Response(JSON.stringify({ error: "Unable to fetch weather data" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
