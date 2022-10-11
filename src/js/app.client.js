const API_URL = "http://localhost:8081/api/";

function getAllClients() {
  //elemento del DOM->document object model
  $.ajax({
    url: `${API_URL}Client/all`,
    type: "GET",
    datatype: "JSON",
    success: renderClient,
  });
}

function renderClient(response) {
  const $responseContainer = document.getElementById("response");
  $responseContainer.innerHTML = "";
  for (let x = 0; x < response.length; x++) {
    const row = response[x];
    $responseContainer.innerHTML += renderCard(
      row.name,
      row.email,
      row.age,
      row.idClient
    );
  }
}

function renderCard(name, email, age, id) {
  return `
  <div class="card">
      <h1>${name}</h1>
      <p class="price">${age}</p>
      <input type="text" value />
      <p>
      ${email}
      </p>
      <p><button onclick="renderClientToUpdate()">Actualizar</button></p>
      <p><button>Borrar</button></p>
    </div>
  `;
}

function createClient() {
  let dataToSend = {
    name: $("#name").val(), //obtengo el valor que tiene el campo de texto id="name"
    description: $("#description").val(),
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: `${API_URL}Client/save`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    alert("Client registrada correctamente");
    $("#name").val(""); //limpio el valor que tenga el campo de texto
    $("#description").val("");
    getAllCategories();
  });
}

function updateClient() {
  let dataToSend = {
    name: $("#name").val(),
    description: $("#description").val(),
    id: parseInt($("#id").val()),
  };
  dataToSend = JSON.stringify(dataToSend);

  const settings = {
    url: `${API_URL}Client/update`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: dataToSend,
  };

  $.ajax(settings).done(function (response) {
    alert("Client actualizada correctamente");
    $("#id").val("");
    $("#name").val("");
    $("#description").val("");
    getAllCategories();
  });
}

function renderClientToUpdate(id, name, description) {
  $("#id").val(id); //seteo el valor que tendrá el campo de texto
  $("#name").val(name);
  $("#description").val(description);
  //$(".test").val(description);
}

function deleteClient(id) {
  const settings = {
    url: `${API_URL}Client/${id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data: {},
  };

  $.ajax(settings)
    .done(function (response) {
      alert("Client eliminado correctamente");
      getAllClients();
    })
    .fail(function (response) {
      console.log(response.responseText);
      alert("algo falló");
    });
}

getAllClients();
