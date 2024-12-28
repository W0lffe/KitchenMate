import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;

import com.google.gson.Gson;

public class HTTP {
    
    private static String URL = ""; //URL to server here!

    public static String saveRecipe(Recipe recipeToSave){
        Gson gson = new Gson();
        String StringJSON = gson.toJson(recipeToSave);
        System.out.println(StringJSON);
    
        try {
            URI serverURI = URI.create(URL + "/recipes.php");
            URL server_url = serverURI.toURL();
            HttpURLConnection connection = (HttpURLConnection) server_url.openConnection();
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);

            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = StringJSON.getBytes("utf-8");
                os.write(input);
            }

            int Response = connection.getResponseCode();

            String message;
            if (Response == HttpURLConnection.HTTP_OK) {
                //System.out.println("Data successfully sent!");
                message = "Recipe saved successfully!";
            } else {
                message = "Error! " + Response;
                //System.out.println("Error! " + Response);
            }
            connection.disconnect();
            return message;

        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    

}
