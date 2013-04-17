package fr.emn.ose.stage;

import com.github.jmkgreen.morphia.Datastore;
import com.github.jmkgreen.morphia.Morphia;
import com.mongodb.Mongo;

import java.net.UnknownHostException;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 14/04/13
 * Time: 16:41
 * To change this template use File | Settings | File Templates.
 */
public class ConnectionDataStore {

    public static Datastore createDataStore() throws UnknownHostException {
        Mongo db = ConnectionMongo.getConnection();
        Morphia morphia = new Morphia();
        morphia.map(Stage.class);
        return morphia.createDatastore(db, "essai");
    }
}
