let cargarDatos = () => {
    let nombre
    let escritores

    fetch("https://dataserverdaw.herokuapp.com/escritores/xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");

            escritores = xml.getElementsByTagName('escritor')

            for(let escritor of escritores){
                let id = escritor.getElementsByTagName('id')[0].textContent
                nombre = escritor.getElementsByTagName('nombre')[0].textContent

                let plantilla = `<option value="${id}">${nombre}</options>`

                document.querySelector('div.input-group > select').innerHTML += plantilla
            }

        })
        .catch(console.error);


    const selectElement = document.querySelector('div.input-group > select')
    selectElement.addEventListener('change', (event) => {
        fetch("https://dataserverdaw.herokuapp.com/escritores/frases")
            .then(response => response.json())
            .then(data => {
                let select = document.querySelector('div.input-group > select')
                let id1 = select.value
                console.log(event.target.value)
                console.log(data.frases.value)
                console.log(id1);
                console.log(data)
                console.log(data.frases)
                console.log(data.frases[0])
                console.log(data.frases[0].id_autor)
                console.log(escritores[0].getElementsByTagName('nombre')[0].textContent)
                for(let escritor1 of escritores){
                    if(id1 == escritor1.getElementsByTagName('id')[0].textContent)
                        nombre = escritor1.getElementsByTagName('nombre')[0].textContent
                    
                }
                let i = 0;
                for(let i in data.frases){
                    if(id1 == data.frases[i].id_autor){
                        
                        let plantilla = `<div class="col-lg-3">
                        <div class="test-inner ">
                            <div class="test-author-thumb d-flex">
                                <div class="test-author-info">
                                    <h4>${nombre}</h4>                                            
                                </div>
                            </div>
                            <span>${data.frases[i].texto}</span>
                            <i class="fa fa-quote-right"></i>
                        </div>
                    </div>`
                        
                        document.querySelector('#frases').innerHTML += plantilla
                    }
                    i++;
                };
            
            })
        .catch(console.error);

        /*const result = document.querySelector('.result');
        result.textContent = `You like ${event.target.value}`;*/
      });



}

window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos()
});







