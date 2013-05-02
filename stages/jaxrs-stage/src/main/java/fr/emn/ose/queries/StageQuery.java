package fr.emn.ose.queries;

import com.github.jmkgreen.morphia.query.Criteria;
import com.github.jmkgreen.morphia.query.CriteriaContainerImpl;
import com.github.jmkgreen.morphia.query.FieldEnd;
import com.github.jmkgreen.morphia.query.Query;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 01/05/13
 * Time: 17:09
 * To change this template use File | Settings | File Templates.
 */
public abstract class StageQuery {

    protected FieldEnd<? extends CriteriaContainerImpl> fieldEnd;
    protected Criteria criteria;

    /**
     *
     * @param name  The name of the field
     */
    public  StageQuery(String name, Query query){
        this.fieldEnd =  query.criteria(name);
    }

    public Criteria getCriteria(){
        return this.criteria;
    }
}
