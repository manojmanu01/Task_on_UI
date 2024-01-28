let db;
const dbName = "myDatabase";
const dbVersion = 1;
const uniqueId = new Date().getTime();

const request = indexedDB.open(dbName, dbVersion);

request.onerror = function (event) {
  console.error("Error opening database:", event.target.errorCode);
};

request.onsuccess = function (event) {
  db = event.target.result;
  console.log("Database opened successfully");
};

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  const objectStore = db.createObjectStore("myStore", {
    keyPath: "id",
    autoIncrement: true,
  });

  console.log("Object store created successfully");
};

function addData(event) {
  event.preventDefault();
  const transaction = db.transaction(["myStore"], "readwrite");
  const objectStore = transaction.objectStore("myStore");
  // to remove all data
  //objectStore.clear();

  // Adding
  const a = document.querySelector("#complaint").value;
  const b = document.querySelector("#cat").value;
  const c = document.querySelector("#contact").value;
  const d = document.querySelector("#landmark").value;
  const e = document.querySelector("#consumerNumber").value;
  const f = document.querySelector("#problemdiscription").value;
  const g = document.querySelector("#mobileNumber").value;
  const h = document.querySelector("#address").value;
  const jsonData = {
    id: uniqueId,
    complaint: a,
    cat: b,
    contact: c,
    landmark: d,
    consumerNumber: e,
    problemdiscription: f,
    mobileNumber: g,
    address: h,
  };

  console.log(jsonData);
  const request = objectStore.add(jsonData);

  request.onsuccess = function (event) {
    console.log("Data added successfully");
    //getData(uniqueId);
    alert("Your Complaint id :" + uniqueId);
    location.reload();
  };

  request.onerror = function (event) {
    console.error("Error adding data:", event.target.errorCode);
  };
}

//testing validation

function getValid(event) {
  event.preventDefault();
  const rawdata = document.querySelector(".checkInput").value;
  const inputdata = Number(rawdata);
  if (!isNaN(inputdata)) {
    getData(this.event);
  } else {
    alert("Invalid");
    document.querySelector(".checkInput").value = "";
  }
}

//retriving data
function getData(event) {
  event.preventDefault();
  const rawdata = parseInt(document.querySelector(".checkInput").value);

  const transaction = db.transaction(["myStore"], "readwrite");
  const objectStore = transaction.objectStore("myStore");

  const request = objectStore.get(parseInt(rawdata));
  request.onsuccess = () => {
    wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    idInfo = document.createElement("div");
    idInfo.textContent = "Complaint ID  :" + rawdata;
    newD = document.createElement("div");
    newD.textContent = "Status  :" + "Pending";
    new2 = document.createElement("p");
    new2.textContent = "Complaint  :" + request.result.complaint;
    wrapper.appendChild(idInfo);
    wrapper.appendChild(newD);
    wrapper.appendChild(new2);

    document.querySelector(".display").appendChild(wrapper);
    newD = null;
    new2 = null;
    document.querySelector(".checkInput").value = "";
  };
  request.onerror = () => {
    alert("Invalid id");
  };
}
