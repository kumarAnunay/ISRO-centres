var data;

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const cityBttn = document.getElementById("city");
const stateBttn = document.getElementById("state");
const centreBttn = document.getElementById("name");

async function getapi() {
  const url = "https://isro.vercel.app/api/centres";
  const response = await fetch(url);
  data = await response.json();
  console.log(data);
  if (response) {
    hideloader();
  }
  show(data);
}

function hideloader() {
  document.getElementById("loadingSpan").style.display = "none";
}

function show(data) {
  let tab = `<tr>
            <th>S.no</th>
            <th>Center Name</th>
            <th>Place</th>
            <th>State</th>
            </tr>`;

  for (let r of data.centres) {
    tab += `<tr>
            <td class = "table-data">${r.id} </td>
            <td>${r.name} </td>
            <td>${r.Place}</td>
            <td>${r.State}</td>
            </tr>`;
  }

  document.getElementById("isroCenters").innerHTML = tab;
}

let flag = "";

function cityBtn() {
  flag = "city";
  searchData();
}

function stateBtn() {
  flag = "state";
  searchData();
}

function centerBtn() {
  flag = "name";
  searchData();
}

function searchData() {
  let val = document.getElementById("search").value;
  let tab = `<tr>
        <th>S.no</th>
		<th>Center Name</th>
		<th>Place</th>
		<th>State</th>
		</tr>`;

  if (val != "") {
    if (flag === "name") {
      searchByName(tab, val);
    } else if (flag === "city") {
      searchByCity(tab, val);
    } else if (flag === "state") {
      searchByState(tab, val);
    }
  }
}

function searchByName(tab, val) {
  let i = 1;

  cityBttn.classList.remove("active");
  stateBttn.classList.remove("active");
  centreBttn.classList.add("active");

  for (let r of data.centres) {
    if (r.name.toLowerCase().includes(val.toLowerCase())) {
      tab += `<tr>
			<td>${i++} </td>
			<td>${r.name} </td>
			<td>${r.Place}</td>
			<td>${r.State}</td>
			</tr>`;
    }
  }

  if (i <= 1) {
    tab += `<tr>
			<td colspan="4" style="text-align:center;">No Record Found!!</td>
		</tr>`;
  }

  document.getElementById("isroCenters").innerHTML = tab;
}

function searchByState(tab, val) {
  let i = 1;

  cityBttn.classList.remove("active");
  stateBttn.classList.add("active");
  centreBttn.classList.remove("active");

  for (let r of data.centres) {
    if (r.State.toLowerCase().includes(val.toLowerCase())) {
      tab += `<tr>
			<td>${i++} </td>
			<td>${r.name} </td>
			<td>${r.Place}</td>
			<td>${r.State}</td>
		</tr>`;
    }
  }

  if (i <= 1) {
    tab += `<tr>
			<td colspan="4" style="text-align:center;">No Record Found!!</td>
		</tr>`;
  }

  document.getElementById("isroCenters").innerHTML = tab;
}

function searchByCity(tab, val) {
  let i = 1;

  cityBttn.classList.add("active");
  stateBttn.classList.remove("active");
  centreBttn.classList.remove("active");

  for (let r of data.centres) {
    if (r.Place.toLowerCase().includes(val.toLowerCase())) {
      tab += `<tr>
			<td>${i++} </td>
			<td>${r.name} </td>
			<td>${r.Place}</td>
			<td>${r.State}</td>
		</tr>`;
    }
  }

  if (i <= 1) {
    tab += `<tr>
			<td colspan="4" style="text-align:center;">No Record Found!!</td>
		</tr>`;
  }
  document.getElementById("isroCenters").innerHTML = tab;
}

getapi();
