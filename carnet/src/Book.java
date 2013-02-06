import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("book")
public class Book {
	
	private HashMap<Integer, Contact> contacts;
	
	public Book(){
		this.contacts = new HashMap<Integer, Contact>();
	}
	
	
	@POST()
	@Produces({MediaType.APPLICATION_JSON})
	@Path("/{addContact}")
	public void addContact(Contact c){
		this.contacts.put(c.getId(), c);
	}
	
	@POST()
	@Produces({MediaType.APPLICATION_JSON})
	@Path("/{getAll}")
	public List<Contact> getAll(){
		Iterator<Integer> it = contacts.keySet().iterator();
		ArrayList<Contact> aRet = new ArrayList<Contact>();
		while(it.hasNext()){
			
			aRet.add(contacts.get(it.next()));
		}
		return aRet;
	}
	
	@POST()
	@Path("/{editContact}")
	@Consumes({MediaType.APPLICATION_JSON})
	public void editContact(Contact c){
		contacts.put(c.getId(), c);
	}

}
