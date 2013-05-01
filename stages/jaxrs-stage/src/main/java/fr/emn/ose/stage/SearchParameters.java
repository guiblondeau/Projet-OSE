package fr.emn.ose.stage;

import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 01/05/13
 * Time: 12:16
 * To change this template use File | Settings | File Templates.
 */
public class SearchParameters {

    private List<String> and, or;

    public SearchParameters(){
        this.and = new ArrayList<String>();
        this.or = new ArrayList<String>();
    }

    public List<String> getAnd() {
        return and;
    }

    public void setAnd(List<String> and) {
        this.and = and;
    }

    public List<String> getOr() {
        return or;
    }

    public void setOr(List<String> or) {
        this.or = or;
    }

    public static SearchParameters getDefault(){
        List<String> and = new ArrayList<String>();
        List<String> or = new ArrayList<String>();
        or.add("salaire");
        or.add("option");
        or.add("intitule");
        or.add("description");
        or.add("adresse");
        or.add("avantage");

        and.add("pays");
        and.add("domaine");
        and.add("langue");

        SearchParameters toRet = new SearchParameters();
        toRet.setAnd(and);
        toRet.setOr(or);

        return toRet;
    }
}
