import './InfoLocal.scss';
import React from 'react';
import {Button, Card, CardActions, Text} from 'react-md';

type InfoLocalState = {
    lat: number,
    lon: number,
    casaDefinida: boolean,
    latCasa: number,
    lonCasa: number
}

class InfoLocal extends React.Component<{}, InfoLocalState> {

    constructor(props: {}) {
        super(props)
        this.state = {
            lat: 0,
            lon: 0,
            latCasa: 0,
            lonCasa: 0,
            casaDefinida: window.localStorage.getItem("casa") !== null
        };
        if(this.state.casaDefinida) {
            var jsonCasa = window.localStorage.getItem("casa")!;
            var dados = JSON.parse(jsonCasa);
            this.setState({
                latCasa: dados['lat'], 
                lonCasa: dados['lon']
            });
        }
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
        var p = 0.017453292519943295;
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))/2;
        return 12742 * Math.asin(Math.sqrt(a));
    }

    calcularDistancia() {
        return this.distancia(this.state.lat, this.state.lon, this.state.latCasa, this.state.lonCasa);
    }

    render() {
      if(this.state.casaDefinida) {
        return (
            <Card className="md-block-centered cartao">
                <CardActions>
                    <Button onClick={() => this.salvarCasa()}>
                        <span>Salvar Localização da Casa</span>
                    </Button>
                </CardActions>
                <Text>
                    <p>Você está a {this.calcularDistancia()} km de casa</p>
                </Text>
            </Card>
        )
      } else {
          return (
            <Card className="md-block-centered">
                <CardActions>
                    <Button onClick={() => this.salvarCasa()}>
                        <span>Salvar Localização da Casa</span>
                    </Button>
                </CardActions>
            </Card>
          );
      }
    }
}


export default InfoLocal;