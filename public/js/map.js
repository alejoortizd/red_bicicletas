var map = L.map('main_map').setView([3.43722, -76.5225], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy: <a href:"https://www.openstreetmap.org/copyright">OpenStretMap</a> contributors'
}).addTo(map);

// var marker1 = L.marker([3.43722, -76.5325]).addTo(map);
// var marker = L.marker([3.427033, -76.531690]).addTo(map);
//marker.bindPopup("<b>Hola Mama</b><br>Ya llegue a casa.").openPopup();

//llamar a ajx

$.ajax({
    dataType: 'json',
    url: "api/bicicletas",
    success: result => {
        console.log(result);
        result.bicicletas.forEach(bici => {
            L.marker(bici.ubicacion, {title: bici.id}).addTo(map);
        })
    }
})