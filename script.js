
$( "#idContainer" ).draggable();

// minha chave para consumir a API - 
const key = "fb20f9f3cbf9f2af978d903cac10634d"

function devolverDados(dados){
	document.querySelector(".descricaoCidade").innerHTML = dados.name
	document.querySelector(".temperaturaNumero").innerHTML = Math.floor(dados.main.temp) + "°C"
	document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description
	document.querySelector(".umidadeNumero").innerHTML = dados.main.humidity + "%"
	document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
	document.querySelector(".paísAbreviacao").innerHTML = dados.sys.country

	//-------------------testar o fuso horario de acordo com o país recebido da API--------------------------
	// const dataAtual = new Date()
	// var hora2 = dataAtual.toLocaleTimeString(`pt-${dados.sys.country}`)
	// console.log(hora2, dados.sys.country)
	// //var hora = dataAtual.getHours()
	// var minuto = dataAtual.getMinutes()
	// var segundo = dataAtual.getSeconds()
	// document.querySelector(".horario").innerHTML = "Horário Atual: " + hora2 + " : " + minuto + " : " + segundo



	// Função que permite alterar a cor do número da temperatura de acordo com o seu valor
	var temperatura = Math.floor(dados.main.temp)
	if(temperatura < 0){
		document.querySelector(".temperaturaNumero").setAttribute('style','color:rgba(10, 248, 244)')
	}else if(0 < temperatura && temperatura < 10){
			document.querySelector(".temperaturaNumero").setAttribute('style','color:rgb(78, 78, 139)')
	}else if(10 < temperatura && temperatura < 20){
		document.querySelector(".temperaturaNumero").setAttribute('style','color: rgb(251, 219, 159)')
	}else if(20 < temperatura && temperatura < 35){
		document.querySelector(".temperaturaNumero").setAttribute('style','color: orange')
	}else{
		document.querySelector(".temperaturaNumero").setAttribute('style','color: red')
	}

}

async function buscarCidade(cidade){	
	const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&&units=metric`).then(res => res.json())
	devolverDados(dados)	
}

// função que está ligada ao botão de Pesquisa
function pesquisar(){
	const cidade = document.querySelector(".input-cidade").value;
	buscarCidade(cidade)
}

// função está nos mostrando o horario atual do navegador
function relogio(){
	const dataAtual = new Date()
	var hora = dataAtual.getHours()
	var minuto = dataAtual.getMinutes()
	var segundo = dataAtual.getSeconds()
	document.querySelector(".horario").innerHTML = "Horário Local: " + hora + " : " + minuto + " : " + segundo
}
window.setInterval(relogio,1000)

