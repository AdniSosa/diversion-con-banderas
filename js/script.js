const api = 'https://restcountries.com/v3/all';
const countriesDiv = document.getElementById('countries-list');
const divEmergente = document.getElementById('ventana-emergente');
const button = document.getElementById('close');
button.style.display = 'none';
divEmergente.style.display = 'none';
let countriesArr = [];



const getcountriesInfo = async () => {
    try {
        const response = await fetch(api);
        const data = await response.json();
        
        //ordeno la data alfabéticamente
        data.sort((a, b) => {
            return a.name.common.localeCompare(b.name.common);
        })

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
        
        //Meto la información de cada país en un objeto.          
        let countryInfo = {
            nombre: countryName,
            capital: capital ? capital.join(', ') : 'N/A',
            bandera: png,
            población: population,
            conducción: side 
        };
        
        //Hago push a array
        countriesArr.push(countryInfo);
        //console.log(countriesArr);
        
    }
    
    //Muestro la información en el HTML haciendo map del array     
    countriesDiv.innerHTML = countriesArr.map(country => 
         `<div class="countryDiv">
            <img src="${country.bandera}" class="flag"  width="200" alt="Bandera de ${country.nombre}" />
            <h2>${country.nombre}</h2>
        </div>`
    
    ).join(''); 
    
    
}


const showMoreInfo = () => {
    
    document.body.addEventListener('click', (event) => {
        //console.log( 'click')
    
        const filterArray = countriesArr.filter(country => event.target.alt === `Bandera de ${country.nombre}`)
        //console.log(filterArray);
        
        if (filterArray.length > 0) {
            const country = filterArray[0];
            divEmergente.style.display = 'block';
            button.style.display = 'block';

            divEmergente.innerHTML = `
                    <img src="${country.bandera}" width="200" alt="Bandera de ${country.nombre}" />
                    <p><strong>País:</strong> ${country.nombre}</p>
                    <p><strong>Capital:</strong> ${country.capital}</p>
                    <p><strong>Población:</strong> ${country.población} personas</p>
                    <p><strong>Lado de circulación:</strong> ${country.conducción}</p>
                
                `             
        }    
            
    })    
   
}  

//Botón para cerrar la ventana emergente.
button.addEventListener('click', () => {
   //console.log(event);
   divEmergente.style.display = 'none';
   button.style.display = 'none';

})


getcountriesInfo().then(info => orderInfo(info));
showMoreInfo();