// references JSON file for sports teams, should work with internet connection
const apiURL = "https://xalvandor.github.io/CS601_HW2_Gavlishin/sports.json";

// button for loading teams
const btn = document.getElementById("btn-load-teams");

// references drop zones
const goodTeamDZ = document.getElementById("Philadelphia");
const badTeamDZ = document.getElementById("Boston");
const dropZones = [goodTeamDZ, badTeamDZ];


// loads teams into container
btn.addEventListener('click', () => {
  //makes sure there aren't more than the total 8 teams
  if (document.getElementById("container").hasChildNodes() === false ) {
    fetchSports();
  } else {
    alert("You already have the teams loaded!");
  }

})

// function for fetching JSON from web server
function fetchSports() {
  fetch(apiURL)
    .then((response) => {
      return response.json();
    }).then(data => {
    processData(data);
  }).catch((err) => {
    console.log('rejected', err);
  });
}

// function for processing fetched Data and appending it to DOM
function processData(data) {
  data.forEach(team => {
    // creates img element using team logo
    let teamImg = document.createElement('IMG');
    teamImg.src = team.logoURL;
    teamImg.id = team.id;
    teamImg.width = 50;
    teamImg.height = 50;

    teamImg.class = team.city;
    teamImg.alt = team.city + " " + team.name + " logo. " + team.chant;
    // creates caption for img
    let teamElem = document.createElement('figcaption');
    teamElem.innerText = team.city + " " + team.name;
    teamElem.id = team.id;
    teamElem.for = team.id;
    teamElem.class = team.city;
    // creates figure element for img and caption
    let teamFigure = document.createElement("figure");
    teamFigure.id = teamImg.id;
    teamFigure.draggable = true;
    teamFigure.className = team.city;
    //dragstart event for figure elem
    teamFigure.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', teamFigure.id)
      event.target.classList.add('dragging');

    });
    //drag end event for figure elem
    teamFigure.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
      e.target.classList.remove('dragover');
    })
    //adds figure, img, and caption to DOM
    document.getElementById("container").appendChild(teamFigure);
    document.getElementById(teamFigure.id).appendChild(teamImg);
    document.getElementById(teamImg.id).appendChild(teamElem);
    console.log(team.id, team.city, team.name, team.chant);
  });
}

// creates drop events for dropzones
dropZones.forEach(zone => {
  const dropZone = document.getElementById(zone.id);

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();

    const teamID = e.dataTransfer.getData('text/plain');
    const team = document.getElementById(teamID);
    // conditional drops based on class names and ids
    if (team.className === "Philadelphia" && dropZone.id === "Philadelphia") {
      dropZone.appendChild(team);

    } else if (team.className === "Boston" && dropZone.id === "Boston") {
      dropZone.appendChild(team);
    }

    e.target.classList.remove('dragover');
  })
  // event to add dragover event, changes color
  zone.addEventListener('dragover', (event) => {
    event.preventDefault(); // Necessary to allow dropping
    event.currentTarget.classList.add('dragover');
  });
  // event for dragleave, removes highlighted color
  zone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
  });
})
