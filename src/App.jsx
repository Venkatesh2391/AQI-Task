import React, { Component } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';
import moment from 'moment';
import CitiesTable from './components/CitiesTable';
import CityDialog from './components/CityDialog';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      selected: null,
      selectedViewType: null,
    };

    const client = new WebSocket('wss://city-ws.herokuapp.com');
    client.onopen = () => {
      console.log('WebSocket connected');
    };
    client.onmessage = (message) => {
      JSON.parse(message.data).forEach((cityData) => {
        const { data } = this.state;

        const newAQI = { date: moment(), aqi: cityData.aqi };

        const index = data.findIndex((cityAQI) => cityAQI.city === cityData.city);
        if (index > -1) {
          // Limiting to 3000 entries because so much data coming through websocket
          if (data[index].aqis.length >= 3000) {
            data[index].aqis = data[index].aqis.slice(-2999);
          }
          data[index].aqis.push(newAQI);
        } else {
          data.push({ city: cityData.city, aqis: [newAQI] });
        }

        data.sort((data1, data2) => data1.city.localeCompare(data2.city));

        this.setState({ data });
      });
    };
  }

  closeDialog = () => {
    this.setState({ selected: null });
  }

  render() {
    const { classes } = this.props;
    const { data, selected, selectedViewType } = this.state;

    return (
      <div>
        <CitiesTable
          data={data}
          onClick={(selectedCity) => {
            this.setState({ selected: selectedCity, selectedViewType: 'graph' });
          }}
        />

        {selected != null && (
          <CityDialog
            open={selected != null}
            cityData={selected}
            viewType={selectedViewType}
            onChangeViewType={(viewType) => {
              this.setState({ selectedViewType: viewType });
            }}
            onClose={() => {
              this.setState({ selected: null });
            }}
          />
        )}
      </div>
    );
  }
}

export default App;
