document.addEventListener("DOMContentLoaded", () => {
    // 1. Lista de Usuarios
    fetchUsers();
    document.getElementById("searchUser").addEventListener("input", filterUsers);

    // 2. Noticias (Simuladas)
    document.getElementById("getNews").addEventListener("click", fetchNews);

    // 3. Clima (Simulado)
    document.getElementById("getWeather").addEventListener("click", fetchWeather);

    // 4. Conversor de Monedas (Simulado)
    document.getElementById("convertCurrency").addEventListener("click", convertCurrency);

    // 5. Galería de Imágenes (Simulada)
    document.getElementById("getImages").addEventListener("click", fetchImages);

    // 6. Pokédex
    document.getElementById("getPokemon").addEventListener("click", fetchPokemon);

    // 7. Películas (Simuladas)
    document.getElementById("getMovies").addEventListener("click", fetchMovies);

    // 8. Criptomonedas
    document.getElementById("getCrypto").addEventListener("click", fetchCrypto);

    // 9. Tareas
    document.getElementById("addTask").addEventListener("click", addTask);
    loadTasks();

    // 10. Países
    document.getElementById("getCountry").addEventListener("click", fetchCountry);
});

/////////////////////
// 1. Lista de Usuarios
async function fetchUsers() {
    const response = await fetch("https://randomuser.me/api/?results=10");
    const data = await response.json();
    displayUsers(data.results);
}

function displayUsers(users) {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${user.picture.thumbnail}" alt="Foto"></td>
            <td>${user.name.first} ${user.name.last}</td>
            <td>${user.email}</td>
        `;
        userList.appendChild(row);
    });
}

function filterUsers() {
    const search = document.getElementById("searchUser").value.toLowerCase();
    document.querySelectorAll("#userList tr").forEach(row => {
        const name = row.children[1].textContent.toLowerCase();
        row.style.display = name.includes(search) ? "" : "none";
    });
}

/////////////////////
// 2. Noticias (Simuladas)
function fetchNews() {
    const query = document.getElementById("searchNews").value.toLowerCase();
    const fakeNews = [
        { title: "Nueva IA revoluciona la tecnología", description: "Un avance en la inteligencia artificial..." },
        { title: "Lanzamiento del iPhone 15", description: "Apple presenta su nuevo modelo..." },
        { title: "Coches eléctricos dominan el mercado", description: "Las ventas se disparan un 50%..." }
    ];

    const filtered = fakeNews.filter(n => n.title.toLowerCase().includes(query));
    const newsList = document.getElementById("newsList");
    newsList.innerHTML = filtered.length ? filtered.map(article => `
        <div>
            <h4>${article.title}</h4>
            <p>${article.description}</p>
        </div>
    `).join("") : "<p>No se encontraron noticias.</p>";
}

/////////////////////
// 3. Clima (Simulado)
function fetchWeather() {
    const city = document.getElementById("cityInput").value;
    const fakeWeather = {
        "Madrid": { temp: 25, description: "Soleado" },
        "Londres": { temp: 18, description: "Nublado" },
        "Nueva York": { temp: 22, description: "Parcialmente nublado" }
    };

    const weather = fakeWeather[city] || { temp: "--", description: "Ciudad no encontrada" };
    document.getElementById("weatherResult").innerHTML = `
        <h3>${city}</h3>
        <p>Temperatura: ${weather.temp}°C</p>
        <p>Clima: ${weather.description}</p>
    `;
    localStorage.setItem("lastCity", city);
}

/////////////////////
// 4. Conversor de Monedas (Simulado)
function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const from = document.getElementById("fromCurrency").value.toUpperCase();
    const to = document.getElementById("toCurrency").value.toUpperCase();
    const fakeRates = { "USD": { "EUR": 0.9, "GBP": 0.8 }, "EUR": { "USD": 1.1, "GBP": 0.88 } };

    const rate = (fakeRates[from] && fakeRates[from][to]) || null;
    if (rate) {
        const result = amount * rate;
        document.getElementById("currencyResult").innerText = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
    } else {
        document.getElementById("currencyResult").innerText = "Conversión no disponible.";
    }
}

/////////////////////
// 5. Galería de Imágenes (Simulada)
function fetchImages() {
    const query = document.getElementById("searchImage").value;
    const gallery = document.getElementById("imageGallery");
    gallery.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
        const img = document.createElement("img");
        img.src = `https://via.placeholder.com/150?text=${query}+${i}`;
        gallery.appendChild(img);
    }
}

/////////////////////
// 6. Pokédex
async function fetchPokemon() {
    const pokemon = document.getElementById("searchPokemon").value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!response.ok) return alert("Pokémon no encontrado");
    const data = await response.json();
    document.getElementById("pokemonResult").innerHTML = `
        <h3>${data.name.toUpperCase()}</h3>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p>Altura: ${data.height}</p>
        <p>Peso: ${data.weight}</p>
        <p>Habilidades: ${data.abilities.map(a => a.ability.name).join(", ")}</p>
    `;
}

/////////////////////
// 7. Películas (Simuladas)
function fetchMovies() {
    const title = document.getElementById("searchMovie").value.toLowerCase();
    const fakeMovies = [
        { title: "Inception", year: "2010", poster: "https://via.placeholder.com/100?text=Inception" },
        { title: "Titanic", year: "1997", poster: "https://via.placeholder.com/100?text=Titanic" },
        { title: "Avatar", year: "2009", poster: "https://via.placeholder.com/100?text=Avatar" }
    ];

    const filtered = fakeMovies.filter(m => m.title.toLowerCase().includes(title));
    const movieList = document.getElementById("movieList");
    movieList.innerHTML = filtered.length ? filtered.map(movie => `
        <div>
            <h4>${movie.title} (${movie.year})</h4>
            <img src="${movie.poster}" alt="${movie.title}">
        </div>
    `).join("") : "<p>No se encontraron películas.</p>";
}

/////////////////////
// 8. Criptomonedas
async function fetchCrypto() {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd");
    const data = await response.json();
    document.getElementById("cryptoPrices").innerHTML = `
        <p>Bitcoin: $${data.bitcoin.usd}</p>
        <p>Ethereum: $${data.ethereum.usd}</p>
    `;
}

/////////////////////
// 9. Agenda de Tareas
function addTask() {
    const taskInput = document.getElementById("newTask");
    const task = taskInput.value;
    if (!task) return alert("Agrega una tarea");
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = task;
    li.addEventListener("click", () => { li.remove(); saveTasks(); });
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function saveTasks() {
    const tasks = [...document.querySelectorAll("#taskList li")].map(li => li.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        li.addEventListener("click", () => { li.remove(); saveTasks(); });
        document.getElementById("taskList").appendChild(li);
    });
}

/////////////////////
// 10. Datos de Países
async function fetchCountry() {
    const country = document.getElementById("searchCountry").value;
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!response.ok) return alert("País no encontrado");
    const data = await response.json();
    const countryData = data[0];
    document.getElementById("countryResult").innerHTML = `
        <h3>${countryData.name.common}</h3>
        <p>Capital: ${countryData.capital}</p>
        <p>Población: ${countryData.population.toLocaleString()}</p>
        <p>Continente: ${countryData.region}</p>
        <img src="${countryData.flags.svg}" alt="Bandera">
    `;
}
