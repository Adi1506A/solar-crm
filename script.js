const USER_ID = "admin";
const PASSWORD = "1234";

let leads = [];

// CHECK LOGIN
window.onload = function(){
  if(localStorage.getItem("loggedIn") === "true"){
    showCRM();
    loadLeads();
  }
};

function login(){
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  if(u === USER_ID && p === PASSWORD){
    localStorage.setItem("loggedIn", "true");
    showCRM();
    loadLeads();
  } else {
    document.getElementById("loginError").innerText = "Wrong credentials";
  }
}

function logout(){
  localStorage.removeItem("loggedIn");
  location.reload();
}

function showCRM(){
  document.getElementById("loginPage").style.display="none";
  document.getElementById("crmPage").style.display="block";
}

function addLead(){
  let lead = {
    name: name.value,
    phone: phone.value,
    city: city.value,
    kw: kw.value,
    remarks: remarks.value
  };

  leads.push(lead);
  localStorage.setItem("leads", JSON.stringify(leads));
  displayLeads();
}

function loadLeads(){
  let data = localStorage.getItem("leads");
  if(data){
    leads = JSON.parse(data);
    displayLeads();
  }
}

function displayLeads(){
  let list = document.getElementById("leadList");
  list.innerHTML = "";

  leads.forEach(l=>{
    let li = document.createElement("li");
    li.innerHTML = `<b>${l.name}</b> - ${l.phone} (${l.kw} kW)<br>${l.remarks}`;
    list.appendChild(li);
  });
}

function exportToExcel(){
  let csv = "Name,Phone,City,kW,Remarks\n";
  leads.forEach(l=>{
    csv += `${l.name},${l.phone},${l.city},${l.kw},${l.remarks}\n`;
  });

  let blob = new Blob([csv]);
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "leads.csv";
  a.click();
}
