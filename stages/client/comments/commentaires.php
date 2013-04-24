<?
// S'il n'y a pas de nom, on ouvre la boîte Divers
if (!isset($idcom)) {$idcom = Divers;}

// Récupération de l'adresse IP
global $REMOTE_ADDR; $ip = (getenv("HTTP_X_FORWARDED_FOR") ? getenv("HTTP_X_FORWARDED_FOR") : getenv("REMOTE_ADDR"));

// Suppression des apostrophes lors du postage
if (isset($submit)){ $pseudo = stripslashes("$pseudo"); $comminit = stripslashes($commentaire); $titrinit = stripslashes($titrems); $pseudinit = $pseudo; }

if (isset($submit) AND ($titrems <> "Titre du message") AND ($titrems <> "") AND ($pseudo <> "Pseudo/Nom") AND ($pseudo <> "") AND ($commentaire <> ""))
{
// Cookie pour le pseudo
setcookie("nomindividu", $pseudo, 6004800, "/");

// Suppression de caractères spéciaux et apostrophes
$commentaire = str_replace("\'", "'", $commentaire);
$titrems = str_replace("\'", "'", $titrems);
$titrems = str_replace(">", "&gt;", $titrems);
$titrems = str_replace("<", "&lt;", $titrems);
$pseudo = str_replace("\'", "'", $pseudo);
$commentaire = str_replace('\"', '"', $commentaire);
$titrems = str_replace('\"', '"', $titrems);
$pseudo = str_replace('\"', '"', $pseudo);
$pseudo = str_replace("<", "&lt;", $pseudo);
$pseudo = str_replace(">", "&gt;", $pseudo);
$commentaire = str_replace(">", "&gt;", $commentaire);
$commentaire = str_replace("<", "&lt;", $commentaire);
$commentaire = str_replace(",", ", ", $commentaire);
$commentaire = str_replace(" ,", ", ", $commentaire);
$commentaire = str_replace(" , ", ", ", $commentaire);
$commentaire = str_replace(" . ", ". ", $commentaire);
$commentaire = str_replace(CHR(10), "<br>", $commentaire);

// Récupération de la date
$date = getdate();
$mois{1} = "Janvier";
$mois{2} = "Février";
$mois{3} = "Mars";
$mois{4} = "Avril";
$mois{5} = "Mai";
$mois{6} = "Juin";
$mois{7} = "Juillet";
$mois{8} = "Août";
$mois{9} = "Septembre";
$mois{10} = "Octobre";
$mois{11} = "Novembre";
$mois{12} = "Décembre";
$jour = $date['mday'];
$mois = $mois{$date['mon']};
$annee = $date['year'];
$temps = $jour . " " . $mois . " " . $annee;

// Vérification du message pour charte
$valide1 = str_word_count($commentaire);
$valide2 = substr_count($commentaire, "<br>");
$valide3 = substr_count($commentaire, ":");

// Système de censure (fichier bannwords.txt)
$valide4 = 0;
$fd = fopen("bannwords.txt", "r");
while (!feof($fd)){
$buffer = fgets($fd, 100);
$buffer = str_replace("
", "", $buffer);
if(eregi($buffer, $commentaire)){ $valide4 = 2; }
}
fclose ($fd);

$valide5 = 0;
$valide5b = explode(" ", $commentaire);
while (list($key, $val) = each($valide5b)) {
if(strlen($val) > 45){ $valide5 = 2; }
}

if(($valide1 > 2) && ($valide2 < 11) && ($valide3 < 25) && ($valide4 != 2) && ($valide5 != 2)){
$fp = fopen("commentaires/$idcom.txt","a");
fputs($fp, "$titrems|$commentaire|$pseudo|$temps");
fputs($fp,"£");
fclose($fp);

echo("<script language=\"javascript\">alert('Votre commentaire a été enregistré!');</script>");
}
else
{
$faux = 1;
echo("<script language=\"javascript\">alert('Votre message ne respecte pas la charte...');</script>");
if($valide4 == 2){
$fpip = fopen("bannip.txt","a");
fputs($fpip, "$ip");
fputs($fpip,"£");
fclose($fpip);
echo("<script language=\"javascript\">alert('Votre IP ($ip) a été relevée et ajoutée à la Liste Noire!');</script>");

 }
}

}
elseif (isset($submit))
{
$faux = 1;
echo("<script language=\"javascript\">alert('Vous devez renseigner votre Nom, le Titre de votre commentaire et laisser un message!');</script>");
}
?>

<html><head>
<META NAME="DESCRIPTION" CONTENT="Boîte de commentaires des visiteurs">
<META NAME="KEYWORDS" CONTENT="commentaires, messages, remarques, avis, idees, boite, visiteurs">
<META NAME="REPLY-TO" CONTENT="webmaster@site.fr">
<META NAME="AUTHOR" CONTENT="Eroan Boyer">
<META HTTP-EQUIV="imagetoolbar" CONTENT="no">
<META HTTP-EQUIV="CONTENT-LANGUAGE" CONTENT="fr">
<META HTTP-EQUIV="VW96.OBJECT TYPE" CONTENT="Archive">
<META NAME="ROBOTS" CONTENT="index,follow">
<META NAME="REVISIT-AFTER" CONTENT="15 days">
<META NAME="ROBOTS" CONTENT="ALL">
<link rel="stylesheet" type="text/css" href="style-comment.css">
<TITLE>Commentaires sur : <? echo("$idcom"); ?></TITLE>
</head><body topmargin="5" leftmargin="5" rightmargin="5" bottommargin="5" bgcolor="#FFFFFF">

<table border="0" width="100%" cellspacing="0" cellpadding="0"><tr><td width="100%">
<table border="0" width="100%" cellspacing="0" cellpadding="0"><tr><td width="50">
<img border="0" src="commentaires/top_left.gif" width="50" height="28"></td><td background="commentaires/top_center.gif"><center><b><? echo("$idcom"); ?></b></center></td><td width="50">
<img border="0" src="commentaires/top_right.gif" width="50" height="28"></td></tr></table></td></tr><tr><td width="100%">
<table border="0" width="100%" cellspacing="1" cellpadding="4" bgcolor="#000000"><tr>
<td height="20" background="commentaires/bg_cat.gif">

<?
$cpt=0;
if (file_exists("commentaires/$idcom.txt")) {

$fp = fopen("commentaires/$idcom.txt", "r");
while (!feof($fp))
{
    $ligne = fgets($fp,2000000);
    $login = explode("£",$ligne);
    $stop = sizeof( $login );
    for($x = 0; $x < $stop-1; $x++)
{
    $liste = explode("|",$login[$x]);
    
    for($y = 0;$y <= 4 ;$y++)
{
    $case[$x][$cpt] = $liste[$y];
    $cpt++;
}
$cpt = 0;
}
}
fclose($fp);

// Division en plusieurs pages :

if($stop-1 > 15){
if(!isset($debut) && !isset($fin)){$debut = 1; $fin = 15;}
echo("<center> ");
$afficn = 1;
for($alt = 0; $alt <= $stop-2; $alt = $alt+15)
{
$alt2 = $alt+15;
$alt0 = $alt+1;
if ($alt2 > $stop-1){$alt2 = $stop-1;}
if ($debut == $alt0 && $fin == $alt2){echo("<b>");}
echo("<a href=\"$PHP_SELF?idcom=$idcom&debut=$alt0&fin=$alt2\">$afficn </a>");
if ($debut == $alt0 && $fin == $alt2){echo("</b>");}
$afficn++;
if ($alt2 < $stop-1)
{
echo(" | ");
}
}
echo("</center>");
}
else
{
$debut = 1;
$fin = $stop-1;
}
?>

</td></tr><tr><td bgcolor="#efefef">

<?
// Dessin du tableau :
$debut = $stop-1-$debut;
$fin = $stop-1-$fin;
for($x = $debut; $x >= $fin; $x--)
{

$ama = "{$case[$x][0]}";
$ama = strtolower($ama);
$ama = ucwords($ama);
$mess = "{$case[$x][2]}";
$mess = strtolower($mess);
$mess = ucwords($mess);
$comm = "{$case[$x][1]}";
$comm = preg_replace("`((?:https?|ftp)://\S+)(\s|\z)`", '<a title="Visiter le site" target="_blank" href="$1">$1</a>$2', $comm);

// Mise en place des smileys
$comm = str_replace(":beurk:", "<img align='absmiddle' border='0' src='commentaires/b-beurk.gif'>", $comm);
$comm = str_replace(":koi:", "<img align='absmiddle' border='0' src='commentaires/b-koi.gif'>", $comm);
$comm = str_replace(":rond:", "<img align='absmiddle' border='0' src='commentaires/b-rond.gif'>", $comm);
$comm = str_replace(":colere:", "<img align='absmiddle' border='0' src='commentaires/b-colere.gif'>", $comm);
$comm = str_replace(":alien:", "<img align='absmiddle' border='0' src='commentaires/b-alien.gif'>", $comm);
$comm = str_replace(":tare:", "<img align='absmiddle' border='0' src='commentaires/b-tare.gif'>", $comm);
$comm = str_replace(":)", "<img align='absmiddle' border='0' src='commentaires/b-happy.gif'>", $comm);
$comm = str_replace(":robot:", "<img align='absmiddle' border='0' src='commentaires/b-robot.gif'>", $comm);
$comm = str_replace(":lunette:", "<img align='absmiddle' border='0' src='commentaires/b-lunette.gif'>", $comm);

echo("<table border=\"0\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\"><tr><td height=\"20\"><img border=\"0\" src=\"commentaires/commenter.gif\" align=\"absmiddle\" width=\"19\" height=\"18\"> <b><font color=\"#4c4c4c\">$ama</font></b></td><td height=\"20\"><p align=\"right\"><i>{$case[$x][3]}</i></p></td></tr><tr><td colspan=\"2\">");
echo("$comm</td></tr><tr><td height=\"20\" colspan=\"2\"><p align=\"right\"><font size=\"1\">Rédigé par $mess</font></p></td></tr><tr><td colspan=\"2\" bgcolor=\"#efefef\" height=\"1\"></td></tr></table><hr size=\"1\" color=\"black\">");
}
}
else
{
echo("</td></tr><tr><td bgcolor=\"#efefef\">");
}

// Bannissement par IP
$fpip = fopen("bannip.txt","r");
$lignip = fgets($fpip,2000000);
$countip = substr_count($lignip, $ip);
fclose($fpip);
if($countip < 2){
?>

<form method="POST" name="formulaire" action="<? echo("$PHP_SELF"); ?>"><p align="center"><img border="0" align="absmiddle" src="commentaires/add_message.gif" width="19" height="18"> <b><font color="#4c4c4c">Poster un commentaire</font></b><br><br>
<input maxlength="20" type="text" name="titrems" size="21" value="<? if($faux == 1){echo("$titrinit");}else{echo("Titre du message");} ?>" onFocus="if (this.value=='Titre du message') {this.value=''}">
<input maxlength="15" type="text" name="pseudo" size="15" value="<? if (isset($nomindividu)) { $nomindividu = stripslashes("$nomindividu"); } else { $nomindividu = "Pseudo/Nom"; } if(isset($pseudinit)){$nomindividu = $pseudinit;} echo("$nomindividu"); ?>" onFocus="if (this.value=='Pseudo/Nom') {this.value=''}"><br>
<textarea rows="9" name="commentaire" cols="38"><? if($faux == 1){echo("$comminit");} ?></textarea><input type="hidden" value="<? echo("$idcom"); ?>" name="idcom"><br>

<img src="commentaires/b-happy.gif" style="CURSOR: hand" onclick="commentaire.value+=' :) '">
<img src="commentaires/b-beurk.gif" style="CURSOR: hand" onclick="commentaire.value+=' :beurk: '">
<img src="commentaires/b-koi.gif" style="CURSOR: hand" onclick="commentaire.value+=' :koi: '">
<img src="commentaires/b-rond.gif" style="CURSOR: hand" onclick="commentaire.value+=' :rond: '">
<img src="commentaires/b-colere.gif" style="CURSOR: hand" onclick="commentaire.value+=' :colere: '">
<img src="commentaires/b-alien.gif" style="CURSOR: hand" onclick="commentaire.value+=' :alien: '">
<img src="commentaires/b-tare.gif" style="CURSOR: hand" onclick="commentaire.value+=' :tare: '">
<img src="commentaires/b-robot.gif" style="CURSOR: hand" onclick="commentaire.value+=' :robot: '">
<img src="commentaires/b-lunette.gif" style="CURSOR: hand" onclick="commentaire.value+=' :lunette: '">
 
<INPUT TYPE="submit" value="Valider" name="submit" onClick="this.value='Patientez...';"><? } else { echo("<br><center><b>Adresse IP $ip bannie...</b><br>Vous ne pouvez plus poster</center>"); }?>

<br><br><div align="center"><table border="0" width="85%" cellspacing="0" cellpadding="0"><tr><td>
<a href="javascript:self.close();"><img style="margin-bottom: 2" border="0" align="absmiddle" src="commentaires/topic_close.gif" width="18" height="18"> Fermer la boîte de commentaires</a><br>
<a Onmouseover="javascript:document.getElementById('charte').innerHTML='<font size=1><br>• Pas de propos injurieux ou racistes<br>• Pas de sauts à la ligne abusifs<br>• Pas de smileys abusifs<br>• Pas de publicité pour des sites</font>'; this.className='help'" Onmouseout="javascript:document.getElementById('charte').innerHTML='';"><img border="0" align="absmiddle" src="commentaires/topic_charte.gif" width="18" height="18"> <font color="#4c4c4c">Informations sur la charte</font></a><div id="charte"><br></div>
</td></tr></table></div>

<center><br>Script développé par <a href="http://www.jeunes-webmasters.com" target="_blank">Jeunes Webmasters</a><br>Powered by J-Web Commentaires v2.0</center>

</td></tr></table></td></tr><tr><td width="100%">
<table border="0" width="100%" cellpadding="0" cellspacing="0"><tr><td width="40">
<img border="0" src="commentaires/bottom_left.gif" width="40" height="9"></td>
<td background="commentaires/bottom_center.gif"><img border="0" src="commentaires/bottom_center.gif" width="20" height="9"></td><td width="40">
<img border="0" src="commentaires/bottom_right.gif" width="40" height="9"></td>
</tr></table></td></tr></table></body></html>
