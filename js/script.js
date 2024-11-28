const api = 'https://restcountries.com/v3/all';
const countriesDiv = document.getElementById('countries-list');
let countriesToSort = [];
let sortedCountries;


const getcountriesInfo = async () => {
    try {
        const response = await fetch(api);
        const data = await response.json();
        //console.log(data);
        return data;
        
    } catch(error) {
        console.error('Error al obtener los datos', error);
    }
}

const orderInfo = (countriesInfo) => {
   
    //Obtengo la información de cada país
    for(const info of countriesInfo) {
       
        const {name: {common: countryName}, capital, flags, population, car: {side}} = info;
        const [png] = flags;

        //Meto la información de cada país en un objeto y luego en un array para ordenarlo por nombre alfabéticamente.            
        let sort = {
            nombre: countryName,
            capital: capital ? capital.join(', ') : 'N/A',
            bandera: png,
            población: population,
            conducción: side
        };
        //console.log(sort);
        
        countriesToSort.push(sort);
        //console.log(countriesToSort);

    }

    //Creo una función para ordenar el sortCountry alfabéticamente
    sortedCountries = countriesToSort.sort(function(a, b){
        if(a.nombre.toLowerCase() < b.nombre.toLowerCase()) { return -1; }
        if(a.nombre.toLowerCase() > b.nombre.toLowerCase()) { return 1; }
        return 0;
    })  
    //console.log(typeof sortCountries);
    //console.log(sortedCountries);

    //Muestro la información en pantalla        
    countriesDiv.innerHTML = sortedCountries.map(country => 
        `<div class="countryDiv">
                <img src="${country.bandera}" class="flag"  width="200" alt="Bandera de ${country.nombre}" />
                <h2>${country.nombre}</h2>
            </div>`
        )
}


const showMoreInfo = () => {
    document.body.addEventListener('click', (event) => {
    //console.log( event.target.alt)
    
    const filterArray = sortedCountries.filter(country => event.target.alt === `Bandera de ${country.nombre}`)
    //console.log(filterArray);
    
        if (filterArray.length > 0) {
            const country = filterArray[0];
    
            countriesDiv.innerHTML = `
                <div class='emergente'>
                    <p class="close">X</p>
                    <img src="${country.bandera}" width="200" alt="Bandera de ${country.nombre}" />
                    <p><strong>País:</strong> ${country.nombre}</p>
                    <p><strong>Capital:</strong> ${country.capital}</p>
                    <p><strong>Población:</strong> ${country.población} personas</p>
                    <p><strong>Lado de circulación:</strong> ${country.conducción}</p>
                </div>
                `             
                
        } 
    })
} 

//Esto no lo conseguí
document.body.addEventListener('click', (event) => {
    console.log(event);
    if(event.target === 'p')
    console.log('click')

})


getcountriesInfo().then(info => orderInfo(info));
showMoreInfo();