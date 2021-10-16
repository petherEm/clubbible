const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const teamsEl = document.getElementById('teams');
const resultHeading = document.getElementById('result-heading');
const single_teamEl = document.getElementById('single-team');

const APIurl = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t='


submit.addEventListener('submit', (e) => {
    e.preventDefault();
    const term = search.value;
    let toBeFetched = APIurl + term;


    if(term.trim()) {
        fetch(toBeFetched)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search for '${term}': </h2>`;

                if(data.teams === null) {
                    resultHeading.innerHTML = `<p>There are no results for '${term}'</p>`;
                } else {
                    teamsEl.innerHTML = data.teams.map(team => `
                        <div class="team">
                            <img src="${team.strTeamBadge}" alt="${team.strTeam}" />
                            <div class="team-info" data-teamID="${team.idTeam}">
                                <h3>${team.strTeam}</h3>
                            </div>
                        </div>
                        `
                ).join('');
                }
            });

                
        } else {
            alert('Please enter a search term')
        }
})

function getTeamByID(teamID) {
    fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamID}`)
        .then(res => res.json())
        .then(data => {
            const team = data.teams[0];

            addTeamToDOM(team);
        });
}

//add team to DOM

function addTeamToDOM(team) {

    single_teamEl.innerHTML = `
        <div class="single-team">
            <h1>${team.strTeam}</h1>
            <img src="${team.strTeamBanner ? `${team.strTeamBanner}` : 'noImg.png'}" alt="${team.strTeam}"/>
            <div class="single-team-info">
                <img class="jersey" src="${team.strTeamJersey ? `${team.strTeamJersey}` : 'noImg.png'}" alt="${team.strTeam}"/>
                <h3>${team.strSport}</h3>
                <h3>${team.strLeague}</h3>
                <p>${team.strDescriptionEN}</p>
            </div>
        </div>

    `

}



teamsEl.addEventListener('click', e => {
    const teamInfo = e.path.find(item => {
        if(item.classList) {
            return item.classList.contains('team-info');
        } else {
            return false
        }
    });

    if(teamInfo) {
        const teamID = teamInfo.getAttribute('data-teamID')
        console.log(teamID)
        getTeamByID(teamID);
    }
})




single_teamEl.innerHTML = `
        <div class="single-team">
            <h1>${team.strTeam}</h1>
            <img src="${team.strTeamBanner ? `${team.strTeamBanner}` : 'noImg.png'}" alt="${team.strTeam}"/>
            <div class="single-team-info">
                <img class="jersey" src="${team.strTeamJersey ? `${team.strTeamJersey}` : 'noImg.png'}" alt="${team.strTeam}"/>
                <h3>${team.strSport}</h3>
                <h3>${team.strLeague}</h3>
                <p>${team.strDescriptionEN}</p>
            </div>
        </div>

    `

