package fr.emn.ose.stage;

import com.github.jmkgreen.morphia.annotations.*;
import fr.emn.ose.serialization.ObjectIdDeserializer;
import fr.emn.ose.serialization.ObjectIdSerializer;
import org.bson.types.ObjectId;
import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 14/04/13
 * Time: 13:24
 * To change this template use File | Settings | File Templates.
 */


@Entity("stage")
public class Stage {

    @Id
    private ObjectId id;

    private String entreprise, longitude, latitude,pays, adresse, domaine, intitule, description, salaire, option, avantages, langue;

    @Embedded
    private NotesPertinence notesPertinence;

    private int rankingGrade;

    @PrePersist private void prePersist(){
        if(notesPertinence!=null){
            rankingGrade = notesPertinence.getRankingGrade();
        }
    }

    @JsonSerialize(using =  ObjectIdSerializer.class)
    public ObjectId getId() {
        return id;
    }
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    public void setId(ObjectId id) {
        this.id = id;
    }

    public int getRankingGrade() {
        return rankingGrade;
    }

    public void setRankingGrade(int rankingGrade) {
        this.rankingGrade = rankingGrade;
    }

    public NotesPertinence getNotesPertinence() {
        return notesPertinence;
    }

    public void setNotesPertinence(NotesPertinence notesPertinence) {
        this.notesPertinence = notesPertinence;
    }

    public String getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(String entreprise) {
        this.entreprise = entreprise;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getPays() {
        return pays;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getDomaine() {
        return domaine;
    }

    public void setDomaine(String domaine) {
        this.domaine = domaine;
    }

    public String getIntitule() {
        return intitule;
    }

    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSalaire() {
        return salaire;
    }

    public void setSalaire(String salaire) {
        this.salaire = salaire;
    }

    public String getOption() {
        return option;
    }

    public void setOption(String option) {
        this.option = option;
    }

    public String getAvantages() {
        return avantages;
    }

    public void setAvantages(String avantages) {
        this.avantages = avantages;
    }

    public String getLangue() {
        return langue;
    }

    public void setLangue(String langue) {
        this.langue = langue;
    }

    public String toString(){
        return "Stage au "+this.getPays();
    }


}
