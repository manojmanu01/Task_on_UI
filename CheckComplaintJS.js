window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("check_form");
  
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if(!validate(form)) return;
        getData(e);
    });

    async function getData(event) {
        const db = await getDb();
        const complaint_number = parseInt(document.querySelector(".checkInput").value);
     
        const transaction = db.transaction(["myStore"], "readonly");
        const objectStore = transaction.objectStore("myStore");
      

        const request = objectStore.get(parseInt(complaint_number));
        request.onsuccess = () => {
            const havingData = Boolean(request.result);
            if(!havingData) return alert("not found."); 

            const wrapper = document.createElement("div");
            wrapper.className = "wrapper";

            const idInfo = document.createElement("div");
            idInfo.textContent = "Complaint ID  :" + complaint_number;

            const newD = document.createElement("div");
            newD.textContent = "Status  :" + "Pending";

            const  new2 = document.createElement("p");
            new2.textContent = "Complaint  :" + request.result.complaint;

            wrapper.appendChild(idInfo);
            wrapper.appendChild(newD);
            wrapper.appendChild(new2);

            document.querySelector(".display").appendChild(wrapper);

            form.reset();
        }

        request.onerror = () => {
            alert("Unknown error");
        }
    }

    function validate(form) {
        const complaint_number_input = form.querySelector('.checkInput').value;
        if(isNaN(complaint_number_input)) {
            alert("Invalid complaint number");
            return false;
        }
        return true;
    }

});