$( "#idContainer" ).draggable();

function devolverDados(dados){
    document.querySelector(".descricaoCidade").innerHTML = dados.name;
    document.querySelector(".temperaturaNumero").innerHTML = Math.floor(dados.main.temp) + "°C";
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidadeNumero").innerHTML = dados.main.humidity + "%";
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    document.querySelector(".paísAbreviacao").innerHTML = dados.sys.country;

    var temperatura = Math.floor(dados.main.temp);
    if(temperatura <= 0){
        document.querySelector(".temperaturaNumero").setAttribute('style','color:rgba(10, 248, 244)');
    } else if(0 < temperatura && temperatura <= 10){
        document.querySelector(".temperaturaNumero").setAttribute('style','color:rgb(78, 78, 139)');
    } else if(10 < temperatura && temperatura <= 20){
        document.querySelector(".temperaturaNumero").setAttribute('style','color: rgb(251, 219, 159)');
    } else if(20 < temperatura && temperatura <= 35){
        document.querySelector(".temperaturaNumero").setAttribute('style','color: orange');
    } else {
        document.querySelector(".temperaturaNumero").setAttribute('style','color: red');
    }
}

async function buscarCidade(cidade){	
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${CONFIG.OPENWEATHER_API_KEY}&lang=pt_br&units=metric`).then(res => res.json());
    devolverDados(dados);	
}

function pesquisar(){
    const cidade = document.querySelector(".input-cidade").value;
    buscarCidade(cidade);
}

function relogio(){
    const dataAtual = new Date();
    var hora = dataAtual.getHours();
    var minuto = dataAtual.getMinutes();
    var segundo = dataAtual.getSeconds();
    document.querySelector(".horario").innerHTML = "Horário Local: " + hora + " : " + minuto + " : " + segundo;
}
window.setInterval(relogio, 1000);

const query = 'river';
fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${CONFIG.UNSPLASH_ACCESS_KEY}`)
    .then(response => response.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
    })
    .catch(err => console.error('Erro ao carregar a imagem da Unsplash:', err));
