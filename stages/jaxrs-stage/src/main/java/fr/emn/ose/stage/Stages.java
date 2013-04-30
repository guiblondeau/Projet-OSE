package fr.emn.ose.stage;

import com.github.jmkgreen.morphia.Datastore;
import com.github.jmkgreen.morphia.annotations.Embedded;
import com.github.jmkgreen.morphia.annotations.Entity;
import com.github.jmkgreen.morphia.query.Query;
import com.sun.corba.se.pept.transport.ContactInfo;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.bson.types.ObjectId;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 14/04/13
 * Time: 16:59
 * To change this template use File | Settings | File Templates.
 */
public class Stages {


    private StageDAO stageDAO;

    public Stages() {
        try {
            this.stageDAO = new StageDAO(ConnectionDataStore.getMorphiaObject(), ConnectionMongo.getConnection());
        } catch (UnknownHostException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }

    /**
     * Add a new internship to the list
     *
     * @param s, the internship to be added
     * @return the internship which was added
     */
    @POST()
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/stage")
    public Response addStage(Stage s) {
        this.stageDAO.save(s);
        return Response.ok(s).header("Access-Control-Allow-Origin", "*").build();
    }

    /**
     * OPTION request for CORS preflighted requests.
     * <p/>
     * The preflighted request sends an OPTION header to the server, to check
     * the safety of the request.
     *
     * @return OK status for GET and POST request
     */
    @OPTIONS
    @Path("/stages")
    public Response optionStages() {
        return Response.ok().
                header("Access-Control-Allow-Origin", "*").
                header("Access-Control-Allow-Methods", "GET, POST, OPTIONS").
                header("Access-Control-Allow-Headers", "Content-Type").build();
    }


    /**
     * Get all the internships of the database
     *
     * @return
     */
    @GET()
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/stages")
    public Response getAll() {
        List<Stage> toRet = new ArrayList<Stage>();

        toRet = this.stageDAO.find().asList();

        return Response.ok(toRet).header("Access-Control-Allow-Origin", "*").build();
    }

    /**
     * Option request for preflighted requests on individual entities of internship.
     *
     * @return Ok status for PUT, GET and DELETE requests
     */
    @OPTIONS
    @Path("/stages/{id}")
    public Response optionStage() {
        return Response.ok().
                header("Access-Control-Allow-Origin", "*").
                header("Access-Control-Allow-Methods", "PUT, GET , DELETE, OPTIONS").
                header("Access-Control-Allow-Headers", "Content-Type").build();
    }


    /**
     * Edit the internship corresponding to the given id, with the "stage" parameter
     *
     * @param id    id of the internship to be updated
     * @param stage the new internship which overrides the former value
     * @return the new value of the internship
     */
    @PUT()
    @Produces({MediaType.APPLICATION_JSON})
    @Consumes({MediaType.APPLICATION_JSON})
    @Path("/stage/{id}")
    public Response editStage(@PathParam("id") String id, Stage stage) {
        this.stageDAO.save(stage);
        return Response.ok(stage).header("Access-Control-Allow-Origin", "*").build();
    }

    /**
     * Delete the internship corresponding to the id parameter.
     *
     * @param id the id of the internship to be deleted
     * @return Ok status if well deleted
     */
    @DELETE()
    @Path("/stage/{id}")
    public Response deleteStage(@PathParam("id") String id) {
        this.stageDAO.delete(this.stageDAO.get(new ObjectId(id)));
        return Response.ok().header("Access-Control-Allow-Origin", "*").build();
    }


    /**
     * Option request for preflighted request. Notifies the request is safe.
     *
     * @return Ok status for requests using GET on stages/recherche
     */
    @OPTIONS
    @Path("/stages/recherche")
    public Response rechercheStagesOption() {
        return Response.ok().
                header("Access-Control-Allow-Origin", "*").
                header("Access-Control-Allow-Methods", "GET, OPTIONS").
                header("Access-Control-Allow-Headers", "Content-Type").build();
    }

    /**
     * @param type
     * @return
     */
    @POST()
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/stages/recherche")
    public Response rechercheStages(Stage type, HashMap<String, SearchParameters.LOGICAL_LINK> logical_link) {
        SearchParameters searchParameters = new SearchParameters(logical_link);
        List<Stage> stages = stageDAO.find(type, searchParameters);
       return Response.ok(stages).header("Access-Control-Allow-Origin", "*").build();
    }

    /**
     * Get the internships of "id" id of the database
     *
     * @return
     */
    @GET()
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/stage/{id}")
    public Response getById(String id) {
        Stage stage = this.stageDAO.get(new ObjectId(id));
        return Response.ok(stage).header("Access-Control-Allow-Origin", "*").build();
    }

    @DELETE()
    @Path("/stages")
    public Response deleteAll(){
        Datastore datastore = this.stageDAO.getDatastore();
        Query<Stage> query =  datastore.createQuery(Stage.class);
        datastore.delete(query);
        return Response.ok().header("Access-Control-Allow-Origin", "*").build();
    }


}
