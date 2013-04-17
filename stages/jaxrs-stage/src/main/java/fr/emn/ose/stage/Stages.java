package fr.emn.ose.stage;

import com.github.jmkgreen.morphia.Datastore;
import com.github.jmkgreen.morphia.annotations.Embedded;
import com.github.jmkgreen.morphia.annotations.Entity;
import com.sun.corba.se.pept.transport.ContactInfo;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 14/04/13
 * Time: 16:59
 * To change this template use File | Settings | File Templates.
 */
public class Stages {

    /**
     * Add a new internship to the list
     * @param s, the internship to be added
     * @return the internship which was added
     */
    @POST()
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/stage")
    public Response addStage(Stage s){


        try {
            Datastore ds = ConnectionDataStore.createDataStore();
            ds.save(s);
        } catch (UnknownHostException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
        return Response.ok(s).header("Access-Control-Allow-Origin", "*").build();
    }

    /**
     * OPTION request for CORS preflighted requests.
     *
     * The preflighted request sends an OPTION header to the server, to check
     * the safety of the request.
     *
     * @return  OK status for GET and POST request
     */
    @OPTIONS
    @Path("/stages")
    public Response optionStages(){
        return Response.ok().
                header("Access-Control-Allow-Origin", "*").
                header("Access-Control-Allow-Methods", "GET, POST, OPTIONS").
                header("Access-Control-Allow-Headers", "Content-Type").build();
    }


    /**
     * Get all the internships of the database
     * @return
     */
    @GET()
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/stages")
    public Response getAll(){
        List<Stage> toRet = new ArrayList<Stage>();
        try {
             toRet = ConnectionDataStore.createDataStore().find(Stage.class).asList();
        } catch (UnknownHostException e) {

        }
        return Response.ok(toRet).header("Access-Control-Allow-Origin", "*").build();
    }

    /**
     * Option request for preflighted requests on individual entities of internship.
     *
     * @return Ok status for PUT, GET and DELETE requests
     */
    @OPTIONS
    @Path("/stages/{id}")
    public Response optionStage(){
        return Response.ok().
                header("Access-Control-Allow-Origin", "*").
                header("Access-Control-Allow-Methods", "PUT, GET , DELETE, OPTIONS").
                header("Access-Control-Allow-Headers", "Content-Type").build();
    }


    /**
     * Edit the internship corresponding to the given id, with the "stage" parameter
     * @param id id of the internship to be updated
     * @param stage the new internship which overrides the former value
     * @return the new value of the internship
     */
    @PUT()
    @Produces({MediaType.APPLICATION_JSON})
    @Consumes({MediaType.APPLICATION_JSON})
    @Path("/stages/{id}")
    public Response editStage(@PathParam("id") String id, Stage stage){
        return null;
    }

    /**
     * Delete the internship corresponding to the id parameter.
     * @param id the id of the internship to be deleted
     * @return Ok status if well deleted
     */
    @DELETE()
    @Path("/stages/{id}")
    public Response deleteStage(@PathParam("id") String id){
        return null;
    }


    /**
     * Option request for preflighted request. Notifies the request is safe.
     * @return Ok status for requests using GET on stages/recherche
     */
    @OPTIONS
    @Path("/stages/recherche")
    public Response rechercheStagesOption(){
        return Response.ok().
                header("Access-Control-Allow-Origin", "*").
                header("Access-Control-Allow-Methods", "GET, OPTIONS").
                header("Access-Control-Allow-Headers", "Content-Type").build();
    }

    /**
     *
     * @param type
     * @return
     */
    @GET()
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/stages/recherche")
    public Response rechercheStages(Stage type){
       return null;
    }



}
