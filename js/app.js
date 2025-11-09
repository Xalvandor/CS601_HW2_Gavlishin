const apiURL = "https://xalvandor.github.io/CS601_HW2_Gavlishin/sports.json";


const btn = document.getElementById("btn-load-teams");

btn.addEventListener('click', () => {
  fetchSports();
})

function fetchSports() {
  fetch(apiURL)
    .then((response) => {
      // console.log('resolved', response);
      return response.json();
    }).then(data => {
    processData(data);
  }).catch((err) => {
    console.log('rejected', err);
  });
}

function processData(data) {
  //console.log(data);
  //container.getElementById("container");
  //container.textContent = "Here I am";
  data.forEach(team => {
    // team.draggable = true;

    let teamImg = document.createElement('IMG');
    teamImg.src = team.logoURL;
    teamImg.id = team.id;
    teamImg.width = 150;
    teamImg.height = 150;
    teamImg.class = team.city;
    teamImg.alt = team.city + " " + team.name + " logo. " + team.chant;

    let teamElem = document.createElement('figcaption');
    teamElem.innerText = team.city + " " + team.name;
    teamElem.id = team.id;
    teamElem.for = team.id;
    teamElem.class = team.city;

    let teamFigure = document.createElement("figure");
    teamFigure.id = teamImg.id;
    teamFigure.draggable = true;
    document.getElementById("container").appendChild(teamFigure);
    document.getElementById(teamFigure.id).appendChild(teamImg);
    document.getElementById(teamImg.id).appendChild(teamElem);
    console.log(team.id, team.city, team.name, team.chant);
  });
}



/*
  const canvas = document.createElement('canvas');
  canvas.width = 150;
  canvas.height = 150;
  canvas.id = 0;
  canvas.name = "";
  canvas.textContent = "";


  return canvas;

 */


// fetchSports();

function makeTeam(){
  const team = document.createElement();
  team.width = 150;
  team.height = 150;
  team.id = 0;
  team.name = "";
  team.textContent = "";
}







