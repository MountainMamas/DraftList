// =======================================
// Mountain Mamas Draft List
// =======================================

const PASSWORD = "HueyIsMyBitch";

let editMode = false;

// Default beers
let beers = JSON.parse(localStorage.getItem("draftList")) || [
    {
        name: "Miller Lite",
        brewery: "Miller Brewing Company",
        description: "American Light Lager",
        abv: "4.2%",
        price: "$4.00"
    },
    {
        name: "Yuengling",
        brewery: "D.G. Yuengling & Son",
        description: "Traditional Lager",
        abv: "4.5%",
        price: "$5.00"
    },
    {
        name: "Blue Moon",
        brewery: "Blue Moon Brewing",
        description: "Belgian White Ale",
        abv: "5.4%",
        price: "$6.00"
    }
];

// =======================================
// Elements
// =======================================

const beerList = document.getElementById("beerList");

const editButton = document.getElementById("editButton");

const adminPanel = document.getElementById("adminPanel");

const modal = document.getElementById("loginModal");

const passwordInput = document.getElementById("passwordInput");

const loginButton = document.getElementById("loginButton");

const cancelButton = document.getElementById("cancelLogin");

const addBeerButton = document.getElementById("addBeer");

// =======================================

function saveBeers() {

    localStorage.setItem(
        "draftList",
        JSON.stringify(beers)
    );

}

// =======================================

function renderBeers() {

    beerList.innerHTML = "";

    beers.forEach((beer, index) => {

        const card = document.createElement("div");

        card.className = "beer-card";

        card.innerHTML = `

            <div class="beer-info">

                <h3>${beer.name}</h3>

                <p class="brewery">
                    ${beer.brewery}
                </p>

                <p class="description">
                    ${beer.description}
                </p>

            </div>

            <div class="beer-details">

                <span class="abv">
                    ${beer.abv} ABV
                </span>

                <span class="price">
                    ${beer.price}
                </span>

            </div>

            ${
                editMode
                ?
                `<button class="delete" onclick="deleteBeer(${index})">✕</button>`
                :
                ""
            }

        `;

        beerList.appendChild(card);

    });

}

// =======================================

function deleteBeer(index) {

    beers.splice(index, 1);

    saveBeers();

    renderBeers();

}

window.deleteBeer = deleteBeer;

// =======================================
// Login Modal
// =======================================

editButton.addEventListener("click", () => {

    if(editMode){

        editMode = false;

        adminPanel.classList.add("hidden");

        editButton.innerHTML = "⚙ Edit";

        renderBeers();

        return;

    }

    modal.classList.remove("hidden");

    passwordInput.value = "";

    passwordInput.focus();

});

// =======================================

cancelButton.addEventListener("click", () => {

    modal.classList.add("hidden");

});

// =======================================

loginButton.addEventListener("click", login);

// =======================================

passwordInput.addEventListener("keydown", (event)=>{

    if(event.key === "Enter"){

        login();

    }

});

// =======================================

function login(){

    if(passwordInput.value === PASSWORD){

        modal.classList.add("hidden");

        editMode = true;

        adminPanel.classList.remove("hidden");

        editButton.innerHTML = "Logout";

        renderBeers();

    }

    else{

        alert("Incorrect Password");

        passwordInput.value = "";

        passwordInput.focus();

    }

}

// =======================================
// Add Beer
// =======================================

addBeerButton.addEventListener("click", ()=>{

    const name =
        document.getElementById("beerName").value.trim();

    const brewery =
        document.getElementById("brewery").value.trim();

    const description =
        document.getElementById("description").value.trim();

    const abv =
        document.getElementById("abv").value.trim();

    const price =
        document.getElementById("price").value.trim();

    if(
        name === "" ||
        brewery === "" ||
        description === "" ||
        abv === "" ||
        price === ""
    ){

        alert("Please complete every field.");

        return;

    }

    beers.push({

        name,
        brewery,
        description,
        abv,
        price

    });

    saveBeers();

    renderBeers();

    document.getElementById("beerName").value = "";
    document.getElementById("brewery").value = "";
    document.getElementById("description").value = "";
    document.getElementById("abv").value = "";
    document.getElementById("price").value = "";

});

// =======================================

renderBeers();