export default function ({ route }) {
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", process.env.UTILS_SITE + "/php/visite.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("url=" + route.fullPath);
}