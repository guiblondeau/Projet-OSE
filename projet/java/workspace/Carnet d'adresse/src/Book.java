import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;


public class Book {
	
	private HashMap<Integer, Contact> contacts;
	
	public Book(){
		this.contacts = new HashMap<Integer, Contact>();
	}
	
	public void addContact(Contact c){
		this.contacts.put(c.getId(), c);
	}
	
	public List<Contact> getAll(){
		Iterator<Integer> it = contacts.keySet().iterator();
		ArrayList<Contact> aRet = new ArrayList<Contact>();
		while(it.hasNext()){
			
			aRet.add(contacts.get(it.next()));
		}
		return aRet;
	}
	
	public void editContact(Contact c){
		contacts.put(c.getId(), c);
	}

}
