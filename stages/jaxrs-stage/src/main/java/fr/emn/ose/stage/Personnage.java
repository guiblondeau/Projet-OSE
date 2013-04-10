package fr.emn.ose.stage;

import com.github.jmkgreen.morphia.annotations.Entity;
import com.github.jmkgreen.morphia.annotations.Id;
import org.bson.types.ObjectId;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 09/04/13
 * Time: 15:14
 *
 * This class represent a Disney character
 * To change this template use File | Settings | File Templates.
 */
@Entity
public class Personnage {

    @Id
    ObjectId id;

    protected String nom, prenom, race;

    public Personnage(ObjectId id, String nom, String prenom, String race) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.race = race;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
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

    public String getRace() {
        return race;
    }

    public void setRace(String race) {
        this.race = race;
    }

    public static void main(String arg[]){

    }
}
