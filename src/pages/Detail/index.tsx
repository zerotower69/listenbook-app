import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {ModalStackParamList} from '@/navigator/index';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({player}: RootState) => {
  // console.log('player', player);
  return {
    soundUrl: player.soundUrl,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<ModalStackParamList, 'Detail'>;
}
const Detail: React.FC<IProps> = props => {
  useEffect(() => {
    const {dispatch, route} = props;
    dispatch({
      type: 'player/fetchShow',
      payload: {
        id: route.params.id,
      },
    });
  }, []);

  return (
    <View>
      <Text>详情</Text>
    </View>
  );
};

export default connector(Detail);
