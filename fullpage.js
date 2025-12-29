var myFullpage = new fullpage('#fullpage', {

  licenseKey: '5K9K9-3NWS9-OYK68-O7J2J-YOFXN',
  anchors: ['about', 'projects', 'skills'],
  navigation: 'true',
  scrollingSpeed: 800,
  fixedElements: '#nav-home',
  credits: { enabled: false, label: 'Made with fullPage.js', position: 'right'},
  fixedElements: '#header',
  navigationPosition: 'right',
  fitToSection: 'true',

});


function menu() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function closeMenu() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "none") {
    x.style.display = "none";
  } else {
    x.style.display = "none";
  }
}
