if(navigator.onLine) { //test pour savoir si la connexion internet est possible

    var oReq = new XMLHttpRequest();
    oReq.onload = function(e) {
        if (this.readyState == 4 && this.status == 200) {
            var arraybuffer = JSON.parse(oReq.responseText);
            var select = document.getElementById("news-selector");
            for (var line of arraybuffer['sources']) {
                var option = document.createElement("option");
                option.setAttribute('value', line['id']);
                option.innerText = line['name'];
                select.appendChild(option);
            }
            select.addEventListener("change", changeFeed, false);
            changeFeed();
        }
    };
    oReq.open("GET", "https://newsapi.org/V2/sources");
    oReq.send("apiKey=c9917c2440304d3488f5717a16cfdac1");
}
else {
    var main = document.getElementsByTagName("main")[0];
    var img = document.createElement('img');
    var p = document.createElement("p");

    img.setAttribute('src', 'img/error.jpg');
    main.appendChild(img);
    p.innerText = "you are not connected on the web";
    main.appendChild(p);
}

// change les articles par rapport à la source
function changeFeed(){
    var oReq = new XMLHttpRequest();
    oReq.onload = function(e) {
        if (this.readyState == 4 && this.status == 200) {
            var arraybuffer = JSON.parse(oReq.responseText);
            var main = document.getElementsByTagName("main")[0];
            main.innerHTML='';
            for (var art of arraybuffer['articles']) {
                main.appendChild(createArticle(art));
            }
        }
    };
    oReq.open("GET", "https://newsapi.org/V2/everything?apiKey=c9917c2440304d3488f5717a16cfdac1&sources="+document.getElementById("news-selector").value);
    oReq.send();
}

// créer le contenu de l'article
function createArticle(art) {
    var article = document.createElement('article');
    var figure = document.createElement("figure");
    var figcaption = document.createElement("figcaption");
    var img = document.createElement('img');
    var p = document.createElement("p");
    var button = document.createElement("button");

    figcaption.innerText = art['title'];
    img.setAttribute('src', art['urlToImage']);
    figure.appendChild(figcaption);
    figure.appendChild(img);
    p.innerText = art['description'];
    article.appendChild(figure);
    article.appendChild(p);
    button.innerHTML = "Lire la suite";
    button.setAttribute('class', 'cta');
    article.appendChild(button);
}