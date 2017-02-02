/**
 * Created by hnait on 2017/02/01.
 */
import React, { Component } from 'react';
import { View, Text, NavigationExperimental } from 'react-native';

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
  StateUtils: NavigationStateUtils
} = NavigationExperimental;

let styles = {};

const Home = ({ navigate }) => {  // 引数をブレースでくくる必要性は？
  return (
    <View style={styles.container}>
      <Text>Hello from Home</Text>
      <Text onPress={ () => navigate('push', { key: 'About' })}>Go To About</Text>
    </View>
  );
}

const About = ({ navigate }) => (
  <View style={styles.container}>
    <Text>Hello from About</Text>
    <Text onPress={ () => navigate('pop')}>Back</Text>
  </View>
);

function reducer(state, action, route) {
  if (!state) {
    return {  // initial State
      index: 0,
      routes: [ { key: 'Home' }]
    }
  }

  switch (action) {
    case 'push': {
      return NavigationStateUtils.push(state, route);
    }
    case 'pop': {
      return NavigationStateUtils.pop(state);
    }
    default:
      return state;
  }
}

class Header extends Component {
  _renderTitleComponent = (props) => {
    return (
      <NavigationHeader.Title>
        {props.scene.route.key}
      </NavigationHeader.Title>
    )
  }
  _back = () => {
    this.props.navigate('pop');
  }

  render() {
    return (
      <NavigationHeader
        {...this.props}
        renderTitleComponent={this._renderTitleComponent}
        onNavigateBack={this._back}
      />
    )
  }
}

class NavigationCardstackExample extends Component {
  state = { navState: reducer() }

  _renderHeader = (sceneProps) => {
    return (
      <Header
        navigate={this._navigate}
        {...sceneProps}
      />
    )
  }

  _renderScene = (props) => {
    switch (props.scene.route.key) {
      case 'Home':
        return <Home navigate={this._navigate} />
      case 'About':
        return <About navigate={this._navigate} />
    }
  }

  _navigate = (action, route) => {
    const navState = reducer(this.state.navState, action, route);
    this.setState({ navState });
  }

  render() {
    return (
      <NavigationCardStack
        renderHeader={this._renderHeader}
        navigationState={ this.state.navState }
        renderScene={ this._renderScene }
      />
    )
  }
}

styles = {
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
}

export default NavigationCardstackExample;