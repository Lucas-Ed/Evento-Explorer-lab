import "./css/index.css"

/*------------------------------------------------------*/
/*---Transformar cor do cartão comforme bandeira----*/
const ccBgcolor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
ccBgcolor01.setAttribute("fill", "green")

const ccBgcolor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
ccBgcolor02.setAttribute("fill", "blue")

function setCardType(type) {
  const colors = {
    visa: ["#436099", "2D57F2"],
    mastrcard: ["#DF6F29", "2D57F2"],
    default: ["black", "gray"],
  }
  ccBgcolor01.setAttribute("fill", colors[type][0])
  ccBgcolor02.setAttribute("fill", colors[type][1])
}

setCardType("default")
/*---- executar de forma global via console do inspecionar elemento do navegador, usar
o comando: globalThis.setCardType("visa")-------*/

/*----------------------senha:#javascript--------------------------------*/
/*----------------------lterar imagen--------------------------------*/
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")
ccLogo.setAttribute("src", `cc=${type}.svg`)
/*------------------------------------------------------*/
