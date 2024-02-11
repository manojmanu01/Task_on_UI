const category_options = {
  "Billing related": ["a1", "b1", "c1", "d1"],
  "Voltage related": ["a2", "b2", "c2", "d2"],
  "Frequent disruption": ["a3", "b3", "c3", "d3"],
  "street light related": ["a4", "b4", "c4", "d4"],
  "pole related": ["a5", "b5", "c5", "d5"],
};

window.addEventListener("DOMContentLoaded", (e) => {
  const form = document.getElementById("rform");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validate(form)) return;
    addData(e);
  });

  async function addData(event) {
    const db = await getDb();

    const transaction = db.transaction(["myStore"], "readwrite");
    const objectStore = transaction.objectStore("myStore");

    const complaint = document.querySelector("#complaint").value;
    const cat = document.querySelector("#dynamic-categories").value;
    const contact = document.querySelector("#contact").value;
    const landmark = document.querySelector("#landmark").value;
    const consumerNumber = document.querySelector("#consumerNumber").value;
    const problemdiscription = document.querySelector(
      "#problemdiscription"
    ).value;
    const mobileNumber = document.querySelector("#mobileNumber").value;
    const address = document.querySelector("#address").value;
    const id = new Date().getTime();
    sessionStorage.setItem("UniqID", id);

    const jsonData = {
      id,
      complaint,
      cat,
      contact,
      landmark,
      consumerNumber,
      problemdiscription,
      mobileNumber,
      address,
    };

    const request = objectStore.add(jsonData);

    request.onsuccess = function (event) {
      console.log("Data added successfully");
      //alert("Your Complaint id :" + id);
      form.reset();
      location.replace("ComplaintSuccess.html");
    };

    request.onerror = function (event) {
      console.error("Error adding data:", event.target.errorCode);
    };
  }

  function validate(form) {
    const mobileNumber = form.querySelector("#mobileNumber");
    if (isNaN(mobileNumber.value) || mobileNumber.value.trim().length != 10) {
      alert("Invalid Mobile number.");
      return false;
    }

    return true;
  }

  /// dynamic categories

  const complaint_dropdown = document.querySelector("#complaint");
  const optgroup = document.querySelector("#dynamic-categories");

  complaint_dropdown.addEventListener("change", (e) => {
    const selected_category = complaint_dropdown.value;
    //console.log(selected_category);
    const options = category_options[selected_category];

    const options_html = options.map((option) => {
      return `<option value="${option}">${option}</option>`;
    });

    optgroup.innerHTML = [
      `<option selected disabled>Select Category</option>`,
      options_html,
    ].join("");
  });
});
