/*
Script Name
- api_script.js

Team members 
- Mauricio Monroy 
- Hector Lugo
- Nicolás Quintana

Purpose
- Handles frontend interactions with a backend API for a video game database.
- Imagined to allow CRUD operations by sending HTTP requests and updating webpage based on responses. 
*/


/**
 * @param {number} alpha Indicated the transparency of the color
 * @returns {string} A string of the form 'rgba(240, 50, 123, 1.0)' that represents a color
 */
function random_color(alpha = 1.0) {
    const r_c = () => Math.round(Math.random() * 255)
    return `rgba(${r_c()}, ${r_c()}, ${r_c()}, ${alpha}`
}
Chart.defaults.font.size = 20;
Chart.defaults.font.family = 'PressStart2P';

function timeStringToSeconds(timeString) {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
}

function main() {
    // cosas para Player
    document.getElementById('formSelectUser').onsubmit = async (e) => {
        e.preventDefault()

        const data = new FormData(formSelectUser)
        console.log(data)
        const dataObj = Object.fromEntries(data.entries())
        console.log(dataObj)

        let response = await fetch(`http://localhost:5000/api/player/${dataObj['player_id']}`, {
            method: 'GET'
        })

        if (response.ok) {
            let results = await response.json()
            if (results.length > 0) {
                const headers = Object.keys(results[0])
                const values = Object.values(results)
                let table = document.createElement("table")
                let tr = table.insertRow(-1)
                for (const header of headers) {
                    let th = document.createElement("th")
                    th.innerHTML = header
                    tr.appendChild(th)
                }
                for (const row of values) {
                    let tr = table.insertRow(-1)
                    for (const key of Object.keys(row)) {
                        let tabCell = tr.insertCell(-1)
                        tabCell.innerHTML = row[key]
                    }
                }
                const container = document.getElementById('getResultsID')
                container.innerHTML = ''
                container.appendChild(table)
            }
            else {
                const container = document.getElementById('getResultsID')
                container.innerHTML = 'No results to show.'
            }
        }
        else {
            getResults.innerHTML = response.status
        }
        try {
            const data = new FormData(formSelectUser)
            console.log(data)
            const dataObj = Object.fromEntries(data.entries())
            console.log(dataObj)
            let players_response = await fetch(`http://localhost:5000/api/player/${dataObj['player_id']}`, {
                method: 'GET'
            })
            if (players_response.ok) {
                console.log('Response is ok. Converting to JSON.')

                let results = await players_response.json()

                console.log(results)
                console.log('Data converted correctly. Plotting chart.')
                if (window.levelChart1) {
                    window.levelChart1.destroy();
                }
                if (results.length === 1) {
                    const player = results[0];
                    const playerName = player['Username'];
                    const score = player['High Score'];
                    const time = timeStringToSeconds(player['Record Time']);

                    const ctx_levels1 = document.getElementById('playersCanvas').getContext('2d');
                    window.levelChart1 = new Chart(ctx_levels1, {
                        type: 'bar',
                        data: {
                            labels: ['High Score', 'Time (s)'],
                            datasets: [
                                {
                                    label: 'High Score',
                                    data: [score, null],
                                    backgroundColor: 'rgb(229, 210, 152)',
                                    borderColor: 'rgb(232,199,102)',
                                    borderWidth: 1,
                                    yAxisID: 'y-score'
                                },
                                {
                                    label: 'Time (s)',
                                    data: [null, time],
                                    backgroundColor: 'rgba(200, 200, 200, 0.5)',
                                    borderColor: 'rgba(200, 200, 200, 1)',
                                    borderWidth: 1,
                                    yAxisID: 'y-time'
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' },
                                title: { display: true, text: `High Score & Time for ${playerName}` }
                            },
                            scales: {
                                'y-score': {
                                    type: 'linear',
                                    position: 'left',
                                    beginAtZero: true,
                                    title: { display: true, text: 'Score' }
                                },
                                'y-time': {
                                    type: 'linear',
                                    position: 'right',
                                    beginAtZero: true,
                                    title: { display: true, text: 'Time (s)' },
                                    grid: { drawOnChartArea: false }
                                }
                            }
                        }
                    });
                } 
                else {
                    const players_names = results.map(e => e['Username'])
                    const players_colors = results.map(e => random_color(0.8))
                    const players_borders = results.map(e => 'rgba(0, 0, 0, 1.0)')
                    const players_completion = results.map(e => e['High Score'])
                    const ctx_levels1 = document.getElementById('playersCanvas').getContext('2d');
                    window.levelChart1 = new Chart(ctx_levels1, {
                        type: 'bar',
                        data: {
                            labels: players_names,
                            datasets: [
                                {
                                    label: 'High Scores',
                                    backgroundColor: players_colors,
                                    borderColor: players_borders,
                                    data: players_completion
                                }
                            ]
                        }
                    })
                }
            }
        }
        catch (error) {
            console.log(error)
        }

    }
    /*
        document.getElementById('formInsert').onsubmit = async(e)=>
        {
            e.preventDefault()
    
            const data = new FormData(formInsert)
            const dataObj = Object.fromEntries(data.entries())
    
            let response = await fetch('http://localhost:5000/api/player',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataObj)
            })
            
            if(response.ok)
            {
                let results = await response.json()
            
                console.log(results)
                postResults.innerHTML = results.message + ' player_id: ' + results.player_id
            }
            else{
                postResults.innerHTML = response.status
            }
        }
    
        document.getElementById('formUpdate').onsubmit = async(e)=>
        {
            e.preventDefault()
    
            const data = new FormData(formUpdate)
            const dataObj = Object.fromEntries(data.entries())
            console.log(dataObj)
            let response = await fetch('http://localhost:5000/api/player',{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataObj)
            })
            
            if(response.ok)
            {
                let results = await response.json()
            
                console.log(results)
                putResults.innerHTML = results.message
            }
            else{
                putResults.innerHTML = response.status
            }
        }
    
        document.getElementById('formDelete').onsubmit = async(e)=>
        {
            e.preventDefault()
    
            const data = new FormData(formDelete)
            
            const dataObj = Object.fromEntries(data.entries())
    
            console.log(data, dataObj);
            let response = await fetch(`http://localhost:5000/api/player/${dataObj['player_id']}`,{
                method: 'DELETE'
            })
            
            if(response.ok)
            {
                let results = await response.json()
            
                deleteResults.innerHTML = results.message
            }
            else
            {
                deleteResults.innerHTML = `Error!\nStatus: ${response.status}`
            }
        }
    */

    // cosas para player_runstats
    document.getElementById('formSelectRunStats').onsubmit = async (e) => {
        e.preventDefault()

        const data = new FormData(formSelectRunStats)
        console.log(data)
        const dataObj = Object.fromEntries(data.entries())
        console.log(dataObj)

        let response = await fetch(`http://localhost:5000/api/player_runstats/${dataObj['run_id']}`, {
            method: 'GET'
        })

        if (response.ok) {
            let results = await response.json()
            if (results.length > 0) {
                const headers = Object.keys(results[0])
                const values = Object.values(results)
                let table = document.createElement("table")
                let tr = table.insertRow(-1)
                for (const header of headers) {
                    let th = document.createElement("th")
                    th.innerHTML = header
                    tr.appendChild(th)
                }
                for (const row of values) {
                    let tr = table.insertRow(-1)
                    for (const key of Object.keys(row)) {
                        let tabCell = tr.insertCell(-1)
                        tabCell.innerHTML = row[key]
                    }
                }
                const container = document.getElementById('getResultsRun')
                container.innerHTML = ''
                container.appendChild(table)
            }
            else {
                const container = document.getElementById('getResultsRun')
                container.innerHTML = 'No results to show.'
            }
            const ctx = document.getElementById('runsCanvas').getContext('2d');

            if (window.runsWinsChart) {
                window.runsWinsChart.destroy();
            }

            if (results.length === 1) {
                const user = results[0];
                const wins = user['Wins'];
                const runs = user['Runcount'];
                const losses = runs - wins;

                console.log("pie chart:", user.username);

                window.runsWinsChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Wins', 'Losses'],
                        datasets: [{
                            data: [wins, losses],
                            backgroundColor: [
                                'rgb(232,199,102)', 
                                '#8b4513'
                            ],
                            borderColor: [
                                'rgb(232,199,102)',
                                '#8b4513'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    color: 'rgb(232,199,102)'  
                                }
                            },
                            title: {
                                display: true,
                                text: `Wins vs Losses for ${user['username']}`,
                                color: 'rgb(232,199,102)' 
                            }
                        }
                    }
                });
            } else {
                const usernames = results.map(e => e['Username']);
                const runs = results.map(e => e['Runcount']);
                const wins = results.map(e => e['Wins']);

                console.log("Drawing bar chart for users:", usernames);

                window.runsWinsChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: usernames,
                        datasets: [
                            {
                                label: 'Runs',
                                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                data: runs
                            },
                            {
                                label: 'Wins',
                                backgroundColor: 'rgba(255, 206, 86, 0.7)',
                                borderColor: 'rgba(255, 206, 86, 1)',
                                data: wins
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Runs vs Wins per Player' }
                        },
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }
                });
            }
        }
        else {
            getResults.innerHTML = response.status
        }
    }
    // cosas para level stats
    /*
    document.getElementById('formSelectLevelStats').onsubmit = async (e) => {
        e.preventDefault()

        const data = new FormData(formSelectLevelStats)
        console.log(data)
        const dataObj = Object.fromEntries(data.entries())
        console.log(dataObj)

        let response = await fetch(`http://localhost:5000/api/level_layout/${dataObj['level_id']}`, {
            method: 'GET'
        })

        if (response.ok) {
            let results = await response.json()
            if (results.length > 0) {
                const headers = Object.keys(results[0])
                const values = Object.values(results)
                let table = document.createElement("table")
                let tr = table.insertRow(-1)
                for (const header of headers) {
                    let th = document.createElement("th")
                    th.innerHTML = header
                    tr.appendChild(th)
                }
                for (const row of values) {
                    let tr = table.insertRow(-1)
                    for (const key of Object.keys(row)) {
                        let tabCell = tr.insertCell(-1)
                        tabCell.innerHTML = row[key]
                    }
                }
                const container = document.getElementById('getResultsLevel')
                container.innerHTML = ''
                container.appendChild(table)
            }
            else {
                const container = document.getElementById('getResultsLevel')
                container.innerHTML = 'No results to show.'
            }
        }
        else {
            getResultsLevel.innerHTML = response.status
        }
    }
    */
    // cosas para winsvsdeaths
    /*
    document.getElementById('formSelectWinsDeaths').onsubmit = async (e) => {
        e.preventDefault()

        const data = new FormData(formSelectWinsDeaths)
        console.log(data)
        const dataObj = Object.fromEntries(data.entries())
        console.log(dataObj)

        let response = await fetch(`http://localhost:5000/api/winsvsdeaths/${dataObj['username']}`, {
            method: 'GET'
        })

        if (response.ok) {
            let results = await response.json()
            if (results.length > 0) {
                const headers = Object.keys(results[0])
                const values = Object.values(results)
                let table = document.createElement("table")
                let tr = table.insertRow(-1)
                for (const header of headers) {
                    let th = document.createElement("th")
                    th.innerHTML = header
                    tr.appendChild(th)
                }
                for (const row of values) {
                    let tr = table.insertRow(-1)
                    for (const key of Object.keys(row)) {
                        let tabCell = tr.insertCell(-1)
                        tabCell.innerHTML = row[key]
                    }
                }
                const container = document.getElementById('getResultsWinsDeaths')
                container.innerHTML = ''
                container.appendChild(table)       
            }
            else {
                const container = document.getElementById('getResultsWinsDeaths')
                container.innerHTML = 'No results to show.'
            }
            
        }
        else {
            getResults.innerHTML = response.status
        }
    }
        */
    // cosas para Favorite card
    document.getElementById('formSelectCard').onsubmit = async (e) => {
        e.preventDefault()

        const data = new FormData(formSelectCard)
        console.log(data)
        const dataObj = Object.fromEntries(data.entries())
        console.log(dataObj)

        let response = await fetch(`http://localhost:5000/api/favoritecard/${dataObj['username']}`, {
            method: 'GET'
        })

        if (response.ok) {
            let results = await response.json()
            if (results.length > 0) {
                const headers = Object.keys(results[0])
                const values = Object.values(results)
                let table = document.createElement("table")
                let tr = table.insertRow(-1)
                for (const header of headers) {
                    let th = document.createElement("th")
                    th.innerHTML = header
                    tr.appendChild(th)
                }
                for (const row of values) {
                    let tr = table.insertRow(-1)
                    for (const key of Object.keys(row)) {
                        let tabCell = tr.insertCell(-1)
                        tabCell.innerHTML = row[key]
                    }
                }
                const container = document.getElementById('getResultsFavoriteCard')
                container.innerHTML = ''
                container.appendChild(table)
            }
            else {
                const container = document.getElementById('getResultsFavoriteCard')
                container.innerHTML = 'No results to show.'
            }
            console.log(results);
            const cardName = results[0]["Favorite Card"];
            const img = new Image();
            if (cardName == 'Calavera') img.src = "../assets/cards/cardCalavera.png";
            else if (cardName == 'Machete') img.src = "../assets/cards/cardMachete.png";
            else if (cardName == 'ObsidianKnife') img.src = "../assets/cards/cardObsidianKnife.png";
            else if (cardName == 'Corazon') img.src = "../assets/cards/cardHeart.jpeg";
            else if (cardName == 'Valiente') img.src = "../assets/cards/cardValiente.png";
            else if (cardName == 'Taco') img.src = "../assets/cards/cardTaco.png";
            else if (cardName == 'Mariachi') img.src = "../assets/cards/cardMariachi.jpeg";
            else if (cardName == 'MayanWarrior') img.src = "../assets/cards/cardGuerrero.png";

            img.onload = function () {
                const ctx = document.getElementById('favoriteCardCanvas').getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.drawImage(img, (ctx.canvas.width - 80) / 2, 0, 80, 150);
            };
        }
        else {
            getResults.innerHTML = response.status
        }
    }
    // cosas para wins^deaths
    /*
    document.getElementById('formSelectWinsDeaths').onsubmit = async (e) => {
        e.preventDefault()

        const data = new FormData(formSelectWinsDeaths)
        console.log(data)
        const dataObj = Object.fromEntries(data.entries())
        console.log(dataObj)

        let response = await fetch(`http://localhost:5000/api/winsvsdeaths/${dataObj['username']}`, {
            method: 'GET'
        })

        if (response.ok) {
            let results = await response.json()
            if (results.length > 0) {
                const headers = Object.keys(results[0])
                const values = Object.values(results)
                let table = document.createElement("table")
                let tr = table.insertRow(-1)
                for (const header of headers) {
                    let th = document.createElement("th")
                    th.innerHTML = header
                    tr.appendChild(th)
                }
                for (const row of values) {
                    let tr = table.insertRow(-1)
                    for (const key of Object.keys(row)) {
                        let tabCell = tr.insertCell(-1)
                        tabCell.innerHTML = row[key]
                    }
                }
                const container = document.getElementById('getResultsWinsDeaths')
                container.innerHTML = ''
                container.appendChild(table)
            }
            else {
                const container = document.getElementById('getResultsWinsDeaths')
                container.innerHTML = 'No results to show.'
            }
        }
        else {
            getResults.innerHTML = response.status
        }
    }
        */
    // cosas para Nemesis
    document.getElementById('formSelectNemesis').onsubmit = async (e) => {
        e.preventDefault()

        const data = new FormData(formSelectNemesis)
        console.log(data)
        const dataObj = Object.fromEntries(data.entries())
        console.log(dataObj)
        let response = await fetch(`http://localhost:5000/api/nemesis/${dataObj['username']}`, {
            method: 'GET'
        })
        if (response.ok) {
            let results = await response.json()
            if (results.length > 0) {
                const headers = Object.keys(results[0])
                const values = Object.values(results)
                let table = document.createElement("table")
                let tr = table.insertRow(-1)
                for (const header of headers) {
                    let th = document.createElement("th")
                    th.innerHTML = header
                    tr.appendChild(th)
                }
                for (const row of values) {
                    let tr = table.insertRow(-1)
                    for (const key of Object.keys(row)) {
                        let tabCell = tr.insertCell(-1)
                        tabCell.innerHTML = row[key]
                    }
                }
                const container = document.getElementById('getResultsNemesis')
                container.innerHTML = ''
                container.appendChild(table)
            }
            else {
                const container = document.getElementById('getResultsNemesis')
                container.innerHTML = 'No results to show.'
            }
            const enemyName = results[0]["Enemy"];
            let img = new Image();
            console.log(img);
            img.width = 0;
            img.height = 0;
            if (enemyName == 'Mariachi') {
                img.src = "../assets/charSpritesheets/enemyThumbnails/mariachiThumb.png";
                img.width = 232;
                img.height = 224;
            }
            else if (enemyName == 'Tlaxcalteca') {
                img.src = "../assets/charSpritesheets/enemyThumbnails/skelThumb.png";
                img.width = 264;
                img.height = 274;
            }
            else if (enemyName == 'Mayan Warrior') {
                img.src = "../assets/charSpritesheets/enemyThumbnails/warriorThumb.png";
                img.width = 152;
                img.height = 253;
            }
            else if (enemyName == 'Devil') {
                img.src = "../assets/charSpritesheets/enemyThumbnails/devilThumb.png";
                img.width = 263;
                img.height = 208;
            }
            else if (enemyName == 'Quetzalcoatl') {
                img.src = "../assets/charSpritesheets/enemyThumbnails/quetzThumb.png";
                img.width = 210;
                img.height = 309;
            }
            else if (enemyName == 'Ah Puch') {
                img.src = "../assets/charSpritesheets/enemyThumbnails/ahThumb.png";
                img.width = 213;
                img.height = 290;
            }
            img.onload = function () {
                const ctx = document.getElementById('nemesisCanvas').getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.drawImage(img, (ctx.canvas.width - img.width) / 2 + 5, 5, img.width - 10, ctx.canvas.height - 10);
                console.log(ctx.canvas.width, ctx.canvas.height);
                console.log((ctx.canvas.width - img.width) / 2, 0, img.width, ctx.canvas.height);
            };
        }
        else {
            getResults.innerHTML = response.status
        }
    }

    document.getElementById('formSelectProgression').onsubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(formSelectProgression);
        const dataObj = Object.fromEntries(data.entries());
        const username = dataObj['username']?.trim();
        let response = await fetch(`http://localhost:5000/api/progression`, { method: 'GET' });

        if (response.ok) {
            let results = await response.json();
            if (results.length > 0) {
                let filtered = username
                    ? results.filter(row => row.username === username)
                    : results;
                const allDates = [...new Set(filtered.map(r => r.run_start))]
                    .sort((a, b) => new Date(a) - new Date(b));
                const labels = allDates.map(date =>
                    new Date(date).toLocaleString().replace(',', '')
                );
                const grouped = {};
                filtered.forEach(row => {
                    if (!grouped[row.username]) grouped[row.username] = {};
                    grouped[row.username][row.run_start] = row.score;
                });
                const datasets = Object.entries(grouped).map(([usname, dateScoreMap]) => ({
                    label: `${usname}'s Progression`,
                    data: allDates.map(date => dateScoreMap[date] ?? null),
                    borderColor: random_color(0.8),
                    fill: false,
                    tension: 0
                }));

                const ctx = document.getElementById('progressionCanvas').getContext('2d');
                if (window.progressionChart) window.progressionChart.destroy();
                window.progressionChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: datasets
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { position: 'top', labels: { color: 'rgb(255,255,255)' } },
                            title: {
                                display: true,
                                text: 'Player Progression Over Time',
                                color: 'rgb(255,255,255)'
                            }
                        },
                        scales: {
                            x: {
                                title: { display: true, text: 'Date [Timestamp]', color: 'rgb(255,255,255)' },
                                ticks: {
                                    color: 'rgb(232,199,102)',
                                    maxRotation: 70,
                                    minRotation: 45,
                                    callback: function (value, index) { //https://www.chartjs.org/docs/latest/axes/labelling.html
                                        const showEvery = 3;
                                        return index % showEvery === 0 ? this.getLabelForValue(value) : '';
                                    },
                                    font: {
                                        size: 12
                                    }
                                },
                                grid: { color: 'rgba(232,200,102,0.04)' }
                            },
                            y: {
                                beginAtZero: true,
                                title: { display: true, text: 'Score', color: 'rgb(255,255,255)' },
                                ticks: { color: 'rgb(214,203,170)' },
                                grid: { color: 'rgba(232,199,102,0.2)' }
                            }
                        }
                    }
                });
            } else {
                document.getElementById('getResultsProgression').innerHTML = 'No results to show.';
            }
        } else {
            console.error('Failed to fetch progression data.');
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.toggle-buttons button');
    const sections = document.querySelectorAll('.leaderboard-section');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            sections.forEach(section => {
                section.style.display = 'none';
            });
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'flex';
            }
        });
    });
});


main()