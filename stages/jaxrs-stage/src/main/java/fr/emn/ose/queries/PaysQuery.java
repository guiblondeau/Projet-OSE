package fr.emn.ose.queries;

import com.github.jmkgreen.morphia.query.Criteria;
import com.github.jmkgreen.morphia.query.Query;
import com.github.jmkgreen.morphia.query.QueryImpl;
import fr.emn.ose.stage.Stage;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 01/05/13
 * Time: 17:14
 * To change this template use File | Settings | File Templates.
 */
public class PaysQuery extends StageQuery {

    /**
     * @param name The name of the field
     */
    public PaysQuery(String name, Query query, Stage stage) throws ChampNullException {
        super(name, query, stage);


    }

    @Override
    protected String getChamp() {
        return stage.getPays();  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    protected void setCriteria() {
        this.criteria = fieldEnd.containsIgnoreCase(this.getChamp());
    }


}
