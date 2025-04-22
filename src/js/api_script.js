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
        }
        else {
            getResults.innerHTML = response.status
        }
    }
    // cosas para wins^deaths
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
        }
        else {
            getResults.innerHTML = response.status
        }
    }
}








document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.toggle-buttons button');
    const sections = document.querySelectorAll('.leaderboard-section');
    sections.forEach(section => section.classList.remove('active'));

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');

            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.toggle('active'); // Show or hide the clicked section
                } else {
                    section.classList.remove('active'); // Hide all other sections
                }
            });
        });
    });
});



main()