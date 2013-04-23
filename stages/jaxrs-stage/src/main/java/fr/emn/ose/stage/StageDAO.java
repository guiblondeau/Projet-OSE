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
public class StageDAO extends BasicDAO<Stage, ObjectId>{

    public StageDAO(Morphia morphia, Mongo mongo){
        super(mongo, morphia, ConnectionDataStore.dbName);
    }

    public Stage update(Stage stage){

        // The query getting the entity to update
        Query<Stage> updateQuery = getDatastore().createQuery(Stage.class).field("id").equal(stage.getId());


        // The UpdateOperations represents what's to be modified
        UpdateOperations<Stage> updateOperations = getDatastore().createUpdateOperations(Stage.class);

        // Représente les variables d'instance de mon instance de Stage
        PropertyDescriptor[] propertyDescriptors = PropertyUtils.getPropertyDescriptors(stage);

        // Creation de l'objet updateOperations
        for(int i=0;i<propertyDescriptors.length;i++){
            PropertyDescriptor propertyDescriptor = propertyDescriptors[i];
            String attributeName = propertyDescriptor.getName();
            updateOperations = updateOperations.set(attributeName, propertyDescriptor.getValue(attributeName));
        }

        // Updating the result of the query with the UpdateOperations object :
        getDatastore().update(updateQuery, updateOperations);

        return this.get(stage.getId());
    }



}
