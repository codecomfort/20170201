/**
 * Created by hnait on 2017/02/01.
 */
import React, { Component } from 'react';
import { View, Text, NavigationExperimental } from 'react-native';

const { CardStack: NavigationCardStack } = NavigationExperimental;

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
      const routes = state.routes.slice();  // 新しい配列を生成
      routes.push(route);
      return {
        ...state, // この記述の意味が不明。文法的にも意味不明だし、ロジック的にも不明(この行削除しても動作する)
        index: routes.length - 1,
        routes
      }
    }
    case 'pop': {
      if (state.index <= 0) {
        return state;
      }

      const routes = state.routes.slice(0, -1); // 新しい配列を生成
      return {
        ...state,
        index: routes.length - 1,
        routes
      }
    }
    default:
      return state;
  }
}

class NavigationCardstackExample extends Component {
  state = { navState: reducer() }

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
    const { navState } = this.state;
    return (
      <NavigationCardStack
        navigationState={ navState }
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