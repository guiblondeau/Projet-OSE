package fr.emn.ose.queries;

import com.github.jmkgreen.morphia.query.Query;
import fr.emn.ose.stage.Stage;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 01/05/13
 * Time: 17:23
 * To change this template use File | Settings | File Templates.
 */
public class SalaireQuery extends StageQuery {
    /**
     * @param name The name of the field
     */
    public SalaireQuery(String name, Query query, Stage stage) throws ChampNullException {
        super(name, query, stage);
    }

    @Override
    public String getChamp(){
        return this.stage.getSalaire();
    }

    @Override
    protected void setCriteria(){
        this.criteria = fieldEnd.greaterThanOrEq(this.getChamp());
    }
}
