<? if (!isset($idcom)) {$idcom = Divers;}

// Recherche du nombre de commentaires

if (file_exists("commentaires/$idcom.txt")) {

$fp = fopen("commentaires/$idcom.txt", "r");
$ligne = fgets($fp,2000000);

$nb_com = substr_count($ligne, "£");

fclose($fp);

}
else
{
$nb_com = 0;
}

// Notre tableau :

echo("document.write(\"<table border='0' width='$largeur' cellspacing='1' bgcolor='$clrfond'><tr><td width='100%' bgcolor='$clrdvt'>\");");
echo("document.write(\"<table border='0' width='100%' cellspacing='2' cellpadding='0' style='color: $color; font-size: $taille pt; font-family: $font'>\");");
echo("document.write(\"<tr><td width='100%'><center>\");");
echo("document.write(\" <span style='font-size: $taille pt'> [$nb_com Commentaires | \");");

?>

document.write("<a title=\"<? echo("Commenter $idcom!"); ?>\" style=\"color: <? echo("$color"); ?>; font-size: $taille pt; font-family: <? echo("$font"); ?>\" href=\"#\" OnClick=\"window.open('<? if (isset($rep)){echo("$rep/");} ?>commentaires.php?idcom=<? echo("$idcom"); ?>','','toolbar=0,location=0,directories=0,status=0,scrollbars=1,resizable=0,copyhistory=0,menuBar=0,width=330,height=350');return(false)\"><img align=\"absmiddle\" border=\"0\" src=\"<? if (isset($rep)){echo("$rep/");} ?>commentaires/commenter.gif\" width=\"11\" height=\"11\"> Commenter/voir</a>]</span></center></td></tr></table></td></tr></table>");