
public class Contact {
	
	private int id;
	private String nom, prenom, numero;
	
	public Contact(int id, String nom, String prenom, String numero) {
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.numero = numero;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	
	public void setNumero(String numero){
		this.numero = numero;
	}
	
	public String getNumero(){
		return this.numero;
	}
	

	
	
	
	

}
