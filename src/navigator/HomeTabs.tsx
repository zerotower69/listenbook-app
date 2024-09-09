import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import Found from '@/pages/Found';

export type HomeParamList = {
  [Key: string]: {
    namespace: string;
  };
};
const Tab = createMaterialTopTabNavigator<HomeParamList>();

const mapStateToProps = (state: RootState) => {
  const {home, category} = state;
  // console.log(category);
  return {
    gradientVisible: home.gradientVisible,
    // myCategories: category.myCategories,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

export interface HomeTabsProps extends ModelState {
  name: string;
}
const HomeTabs: React.FC<HomeTabsProps> = props => {
  return (
    <Tab.Screen
      name="Home"
      component={Found}
      options={{
        tabBarLabel: 'Home',
      }}
    />
  );
};

export default connector(HomeTabs);
