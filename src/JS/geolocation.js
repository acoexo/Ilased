function obtenerCiudad() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            
            var api_url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + lon;
            
            fetch(api_url)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de ubicación');
                }
                return response.json();
            })
            .then(function(data) {
                var ciudad = data.address.city;
                document.getElementById('geo-m').innerHTML = ciudad;
            })
            .catch(function(error) {
                console.error("Error al obtener la ciudad:", error);
            });
        });
    } else {
        console.log("La geolocalización no está soportada por este navegador.");
    }
}

obtenerCiudad();
