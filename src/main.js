import "./css/index.css"
import IMask from "imask"

/*------------------------------------------------------*/
/*---Transformar cor do cartão comforme bandeira----*/
const ccBgcolor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
ccBgcolor01.setAttribute("fill", "blue")
const ccBgcolor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
ccBgcolor02.setAttribute("fill", "green")

const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "2D57F2"],
    mastercard: ["#DF6F29", "2D57F2"],
    default: ["black", "gray"],
  }
  ccBgcolor01.setAttribute("fill", colors[type][0])
  ccBgcolor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}
//setCardType("mastercard")
globalThis.setCardType = setCardType
/*---- executar de forma global via console do inspecionar elemento do navegador, usar
o comando: globalThis.setCardType("visa")-------*/

/*----------------------senha:#javascript--------------------------------*/
/*----------------------lterar imagen--------------------------------*/
//const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")
//ccLogo.setAttribute("src", `cc=${type}.svg`)
/*------------------------------------------------------*/

/*-------------------AULA-02--------------------------------*/
// Mascara-CVC
const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)
///////////////////////////////////////////////////////////////////
// Máscara-Date
const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)
///////////////////////////////////////////////////////////////////

//Expressão regular(busca de padrões)
//Visa: ^4\d{0,15}, master: (^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}}
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2 }|^22[2-9]\d|^2[3-7]\d{0,2 })\d{0,12 }/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    console.log(foundMask.cardtype)

    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)
/*----------------------senha:#evolução--------------------------------*/
/*-------------------AULA-03--------------------------------*/

//Capturando evento de click
const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  alert("Cartão Adicionado com sucesso !!")
})
document.querySelector("form").addEventListener("submit", (Event) => {
  event.preventDefault()
})

// capturando evento dos dados e adicionando no cartão
const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText =
    cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

//Eventos do imask
///CVC
securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})
function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")

  ccSecurity.innerText = code.length === 0 ? "123" : code
}
/////////////////////////////////////////////////////////////////////////////////////////
///Número do cartão
cardNumberMasked.on("accept", () => {
  // Atualizar bandeira do cartão
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
  ///////////////////////
  updateCardNumber(cardNumberMasked.value)
})
function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}
/////////////////////////////////////////////////////////////////////////////////////////
// Expiração
expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value)
})
function updateExpirationDate(date) {
  const ccExperation = document.querySelector(".cc-extra .value")
  ccExperation.innerText = date.length === 0 ? "02/32" : date
}
/*----------------------senha:#explorer--------------------------------*/
//--------------------------Fim--------------------------------------\\
