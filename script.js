let data;

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

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
        <th scope="col">S.no</th>
		<th scope="col">Center Name</th>
		<th scope="col">Place</th>
		<th scope="col">State</th>
		</tr>`;


  for (let r of data.centres) {
    tab += `<tr class="row">
            <td class = "table-data">${r.id} </td>
            <td "table-data">${r.name} </td>
            <td "table-data">${r.Place}</td>
            <td "table-data">${r.State}</td>
            </tr>`;
  }

  document.getElementById("isroCenters").innerHTML = tab;
}


let flag = "";

function cityBtn() {
  flag = "city";
  searchData();
};

function stateBtn() {
  flag = "state";
  searchData();
};

function centerBtn() {
  flag = "name";
  searchData();
};

console.log(flag);

function searchData() {
  debugger;
  console.log(data);
  let val = document.getElementById("search").value;
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

getapi();