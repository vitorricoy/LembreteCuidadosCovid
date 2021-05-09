import './info-local.scss';
import React from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, CardTitle, Text} from 'react-md';
import { UpdateDistanceService } from '../services/update_distance_service';

type InfoLocalState = {
    lat: number,
    lon: number,
    casaDefinida: boolean,
    latCasa: number,
    lonCasa: number
}

class InfoLocal extends React.Component<{}, InfoLocalState> {

    updateService: UpdateDistanceService;

    constructor(props: {}) {
        super(props)
        console.log(window.localStorage.getItem("casa"));
        if(window.localStorage.getItem("casa") !== null) {
            let jsonCasa = window.localStorage.getItem("casa")!;
            let dados = JSON.parse(jsonCasa);
            this.state = {
                lat: 0,
                lon: 0,
                latCasa: dados['lat'], 
                lonCasa: dados['lon'],
                casaDefinida: window.localStorage.getItem("casa") !== null
            };
        } else {
            this.state = {
                lat: 0,
                lon: 0,
                latCasa: 0,
                lonCasa: 0,
                casaDefinida: window.localStorage.getItem("casa") !== null
            };
        }
        this.updateService = new UpdateDistanceService();
    }

    tick() {
        navigator.geolocation.getCurrentPosition((position) => { 
            this.setState({
                lat: position.coords.latitude, 
                lon: position.coords.longitude
            });
        });
    }
    
    componentWillMount() {
        this.tick();
    }
    
    componentDidMount() {
        setInterval(() => this.tick(), 2000);
        document.title = 'Lembrete Covid';
    }

    salvarCasa() {
        this.setState({
            casaDefinida: true,
            latCasa: this.state.lat,
            lonCasa: this.state.lon
        });
        window.localStorage.setItem("casa", 
            JSON.stringify({
                'lat': this.state.lat, 
                'lon': this.state.lon
            })
        );

    }

    distancia(lat1: number, lon1: number, lat2: number, lon2: number) {
        let p = 0.017453292519943295;
        let c = Math.cos;
        let a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))/2;
        return 12742 * Math.asin(Math.sqrt(a));
    }

    calcularDistancia() {
        let distancia = this.distancia(this.state.lat, this.state.lon, this.state.latCasa, this.state.lonCasa);
        this.updateService.updateDistance(distancia);
        return distancia;
    }

    render() {
      if(this.state.casaDefinida) {
        return (
            <Card raiseable className='cartao'>
                <CardHeader>
                    <div className="centro">
                        <CardTitle>Localização</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <Text>
                        Você está a {this.calcularDistancia()} km de casa
                    </Text>
                </CardContent>
                <CardActions>
                    <Button onClick={() => this.salvarCasa()}>
                            Salvar Localização da Casa
                    </Button>
                </CardActions>
            </Card>
          );
      } else {
        return (
            <Card raiseable className='cartao'>
                <CardHeader className = "cabecalho">
                    <div className="centro">
                        <CardTitle>Localização</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <Text>
                        Você ainda não salvou a localização da casa. Clique no botão para salvá-la.
                    </Text>
                </CardContent>
                <CardActions>
                    <Button onClick={() => this.salvarCasa()}>
                            Salvar Localização da Casa
                    </Button>
                </CardActions>
            </Card>
        )
      }
    }
}


export default InfoLocal;