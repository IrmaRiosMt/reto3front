const API_URL = "http://localhost:8081/api/";

function getQuadbike() {
  //elemento del DOM->document object model
  $.ajax({
    url: `${API_URL}Quadbike/all`,
    type: "GET",
    datatype: "JSON",
    success: renderQuadbike,
  });
}

function renderQuadbike(response) {
  const $responseContainer = document.getElementById("response");
  for (let x = 0; x < response.length; x++) {
    const row = response[x];
    $responseContainer.innerHTML += `
    <tr>
        <td>
            ${row.id}
        </td>
        <td>
            ${row.name}
        </td>
        <td>
            ${row.description}
        </td>
        <td>
            ${row.brand}
        </td>
        <td>
            ${row.year}
        </td>
    </tr>
        `;
  }
}

function createQuadbike() {
  let dataToSend = {
    name: $("#name").val(),
    description: $("#description").val(),
    brand: $("#brand").val(),
    year: parseInt($("#year").val()),
    category: {
      id:parseInt($("#category").val())
    },
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: `${API_URL}Quadbike/save`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    alert("Quadbike registrada correctamente");
    $("#name").val("")
    $("#description").val("")
    $("#brand").val("")
    $("#year").val("")
    $("#category").val("")
  });
}

function updateQuadbike() {
  let dataToSend = {
    idcostume: parseInt($("#id").val()),
    name: $("#name").val(),
    brand: $("#brand").val(),
    year: parseInt($("#year").val()),
    description: $("#description").val(),
    idcategory: parseInt($("#idCategory").val()),
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: "https://g389439032223da-bxtdn7v5dsb6tede.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/api/costumes",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}

function deleteQuadbike() {
  let dataToSend = {
    idcostume: parseInt($("#id").val()),
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: "https://g389439032223da-bxtdn7v5dsb6tede.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/api/costumes",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}

getQuadbike();
