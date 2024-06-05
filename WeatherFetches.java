import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;

public class WeatherFetches {
    private static final String API_KEY = "0ca54907e4324db4839230610240306";
    private static final String LOCATION = " 12.5776539,106.9323369";

    public static String getWeatherForecast() throws IOException {
        String url = String.format("http://api.weatherapi.com/v1/forecast.json?key=%s&q=%s&days=1", API_KEY, LOCATION);
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder().url(url).build();
        Response response = client.newCall(request).execute();

        if (!response.isSuccessful())
            throw new IOException("Unexpected code " + response);

        String responseData = response.body().string();
        JSONObject json = new JSONObject(responseData);

//         Parsing example: Extracting the main weather description
        JSONObject current = json.getJSONObject("current");
        String weatherDescription = current.getJSONObject("condition").getString("text");
        double temperature = current.getDouble("temp_c");

        return String.format("Weather: %s, Temperature: %.2f°C", weatherDescription, temperature);
    }

    public static void main(String[] args) {
        try {
            String forecast = getWeatherForecast();
            System.out.println(forecast);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
