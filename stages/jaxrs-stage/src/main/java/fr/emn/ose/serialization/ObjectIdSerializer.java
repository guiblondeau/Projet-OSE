package fr.emn.ose.serialization;

import com.mongodb.util.JSONSerializers;
import fr.emn.ose.stage.Stage;
import net.sf.json.JSON;
import net.sf.json.JSONObject;
import org.bson.types.ObjectId;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.SerializerProvider;
import org.codehaus.jackson.map.JsonSerializer;
import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 24/04/13
 * Time: 09:04
 * To change this template use File | Settings | File Templates.
 */
public class ObjectIdSerializer extends JsonSerializer<ObjectId> {


    @Override
    public void serialize(ObjectId objectId, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
        jsonGenerator.writeString(objectId.toString());
    }
}
