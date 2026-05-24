const getColorSchemeBtn = document.getElementById("color-scheme-btn")
const seedColor = document.getElementById("seed-color")
const colorScheme = document.getElementById("color-scheme")
const palette = document.getElementById("palette")
const hexFooter = document.getElementsByClassName("hex-footer")

getColorSchemeBtn.addEventListener("click", () => {
    const cleanColor = seedColor.value.slice(1)

    fetch(`https://www.thecolorapi.com/scheme?hex=${cleanColor}&mode=${colorScheme.value}`)
        .then(res => res.json())
        .then(data => {

            const colorsArr = data.colors
            let colorHtml = ''
            let hexHtml = ''

            for(let color of colorsArr) {
                colorHtml += `
                    <div style="
                        background-color: ${color.hex.value};
                    "
                    ></div>
                `
                hexHtml += `
                    <div>
                        <p>${color.hex.value}</p>
                        <img class="copy-icon" src="images/copy.png" alt="copy icon" title="Copy">
                    </div>`
            }
            palette.innerHTML = colorHtml
            hexFooter[0].innerHTML = hexHtml
        })
})

document.addEventListener("click", e => {
    if (e.target.classList.contains("copy-icon")){
        const icon = e.target
        console.log(icon)

        const hexValue = e.target.parentElement.querySelector("p").textContent

        navigator.clipboard.writeText(hexValue)
        .then(() => {
            icon.src = "images/check.png"
            icon.alt = "copied icon"
        })

    }
})
