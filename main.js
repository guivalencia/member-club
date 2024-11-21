const img = document.getElementById("submit")
const input = document.querySelector("input")
const main = document.querySelector("main")

const section1 = document.getElementById("sec1")
const divInfo = document.getElementById("info")
const divPic = document.createElement("div")
const divPers = document.createElement("div")
const pName = document.createElement("p")
const pDate = document.createElement("p")
const imgPers = document.createElement("img")

const section2 = document.getElementById("sec2")
const divHist = document.getElementById("hist")
const divCut = document.createElement("div")
const pHist = document.createElement("p")
const spanHour = document.createElement("span")
const ulHist = document.createElement("ul")

const section3 = document.getElementById("sec3")
const divCard = document.getElementById("card")
const divCardFirst = document.createElement("div")
const h4CardFirst = document.createElement("h4")
const pCardFirst = document.createElement("p")
const divCardSecond = document.createElement("div")
const pCardSecond = document.createElement("p")
const divCardThird = document.createElement("div")

const section4 = document.getElementById("sec4")
const divSpin = document.createElement("div")
const divCont = document.createElement("div")
const h2Cont = document.createElement("h2")
const pCont = document.createElement("p")
const divBarr = document.createElement("div")
const divBarrSpin = document.createElement("div")
const spanBarr = document.createElement("span")
const divGift = document.createElement("div")
const imgGift = document.createElement("img")

const modalContainer = document.querySelector(".container")
const closeModal = document.querySelector(".close-modal")

input.addEventListener("input", () => {
    if (input.value !== "") {
        img.setAttribute("src", "../assets/icons/enter-default.svg")
    } else {
        img.setAttribute("src", "../assets/icons/enter-disabled.svg")
    }
})

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        imgClick()
    }
})

async function imgClick() {
    try {
        const id = input.value.trim()
        if (id === "") {
            alert("Por favor, insira um ID válido.")
            return
        }

        resetSections()

        const response = await fetch(`http://localhost:3333/clients/${id}`)
        if (!response.ok) throw new Error("Usuário inválido")

        const data = await response.json()
        populateSections(data)
    } catch (error) {
        alert("Erro: " + error.message)
    }
}

function resetSections() {
    divInfo.innerHTML = ""
    divHist.innerHTML = ""
    divCard.innerHTML = ""
    divCardThird.innerHTML = ""
    section4.innerHTML = ""
}

function populateSections(data) {
    // Informações do cliente
    imgPers.setAttribute("src", "assets/images.jpeg")

    pName.classList.add("text-sm")
    pName.textContent = data.name

    pDate.classList.add("text-xs")
    pDate.textContent = "Cliente desde " + data.clientSince

    divPic.setAttribute("id", "picture")
    divPic.append(imgPers)
    divPers.append(pName, pDate)
    divInfo.append(divPic, divPers)

    // Histórico de cortes
    pHist.textContent = "Histórico"
    spanHour.textContent = `${data.appointmentHistory.length} cortes`

    divCut.append(pHist, spanHour)
    divHist.appendChild(divCut)

    ulHist.innerHTML = ""
    data.appointmentHistory.forEach((hair) => {
        const liHist = createHistoryItem(hair)
        ulHist.appendChild(liHist)
    })
    divHist.appendChild(ulHist)

    // Cartão fidelidade
    h4CardFirst.textContent = "CARTÃO FIDELIDADE"
    pCardFirst.textContent = "Ao fazer cortes de cabelo, o décimo sai de graça!"
    pCardSecond.textContent = `ID: ${data.id}`

    divCardFirst.classList.add("card-first")
    divCardSecond.classList.add("card-second")
    divCardThird.classList.add("card-third")

    populateLoyaltyCard(data)

    divCard.append(divCardFirst, divCardSecond, divCardThird)

    // Seção de progresso
    createProgressSection(data)

    // Cartão fidelidade
    divCardFirst.append(h4CardFirst, pCardFirst)
    divCardSecond.append(pCardSecond)
    section3.appendChild(divCard)  // Certificando que o cartão aparece também na sec3
}


function createHistoryItem(hair) {
    const liHist = document.createElement("li")
    liHist.classList.add("cut")

    const divLi = document.createElement("div")
    divLi.classList.add("cut-info")
    divLi.innerHTML = `<strong>${hair.date}</strong> <span>${hair.time}</span>`

    const imgLi = document.createElement("img")
    imgLi.classList.add("cut-icon")
    imgLi.setAttribute("src", "assets/icons/check.svg")

    liHist.append(divLi, imgLi)
    return liHist
}

function populateLoyaltyCard(data) {
    divCardThird.innerHTML = ""
    for (let i = 0; i < 10; i++) {
        const divCardImg = document.createElement("div")
        if (i < data.loyaltyCard.totalCuts) {
            const imgCardThird = document.createElement("img")
            imgCardThird.classList.add("check")
            imgCardThird.setAttribute("src", "assets/PinCheck.png")
            divCardImg.appendChild(imgCardThird)
        }
        divCardThird.appendChild(divCardImg)
    }
}

function createProgressSection(data) {
    divSpin.classList.add("cont-spin")
    h2Cont.textContent = data.loyaltyCard.cutsRemaining
    pCont.textContent = " cortes restantes"

    divBarr.classList.add("div-spin")
    divBarrSpin.className = `barr-spin ${["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"][data.loyaltyCard.totalCuts - 1]}`

    if (data.loyaltyCard.totalCuts === 10) {
        modalContainer.classList.add("active")
    }

    spanBarr.textContent = `${data.loyaltyCard.totalCuts} de 10`
    divGift.classList.add("div-gift")
    imgGift.setAttribute("src", "assets/PinGift.png")
    imgGift.classList.add("spin-gift")

    divBarr.append(divBarrSpin, spanBarr)
    divCont.append(h2Cont, pCont)
    divGift.append(imgGift)
    divSpin.append(divCont, divBarr)
    section4.append(divSpin, divGift)
}

closeModal.addEventListener("click", () => {
    modalContainer.classList.remove("active")
})
