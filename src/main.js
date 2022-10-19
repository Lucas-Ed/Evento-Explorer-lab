import "./css/index.css"
import IMask from "imask"

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
  ccLogo.setAttribute("src", `cc=${type}.svg`)
}
globalThis.setCardType = setCardType
//setCardType("default")
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
// Mascara-Date
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
      regex: /^4\d{0,15} /,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
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
    console.log(foundMask)

    return foundMask
  },
}
const cardNumerMasked = IMask(cardNumber, cardNumberPattern)
/*----------------------senha:#evolução--------------------------------*/
