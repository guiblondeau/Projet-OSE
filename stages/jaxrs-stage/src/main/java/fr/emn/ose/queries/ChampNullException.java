package fr.emn.ose.queries;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 02/05/13
 * Time: 16:46
 * To change this template use File | Settings | File Templates.
 */
public class ChampNullException extends Exception{

    public String toString(){
        return "Ce champ de recherche est nul, un peu comme les créateurs de ce site.";
    }
}
