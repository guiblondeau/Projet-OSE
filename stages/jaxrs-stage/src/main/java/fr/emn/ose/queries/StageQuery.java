package fr.emn.ose.queries;

import com.github.jmkgreen.morphia.query.Criteria;
import com.github.jmkgreen.morphia.query.CriteriaContainerImpl;
import com.github.jmkgreen.morphia.query.FieldEnd;
import com.github.jmkgreen.morphia.query.Query;
import fr.emn.ose.stage.Stage;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 01/05/13
 * Time: 17:09
 * To change this template use File | Settings | File Templates.
 */
public abstract class StageQuery {

    protected FieldEnd<? extends CriteriaContainerImpl> fieldEnd;
    protected Criteria criteria=null;
    protected Stage stage;
    protected Query<Stage> query;

    /**
     *
     * @param name  The name of the field
     */
    public  StageQuery(String name, Query query, Stage stage) throws ChampNullException {
        this.stage = stage;
        this.query = query;
        this.fieldEnd =  query.criteria(name);
        if(this.getChamp()!=null && !this.getChamp().equals("")){
            this.setCriteria();
        }
        else{
            throw new ChampNullException();
        }



    }

    public Criteria getCriteria(){
        return this.criteria;
    }

    protected abstract String getChamp();

    protected abstract void setCriteria();
}
