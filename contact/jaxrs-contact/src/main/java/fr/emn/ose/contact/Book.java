/**
 * This class represents a Book containing contacts. Contacts are represented by Contact instances
 * which can be added, updated and deleted
 */

package fr.emn.ose.contact;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;



@Path("/contacts")
public class Book {

    private HashMap<Integer, Contact> contacts;
    private int compt = 0;

    public Book() {
        this.contacts = new HashMap<Integer, Contact>();
    }

    /**
     * Generates a new id.
     *
     * Generate a new id by incrementing the former value of id
     * @return the new id
     */
    public int inc(){
        this.compt++;
        return compt;
    }


    /**
     * Adds the contact to the list
     * @param c : the contact to be added
     * @return the contact that was added
     */
    @POST()
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/addContact")
    public Contact addContact(Contact c){
        c.setId(this.inc());
        this.contacts.put(c.getId(), c);
        return c;
    }

    /**
     * Return all the contacts which were added to the book.
     *
     * @return the list of contacts to be displayed
     */
    @GET()
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/getAll")
    public List<Contact> getAll(){
        Iterator<Integer> it = contacts.keySet().iterator();
        ArrayList<Contact> aRet = new ArrayList<Contact>();

        while(it.hasNext()){
            aRet.add(contacts.get(it.next()));
        }

        return aRet;
    }


    /**
     * Edit the contact in the book with the new value.
     *
     * @param id  the id of the contact to be updated
     * @param c   the contact that overrides the former value
     * @return    the new contact that overrides the former value
     */
    @PUT()
    @Path("/editContact/{contact}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Contact editContact(@PathParam("contact")String id, Contact c){
        contacts.put(Integer.parseInt(id), c);
        return c;
    }


    /**
     *
     * @param id
     * @return
     */
    @DELETE()
    @Path("/editContact/{contact}")
    public Response deleteContact(@PathParam("contact") String id){
        this.contacts.remove(Integer.parseInt(id));
        return Response.status(200).build();
    }
}
