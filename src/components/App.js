import './App.css';
import React from 'react';
import twitch from '../apis/twitch';
import StreamerList from './StreamerList';

const channels = [
  'ESL_SC2',
  'OgamingSC2',
  'cretetion',
  'freecodecamp',
  'storbeck',
  'habathcx',
  'RobotCaleb',
  'noobs2ninjas',
];

class App extends React.Component {
  state = {
    allChannels: [],
    onlineChannels: [],
    offlineChannels: [],
    listFilter: 'all',
  };

  componentDidMount = async () => {
    // Get all channels array
    const response = await twitch.get('/users', {
      params: {
        login: channels,
      },
    });
    // Set State
    this.setState({ allChannels: response.data.data });

    // Get channels which are streaming at the moment
    const streamsNow = (
      await twitch.get('/streams', {
        params: {
          user_login: channels,
        },
      })
    ).data.data;

    // Get online channels by comparing allChannels with streamsNow
    // We want to keep the same array structure as per this.state.allChannels
    // This is the reason why we are not using streamsNow ass the online array
    const online = this.state.allChannels.filter((obj) => {
      return streamsNow.some(function (obj2) {
        return obj.login === obj2.user_login;
      });
    });

    // Get offline channels by comparing allChannels with streamsNow
    const offline = this.state.allChannels.filter((obj) => {
      return !streamsNow.some(function (obj2) {
        return obj.login === obj2.user_login;
      });
    });

    // Set Final States
    this.setState({ onlineChannels: online });
    this.setState({ offlineChannels: offline });
  };

  renderList(filter) {
    if (filter === 'all') return <StreamerList list={this.state.allChannels} />;
    if (filter === 'online')
      return <StreamerList list={this.state.onlineChannels} />;
    if (filter === 'offline')
      return <StreamerList list={this.state.offlineChannels} />;
  }

  render() {
    return (
      <div className="app">
        <div className="container">
          <h1 className="title">Twitch Streamer</h1>
          <button onClick={() => this.setState({ listFilter: 'all' })}>
            All
          </button>
          <button onClick={() => this.setState({ listFilter: 'online' })}>
            Online
          </button>
          <button onClick={() => this.setState({ listFilter: 'offline' })}>
            Offline
          </button>
          {this.renderList(this.state.listFilter)}
        </div>
      </div>
    );
  }
}

export default App;
