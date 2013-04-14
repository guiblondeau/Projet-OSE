package fr.emn.ose.stage;

import com.github.jmkgreen.morphia.Datastore;
import com.github.jmkgreen.morphia.annotations.Embedded;
import com.github.jmkgreen.morphia.annotations.Entity;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.UnknownHostException;
import java.util.ArrayList;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 14/04/13
 * Time: 16:59
 * To change this template use File | Settings | File Templates.
 */
@Entity
public class Stages {

    @Embedded
    private ArrayList<Stage> listeStages;

    public Stages(){
        this.listeStages = new ArrayList<Stage>();
    }

    @POST()
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/addStage")
    public Response addContact(Stage s){
        this.listeStages.add(s);
        try {
            Datastore ds = ConnectionDataStore.createDataStore();
            ds.save(this.listeStages);
        } catch (UnknownHostException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
        return Response.ok(s).header("Access-Control-Allow-Origin", "*").build();
    }

    @GET()
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/getAll")
    public Response getAll(){
        return Response.ok(this.listeStages).header("Access-Control-Allow-Origin", "*").build();
    }
}
