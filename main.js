const img = document.getElementById("submit")
const input = document.querySelector("input")

input.addEventListener("input", () => {
    if(input.value !== ""){
        img.setAttribute("src", "../assets/icons/enter-default.svg")
    }else{
        img.setAttribute("src", "../assets/icons/enter-disabled.svg")
    }
})