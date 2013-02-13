package fr.emn.ose.contact;

public class Contact {

    private int id;
    private String nom, prenom, numero;

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
