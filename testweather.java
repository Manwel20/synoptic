import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
public class testweather {


    public static String getWeatherForecast() throws IOException {
        String latitude = "21.0285";
        String longitude = "105.8542";
        String API_KEY = "0ca54907e4324db4839230610240306";
        int numberOfForcastDays = 7;

        String url = String.format("https://api.weatherapi.com/v1/forecast.json?key=%s&q=%s,%s&days=%d", API_KEY, latitude, longitude, numberOfForcastDays);

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder().url(url).build();
        Response response = client.newCall(request).execute();

        if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);

        String responseData = response.body().string();
        JSONObject json = new JSONObject(responseData);

        // Extracting weather forecast for the specified number of days
        JSONArray forecastDay = json.getJSONObject("forecast").getJSONArray("forecastday");
        JSONObject alerts = json.optJSONObject("alerts");
        StringBuilder forecastBuilder = new StringBuilder();

        for (int i = 0; i < forecastDay.length(); i++) {
            JSONObject day = forecastDay.getJSONObject(i).getJSONObject("day");
            String date = forecastDay.getJSONObject(i).getString("date");
            double maxTemp = day.getDouble("maxtemp_c");
            double minTemp = day.getDouble("mintemp_c");
            double avgWindSpeed = day.getDouble("maxwind_kph");
            String condition = day.getJSONObject("condition").getString("text");

            forecastBuilder.append(String.format("Date: %s, Max Temp: %.0f°C, Avg Wind Speed: %.0f kph, Condition: %s\n", date, (maxTemp + minTemp)/2, avgWindSpeed, condition));
        }
        // in case of a storm this is a warning system
        if (alerts != null && alerts.length() > 0) {
            forecastBuilder.append("Storm Warnings:\n");

            for (int i = 0; i < alerts.length(); i++) {
                JSONObject alert = alerts.getJSONObject(String.valueOf(i));
                String alertTitle = alert.getString("title");
                String alertDesc = alert.getString("desc");
                forecastBuilder.append(String.format("Alert: %s, Description: %s\n", alertTitle, alertDesc));
            }
        } else {
            forecastBuilder.append("No storm warnings today.");
        }

        return forecastBuilder.toString();
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
