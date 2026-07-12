// ===========================================
// Mountain Mamas Draft List
// Firebase Firestore Version
// ===========================================


// Firebase Imports

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {

    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



// ===========================================
// Firebase Configuration
// Replace with your Firebase information
// ===========================================


const firebaseConfig = {

    apiKey: "AIzaSyBnt2LTha-opamevW1jXpc9727xUkDobTg",

    authDomain: "mountain-mamas-draf-list.firebaseapp.com",

    projectId: "mountain-mamas-draf-list",

    storageBucket: "mountain-mamas-draf-list.firebasestorage.app",

    messagingSenderId: "336892573672",

    appId: "1:336892573672:web:7cd733d734f1b23cc3165d"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// Firestore collection

const beerCollection = collection(db,"drafts");



// ===========================================
// Admin Password
// ===========================================


const PASSWORD = "HueyIsMyBitch";

let editMode = false;



// ===========================================
// HTML Elements
// ===========================================


const beerList = document.getElementById("beerList");

const editButton = document.getElementById("editButton");

const adminPanel = document.getElementById("adminPanel");


const modal = document.getElementById("loginModal");

const passwordInput = document.getElementById("passwordInput");

const loginButton = document.getElementById("loginButton");

const cancelButton = document.getElementById("cancelLogin");


const addBeerButton = document.getElementById("addBeer");



// ===========================================
// Real-Time Beer Loading
// Everyone sees updates instantly
// ===========================================


onSnapshot(beerCollection,(snapshot)=>{


    beerList.innerHTML="";


    let grouped = {};


    snapshot.forEach((document)=>{


        const beer=document.data();


        const description = beer.description || "Other";


        if(!grouped[description]){

            grouped[description]=[];

        }


        grouped[description].push({

            ...beer,

            id:document.id

        });


    });



    Object.keys(grouped)
    .sort()
    .forEach(description=>{


        const heading=document.createElement("h2");


        heading.className="style-heading";


        heading.innerHTML=`🍺 ${description}s`;


        beerList.appendChild(
            heading
        );



        grouped[description].forEach(beer=>{


            createBeerCard(
                beer,
                beer.id
            );


        });


    });


});


// ===========================================
// Create Beer Card
// ===========================================


function createBeerCard(beer,id){


    const card = document.createElement("div");


    card.className="beer-card";


    card.innerHTML = `


        <div class="beer-info">


            <h3>
                ${beer.name}
            </h3>


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




        </div>


        ${
            editMode

            ?

            `

            <button 
            class="delete"
            onclick="deleteBeer('${id}')">

                ✕

            </button>

            `

            :

            ""

        }


    `;



    beerList.appendChild(card);


}



// ===========================================
// Delete Beer
// ===========================================


async function deleteBeer(id){


    await deleteDoc(

        doc(
            db,
            "drafts",
            id
        )

    );


}



window.deleteBeer = deleteBeer;




// ===========================================
// Open Login
// ===========================================


editButton.addEventListener(
"click",
()=>{


    if(editMode){


        editMode=false;


        adminPanel.classList.add(
            "hidden"
        );


        editButton.innerHTML="⚙ Edit";


        refreshCards();


        return;


    }



    modal.classList.remove(
        "hidden"
    );


    passwordInput.value="";


    passwordInput.focus();


});



// ===========================================
// Cancel Login
// ===========================================


cancelButton.addEventListener(
"click",
()=>{


    modal.classList.add(
        "hidden"
    );


});




// ===========================================
// Login
// ===========================================


loginButton.addEventListener(
"click",
login
);



passwordInput.addEventListener(
"keydown",
(event)=>{


    if(event.key==="Enter"){

        login();

    }


});




function login(){



    if(passwordInput.value===PASSWORD){



        editMode=true;



        modal.classList.add(
            "hidden"
        );


        adminPanel.classList.remove(
            "hidden"
        );


        editButton.innerHTML="Logout";


        refreshCards();



    }

    else{


        alert(
            "Incorrect Password"
        );


        passwordInput.value="";


    }


}





// ===========================================
// Refresh cards after edit mode changes
// ===========================================


function refreshCards(){


    onSnapshot(
        beerCollection,
        (snapshot)=>{


            beerList.innerHTML="";


            snapshot.forEach(
            (document)=>{


                createBeerCard(

                    document.data(),

                    document.id

                );


            });


        }
    );


}




// ===========================================
// Add Beer
// ===========================================


addBeerButton.addEventListener(
"click",
async ()=>{


    const beer = {


        name:
        document.getElementById(
            "beerName"
        ).value,


        brewery:
        document.getElementById(
            "brewery"
        ).value,


        description:
        document.getElementById(
            "description"
        ).value,


        abv:
        document.getElementById(
            "abv"
        ).value,


        price:
        document.getElementById(
            "price"
        ).value


    };



    if(

        !beer.name ||
        !beer.brewery ||
        !beer.description ||
        !beer.abv ||
        !beer.price

    ){


        alert(
            "Please fill in all fields."
        );


        return;


    }




    await addDoc(

        beerCollection,

        beer

    );




    document
    .querySelectorAll(
        "#adminPanel input"
    )
    .forEach(
        input=>input.value=""
    );



});
