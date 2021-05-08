const { API_URL } = process.env;

class UpdateDistanceService {
    updateDistance(novaDistancia: Number) {
        if(window.localStorage.getItem("token_message") !== null) {
            let usuario = window.localStorage.getItem("token_message");
            fetch(API_URL!, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario: usuario,
                    distancia: novaDistancia,
                })
            }).catch((error) => { console.error(error);});
        }
    }
}

export {UpdateDistanceService};