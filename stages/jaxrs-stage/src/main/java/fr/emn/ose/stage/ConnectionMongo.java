package fr.emn.ose.stage;

import com.github.jmkgreen.morphia.Datastore;
import com.github.jmkgreen.morphia.Morphia;
import com.mongodb.Mongo;
import com.mongodb.MongoClient;

import java.net.UnknownHostException;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 14/04/13
 * Time: 16:14
 * To change this template use File | Settings | File Templates.
 */
public class ConnectionMongo {

    public static Mongo getConnection() throws UnknownHostException {
        Mongo db = new MongoClient("localhost", 27017);
        return db;

    }
}
