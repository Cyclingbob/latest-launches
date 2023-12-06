var form = document.getElementById("forme");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

function select() {
  const amount = document.getElementById("number").value
  console.log(amount)
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("inner").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "/selection?amount=" + amount, true);
  xhttp.send();
}

setInterval(select(), 5000);

window.onload = function(){
  console.log(location)
  if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
  }
  /*if(location.hostname === 'lila-ads.glitch.me'){
    location.replace("https://ads.lila.gq" + window.location.pathname);
  }
  if(location.hostname === 'www.ads.lila.gq'){
    location.replace("https://ads.lila.gq" + window.location.pathname)
  }*/
}
