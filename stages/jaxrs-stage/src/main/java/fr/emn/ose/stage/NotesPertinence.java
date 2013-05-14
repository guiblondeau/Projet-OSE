package fr.emn.ose.stage;

import com.github.jmkgreen.morphia.annotations.Embedded;

/**
 * Created with IntelliJ IDEA.
 * User: Raoul
 * Date: 14/05/13
 * Time: 16:21
 * To change this template use File | Settings | File Templates.
 */
@Embedded
public class NotesPertinence {

    private int pertinent=0, nonPertinent=0;

    public int getPertinent() {
        return pertinent;
    }

    public void setPertinent(int pertinent) {
        this.pertinent = pertinent;
    }

    public int getNonPertinent() {
        return nonPertinent;
    }

    public void setNonPertinent(int nonPertinent) {
        this.nonPertinent = nonPertinent;
    }

    public int getRankingGrade(){
        int tmp = pertinent-nonPertinent;
        if(tmp>=0){
            return 0;
        }
        else{
           return -tmp;
        }
    }




}
