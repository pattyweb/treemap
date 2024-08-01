async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getTennisRankings() {
    const rankings = await fetchData('http://localhost:3000/rankings');
    return rankings;
}

function updateColumns(data) {
    const countries = {};

    data.rankings[0].competitor_rankings.forEach(entry => {
        const country = entry.competitor.country;
        if (!countries[country]) {
            countries[country] = {
                count: 0,
                highestRanking: entry.rank,
                topPlayer: entry.competitor.name,
                topPlayerRank: entry.rank
            };
        }
        countries[country].count += 1;
        if (entry.rank < countries[country].highestRanking) {
            countries[country].highestRanking = entry.rank;
            countries[country].topPlayer = entry.competitor.name;
            countries[country].topPlayerRank = entry.rank;
        }
    });

    const countriesArray = Object.keys(countries).map(country => ({
        name: country,
        value: countries[country].count,
        highestRanking: countries[country].highestRanking,
        topPlayer: countries[country].topPlayer,
        topPlayerRank: countries[country].topPlayerRank
    })).sort((a, b) => b.value - a.value);

    const mostPlayers = countriesArray.slice(0, 6);
    const leastPlayers = countriesArray.slice(-6);

    document.querySelector('#most-players-first .node').innerHTML = `${mostPlayers[0].name} (${mostPlayers[0].value})<div class="info-box">Top Player: ${mostPlayers[0].topPlayer}<br>Rank: ${mostPlayers[0].topPlayerRank}</div>`;
    document.querySelector('#most-players-second-third .node.second').innerHTML = `${mostPlayers[1].name} (${mostPlayers[1].value})<div class="info-box">Top Player: ${mostPlayers[1].topPlayer}<br>Rank: ${mostPlayers[1].topPlayerRank}</div>`;
    document.querySelector('#most-players-second-third .node.third').innerHTML = `${mostPlayers[2].name} (${mostPlayers[2].value})<div class="info-box">Top Player: ${mostPlayers[2].topPlayer}<br>Rank: ${mostPlayers[2].topPlayerRank}</div>`;
    document.querySelector('#most-players-fourth-fifth-sixth .node.fourth').innerHTML = `${mostPlayers[3].name} (${mostPlayers[3].value})<div class="info-box">Top Player: ${mostPlayers[3].topPlayer}<br>Rank: ${mostPlayers[3].topPlayerRank}</div>`;
    document.querySelector('#most-players-fourth-fifth-sixth .node.fifth').innerHTML = `${mostPlayers[4].name} (${mostPlayers[4].value})<div class="info-box">Top Player: ${mostPlayers[4].topPlayer}<br>Rank: ${mostPlayers[4].topPlayerRank}</div>`;
    document.querySelector('#most-players-fourth-fifth-sixth .node.sixth').innerHTML = `${mostPlayers[5].name} (${mostPlayers[5].value})<div class="info-box">Top Player: ${mostPlayers[5].topPlayer}<br>Rank: ${mostPlayers[5].topPlayerRank}</div>`;

    document.querySelector('#least-players .node.first').innerHTML = `${leastPlayers[0].name} (${leastPlayers[0].value})<div class="info-box">Top Player: ${leastPlayers[0].topPlayer}<br>Rank: ${leastPlayers[0].topPlayerRank}</div>`;
    document.querySelector('#least-players .node.second').innerHTML = `${leastPlayers[1].name} (${leastPlayers[1].value})<div class="info-box">Top Player: ${leastPlayers[1].topPlayer}<br>Rank: ${leastPlayers[1].topPlayerRank}</div>`;
    document.querySelector('#least-players .node.third').innerHTML = `${leastPlayers[2].name} (${leastPlayers[2].value})<div class="info-box">Top Player: ${leastPlayers[2].topPlayer}<br>Rank: ${leastPlayers[2].topPlayerRank}</div>`;
    document.querySelector('#least-players .node.fourth').innerHTML = `${leastPlayers[3].name} (${leastPlayers[3].value})<div class="info-box">Top Player: ${leastPlayers[3].topPlayer}<br>Rank: ${leastPlayers[3].topPlayerRank}</div>`;
    document.querySelector('#least-players .node.fifth').innerHTML = `${leastPlayers[4].name} (${leastPlayers[4].value})<div class="info-box">Top Player: ${leastPlayers[4].topPlayer}<br>Rank: ${leastPlayers[4].topPlayerRank}</div>`;
    document.querySelector('#least-players .node.sixth').innerHTML = `${leastPlayers[5].name} (${leastPlayers[5].value})<div class="info-box">Top Player: ${leastPlayers[5].topPlayer}<br>Rank: ${leastPlayers[5].topPlayerRank}</div>`;
}

getTennisRankings().then(updateColumns);
