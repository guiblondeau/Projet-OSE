package fr.emn.ose.stage;

import com.github.jmkgreen.morphia.Morphia;
import com.github.jmkgreen.morphia.dao.BasicDAO;
import com.github.jmkgreen.morphia.query.Query;
import com.github.jmkgreen.morphia.query.UpdateOperations;
import com.mongodb.Mongo;
import org.apache.commons.beanutils.PropertyUtils;
import org.bson.types.ObjectId;


import java.beans.PropertyDescriptor;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 23/04/13
 * Time: 15:05
 * To change this template use File | Settings | File Templates.
 */
public class StageDAO extends BasicDAO<Stage, ObjectId> {

    public StageDAO(Morphia morphia, Mongo mongo) {
        super(mongo, morphia, ConnectionDataStore.dbName);
    }






}
