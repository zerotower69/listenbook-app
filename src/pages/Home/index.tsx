import {Text, View} from 'react-native';
import React from 'react';

interface IProps {}
interface IState {}
class Home extends React.Component<IProps, IState> {
  render() {
    return (
      <View>
        <Text>首页</Text>
      </View>
    );
  }
}

export default Home;
