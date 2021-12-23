export default function ({ route }) {
    const xhttp = new XMLHttpRequest();
    const FD = new FormData();
    FD.append('action', 'visite')
    FD.append('url', route.fullPath)

    xhttp.open("POST", process.env.UTILS_SITE + "/PWS/main.php", true);
    xhttp.send(FD);
}