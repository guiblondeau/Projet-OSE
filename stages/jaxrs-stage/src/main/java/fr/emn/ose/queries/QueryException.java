package fr.emn.ose.queries;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 01/05/13
 * Time: 17:32
 * To change this template use File | Settings | File Templates.
 */
public class QueryException extends Exception {

    private String message;

    public QueryException(String message){
        this.message = message;
    }

    public String toString(){
        return "QueryException because of String "+this.message;
    }
}
