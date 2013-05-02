package fr.emn.ose.stage;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 01/05/13
 * Time: 13:16
 * To change this template use File | Settings | File Templates.
 */
public enum Models {
      PAYS("pays"), ADRESSE("adresse"), DOMAINE("domaine"), INTITULE("intitule"), DESCRIPTION("description"),
    SALAIRE("salaire"), OPTION("option"), AVANTAGES("avantages"), LANGUE("langue");

    private String value;

    private Models(String value){
        this.value = value;
    }

    public String toString(){
        return this.value;
    }

}
