async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getTennisRankings() {
    const rankings = await fetchData('http://localhost:3000/rankings');
    console.log(rankings); // Log the entire response
    return rankings;
}

function createHeatmap(rankings) {
    const heatmapBody = document.getElementById('heatmapBody');
    rankings.rankings[0].competitor_rankings.forEach(entry => {
        console.log(entry); // Log each entry to debug

        const row = document.createElement('tr');

        const rankCell = document.createElement('td');
        rankCell.textContent = entry.rank;
        rankCell.className = 'rank';
        row.appendChild(rankCell);

        const playerCell = document.createElement('td');
        playerCell.textContent = entry.competitor.name;
        row.appendChild(playerCell);

        const pointsCell = document.createElement('td');
        pointsCell.textContent = entry.points;
        pointsCell.className = 'points';
        row.appendChild(pointsCell);

        const countryCell = document.createElement('td');
        countryCell.textContent = entry.competitor.country_code;
        countryCell.className = 'country';
        row.appendChild(countryCell);

        heatmapBody.appendChild(row);
    });

    // Hide the loading spinner and show the table
    document.getElementById('loading').classList.add('d-none');
    document.getElementById('rankingsTable').classList.remove('d-none');
}

getTennisRankings().then(rankings => {
    createHeatmap(rankings);
}).catch(error => {
    console.error('Error fetching data:', error);
    // Handle error and possibly show an error message
});
