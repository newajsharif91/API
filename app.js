const loadPhone = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  diaplayPhone(data.data);
};
const diaplayPhone = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerText = "";
  //Display 20 Phone Only
  const showAll = document.getElementById("show-all");
  if (phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  //Display No Phone

  const noPhone = document.getElementById("no-phone-found");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card p-4 m-4">
                        <img src=" ${phone.image} " class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title"> ${phone.phone_name} </h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <button onclick="loadPhoneDetails('${phone.slug}')"  href='#' class="btn btn-primary" >Show Details</button>
                      </div>
                      </div>
    
    `;
    phoneContainer.appendChild(phoneDiv);
  });
  // Stop Loader
  toggleSpinner(false);
};

// Handle Button Search Button
document.getElementById("btn-search").addEventListener("click", function () {
  // Start Loader
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText);
});

// Input Field Enter Button

document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === 0) {
    }
  });

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// Show All Button All phone

document.getElementById("btn-show-all").addEventListener("click", function () {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText);
});

document.getElementById("btn-show-all").addEventListener("click", function () {
  console.log("lol");
});

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.data);
};
loadPhone();
