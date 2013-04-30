package fr.emn.ose.stage;

import java.util.HashMap;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 30/04/13
 * Time: 17:20
 * To change this template use File | Settings | File Templates.
 */
public class SearchParameters {

    public enum LOGICAL_LINK {AND, OR};

    private HashMap<String, LOGICAL_LINK> table;

    public SearchParameters() {
        this.table = new HashMap<String, LOGICAL_LINK>();

        this.table.put("pays", LOGICAL_LINK.AND);
        this.table.put("adresse", LOGICAL_LINK.AND);
        this.table.put("domaine", LOGICAL_LINK.AND);
        this.table.put("intitule", LOGICAL_LINK.AND);
        this.table.put("description", LOGICAL_LINK.AND);
        this.table.put("salaire", LOGICAL_LINK.AND);
        this.table.put("option", LOGICAL_LINK.AND);
        this.table.put("avantage", LOGICAL_LINK.AND);
        this.table.put("langue", LOGICAL_LINK.AND);

    }

    public SearchParameters(HashMap<String, LOGICAL_LINK> hash){
        this.table = new HashMap<String, LOGICAL_LINK>(hash);
    }

    public void setLogicalLink(String champ, LOGICAL_LINK logical_link){
        this.table.put(champ,logical_link);
    }

    public LOGICAL_LINK getLogicalLink(String champ){
        return this.table.get(champ);
    }

    public HashMap<String, LOGICAL_LINK> getTable(){
        return this.table;
    }




}
