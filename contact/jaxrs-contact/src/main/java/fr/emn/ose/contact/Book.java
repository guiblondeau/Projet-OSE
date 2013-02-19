package fr.emn.ose.contact;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/book")
public class Book {

    private HashMap<Integer, Contact> contacts;

    public Book() {
        this.contacts = new HashMap<Integer, Contact>();
    }

    @POST()
    @Consumes({MediaType.APPLICATION_JSON})
    @Path("/addContact")
    public void addContact(Contact c){
        this.contacts.put(c.getId(), c);
    }

    @POST()
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

    @PUT()
    @Path("/editContact")
    @Consumes({MediaType.APPLICATION_JSON})
    public void editContact(Contact c){
        contacts.put(c.getId(), c);
    }

    @DELETE()
    @Path("/delete")
    @Consumes({MediaType.APPLICATION_JSON})
    public void deleteContact(Contact contact){
        this.contacts.remove(contact.getId());
    }
}
