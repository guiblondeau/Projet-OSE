package fr.emn.ose.queries;

import com.github.jmkgreen.morphia.query.Query;
import fr.emn.ose.stage.Stage;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 01/05/13
 * Time: 17:17
 * To change this template use File | Settings | File Templates.
 */
public class AdresseQuery extends StageQuery {
    /**
     * @param name The name of the field
     */
    public AdresseQuery(String name, Query query, Stage stage) {
        super(name, query);
        this.criteria = fieldEnd.contains(stage.getAdresse());
    }
}
