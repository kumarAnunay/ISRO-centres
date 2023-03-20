var data;

//Search Bar
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

const api_url = "https://isro.vercel.app/api/centres";

// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  data = await response.json();
  console.log(data);
  if (response) {
    hideloader();
  }
  show(data);
}
// Calling that async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("loadingSpan").style.display = "none";
}
// Function to define innerHTML for HTML table
function show(data) {
  let tab = `<tr>
        <th scope="col">S.no</th>
		<th scope="col">Center Name</th>
		<th scope="col">Place</th>
		<th scope="col">State</th>
		</tr>`;

  // Loop to access all rows
  for (let r of data.centres) {
    tab += `<tr class="row">
    <td class = "table-data">${r.id} </td>
	<td "table-data">${r.name} </td>
	<td "table-data">${r.Place}</td>
	<td "table-data">${r.State}</td>
</tr>`;
  }
  // Setting innerHTML as tab variable
  document.getElementById("isroCenters").innerHTML = tab;
}

//Function to set Flag
var flag = "name";

document.getElementById("city").addEventListener("click", () => {
  removeFocus();
  var element = document.getElementById("city");
  element.classList.add("focus");
  flag = "city";
});

document.getElementById("state").addEventListener("click", () => {
  removeFocus();
  var element = document.getElementById("state");
  element.classList.add("focus");
  flag = "state";
});

document.getElementById("name").addEventListener("click", () => {
  debugger;
  removeFocus();
  var element = document.getElementById("name");
  element.classList.add("focus");
  flag = "name";
});

console.log(flag);

//function for searching center by name
function searchData() {
  debugger;
  console.log(data);
  var val = document.getElementById("search").value;
  let tab = `<tr class="row">
        <th class="col">S.no</th>
		<th class="col">Center Name</th>
		<th class="col">Place</th>
		<th class="col">State</th>
		</tr>`;

  if (flag === "name") {
    searchByName(tab, val);
  } else if (flag === "city") {
    searchByCity(tab, val);
  } else if (flag === "state") {
    searchByState(tab, val);
  }
}

//Funtion for searching center by name
function searchByName(tab, val) {
  let i = 1;

  for (let r of data.centres) {
    if (r.name.toLowerCase().includes(val.toLowerCase())) {
      tab += `<tr class="row">
			<td class="table-data">${i++} </td>
			<td "table-data">${r.name} </td>
			<td "table-data">${r.Place}</td>
			<td "table-data">${r.State}</td>
			</tr>`;
    }
  }

  if (i <= 1) {
    tab += `<tr scope="row">
			<td colspan="4" style="text-align:center;">No Record Found!!</td>
		</tr>`;
  }

  document.getElementById("isroCenters").innerHTML = tab;
}

//Funtion for searching center by state
function searchByState(tab, val) {
  let i = 1;
  for (let r of data.centres) {
    if (r.State.toLowerCase().includes(val.toLowerCase())) {
      tab += `<tr class="row">
			<td class="table-data">${i++} </td>
			<td "table-data">${r.name} </td>
			<td "table-data">${r.Place}</td>
			<td "table-data">${r.State}</td>
		</tr>`;
    }
  }

  if (i <= 1) {
    tab += `<tr scope="row">
			<td colspan="4" style="text-align:center;">No Record Found!!</td>
		</tr>`;
  }

  document.getElementById("isroCenters").innerHTML = tab;
}

//Funtion for searching center by city
function searchByCity(tab, val) {
  let i = 1;

  for (let r of data.centres) {
    if (r.Place.toLowerCase().includes(val.toLowerCase())) {
      tab += `<tr class="row">
			<td class="table-data">${i++} </td>
			<td "table-data">${r.name} </td>
			<td "table-data">${r.Place}</td>
			<td "table-data">${r.State}</td>
		</tr>`;
    }
  }

  if (i <= 1) {
    tab += `<tr scope="row">
			<td colspan="4" style="text-align:center;">No Record Found!!</td>
		</tr>`;
  }
  document.getElementById("isroCenters").innerHTML = tab;
}

//function to remove focus class from all buttons
function removeFocus() {
  const allElements = document.querySelectorAll(".focus");
  allElements.forEach((element) => {
    element.classList.remove("focus");
  });
}
