import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.util.ArrayList;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

public class HTTP {
    
    private static String URL = "/KitchenMate/recipes.php"; //URL to server here!
    private static Gson gson = new Gson();
    private static boolean firstFetch = false;

    public static void saveData(Object dataToSave, String method){
        String StringJSON = gson.toJson(dataToSave);

        //System.out.println(StringJSON);
        String message = "";
        if(method.equals("Recipe")){
            message = message.concat(method);
        }
        else{
            message = message.concat(method);
        }
    
        try {
            URI serverURI = URI.create(URL + "?method=" + method);
            URL server_url = serverURI.toURL();
            HttpURLConnection connection = (HttpURLConnection) server_url.openConnection();
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);

            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = StringJSON.getBytes("utf-8");
                os.write(input);
            }

            int Response = connection.getResponseCode();

            if (Response == HttpURLConnection.HTTP_OK) {
                //System.out.println("Data successfully sent!");
                message = message.concat(" saved successfully!");

            } else {
                message = "Error! " + Response;
                //System.out.println("Error! " + Response);
            }
            connection.disconnect();
            Modal.initInfoModal(message);

        } catch (Exception e) {
            e.printStackTrace();
            Modal.initInfoModal(e.getMessage());

        }
    }

    public static ArrayList<Recipe> fetchRecipes(String method){
       
        ArrayList<Recipe> listToReturn = new ArrayList<>();

        try {
            
            URI serverURI = URI.create(URL + "?method=" + method);
            URL server_url = serverURI.toURL();
            HttpURLConnection connection = (HttpURLConnection) server_url.openConnection();
            connection.setRequestMethod("GET");

            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {

                BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;

                while ((line = br.readLine()) != null) {
                    response.append(line);
                }
                br.close();

                JsonObject jsonObject = JsonParser.parseString(response.toString()).getAsJsonObject();
                JsonArray jsonArray = jsonObject.getAsJsonArray("Data");
                System.out.println(jsonArray);

                for (JsonElement jsonElement : jsonArray) {
                    JsonObject object = jsonElement.getAsJsonObject();

                    listToReturn.add(gson.fromJson(object, Recipe.class));
                    //System.out.println(gson.fromJson(object, Recipe.class));
                }
            }
            else{
                return null;
            }
    }
    catch (Exception e) {
        Modal.initInfoModal("Error occured!" + e);
        //System.out.println("Error occured!" + e);
        return null;
    }

    if(!firstFetch){
        Modal.initInfoModal("Recipes fetched succesfully!");
        firstFetch = true;
    }

    return listToReturn;
}

public static void deleteData(int id){

    try {

        URI serverURI = URI.create(URL + "?id=" + id);
        URL server_url = serverURI.toURL();
        HttpURLConnection connection = (HttpURLConnection) server_url.openConnection();
        connection.setRequestMethod("DELETE");

        int Response = connection.getResponseCode();

        String message;
        if (Response == HttpURLConnection.HTTP_OK) {
            message = "Data successfully deleted!";
        } else {
            message = "Error! " + Response;
        }
        connection.disconnect();
        Modal.initInfoModal(message);
        //System.out.println(message);

    } catch (Exception e) {
        e.printStackTrace();
        Modal.initInfoModal("Error! " + e.getMessage());
    }
}
}

