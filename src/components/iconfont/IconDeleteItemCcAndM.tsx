/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

export const IconDeleteItemCcAndM: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M713.4 776.3c-11.2 0-20.2-9.4-20.2-21V357.1c0-11.5 9-20.9 20.2-20.9 11.1 0 20.2 9.4 20.2 20.9v398.2c0 11.6-9.1 21-20.2 21m-202.6 0c-11.1 0-20.2-9.4-20.2-21V357.1c0-11.5 9.1-20.9 20.2-20.9 11.2 0 20.2 9.4 20.2 20.9v398.2c0 11.6-9.1 21-20.2 21m-202.6 0c-11.2 0-20.2-9.4-20.2-21V357.1c0-11.5 9-20.9 20.2-20.9s20.2 9.4 20.2 20.9v398.2c0 11.6-9 21-20.2 21M645.9 42.6c12.8 0 27.1 17.2 27.1 41.9v62.8H348.6V84.6c0-24.7 14.3-41.9 27.1-41.9h270.2m0-41.9H375.7c-37.3 0-67.5 37.5-67.5 83.9v104.8h405.2V84.7c0-46.4-30.3-83.9-67.5-83.9"
        fill={getIconColor(color, 0, '#808080')}
      />
      <Path
        d="M982.1 189.4H39.4c-11.1 0-20.2-9.4-20.2-20.9 0-11.5 9.1-20.9 20.2-20.9h942.7c11.2 0 20.2 9.4 20.2 20.9 0.1 11.5-9 20.9-20.2 20.9"
        fill={getIconColor(color, 1, '#808080')}
      />
      <Path
        d="M826.4 1013.7H195.1c-54.6 0-99.2-51-99.2-113.6V159.5h40.5v740.7c0 39.5 26.3 71.6 58.6 71.6h631.3c32.4 0 58.7-32.1 58.7-71.6V159.5h40.5v740.7c0.1 62.6-44.4 113.5-99.1 113.5"
        fill={getIconColor(color, 2, '#808080')}
      />
    </Svg>
  );
};

IconDeleteItemCcAndM.defaultProps = {
  size: 18,
};

export default IconDeleteItemCcAndM;
