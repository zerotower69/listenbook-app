/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconDeleteItemCcAndM from './IconDeleteItemCcAndM';
import IconLoading from './IconLoading';
import IconVolumeUp from './IconVolumeUp';
import IconFavoritesFill from './IconFavoritesFill';
import IconVolumeOff from './IconVolumeOff';
import IconPause from './IconPause';
import IconPlayArrow from './IconPlayArrow';
import IconFullscreen from './IconFullscreen';
import IconLijitingke from './IconLijitingke';
import IconBofang3 from './IconBofang3';
import IconPaste from './IconPaste';
import IconShangyishou from './IconShangyishou';
import IconXiayishou from './IconXiayishou';
import IconDown from './IconDown';
import IconBack from './IconBack';
import IconHuanyipi from './IconHuanyipi';
import IconXihuan from './IconXihuan';
import IconMore from './IconMore';
import IconShengyin from './IconShengyin';
import IconV from './IconV';
import IconUser from './IconUser';
import IconBofang from './IconBofang';
import IconPlay2 from './IconPlay2';
import IconTime from './IconTime';
import IconMessage from './IconMessage';
import IconBofang1 from './IconBofang1';
import IconBofang2 from './IconBofang2';
import IconFaxian from './IconFaxian';
import IconShijian from './IconShijian';
import IconShouye from './IconShouye';
import IconShoucang from './IconShoucang';

export type IconNames = 'DeleteItemCCAndM' | 'loading' | 'volume-up' | 'favorites-fill' | 'volume-off' | 'pause' | 'play-arrow' | 'fullscreen' | 'lijitingke' | 'bofang3' | 'paste' | 'shangyishou' | 'xiayishou' | 'down' | 'back' | 'huanyipi' | 'xihuan' | 'more' | 'shengyin' | 'V' | 'user' | 'bofang' | 'play2' | 'time' | 'message' | 'bofang1' | 'bofang2' | 'faxian' | 'shijian' | 'shouye' | 'shoucang';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

export const Icon: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'DeleteItemCCAndM':
      return <IconDeleteItemCcAndM {...rest} />;
    case 'loading':
      return <IconLoading {...rest} />;
    case 'volume-up':
      return <IconVolumeUp {...rest} />;
    case 'favorites-fill':
      return <IconFavoritesFill {...rest} />;
    case 'volume-off':
      return <IconVolumeOff {...rest} />;
    case 'pause':
      return <IconPause {...rest} />;
    case 'play-arrow':
      return <IconPlayArrow {...rest} />;
    case 'fullscreen':
      return <IconFullscreen {...rest} />;
    case 'lijitingke':
      return <IconLijitingke {...rest} />;
    case 'bofang3':
      return <IconBofang3 {...rest} />;
    case 'paste':
      return <IconPaste {...rest} />;
    case 'shangyishou':
      return <IconShangyishou {...rest} />;
    case 'xiayishou':
      return <IconXiayishou {...rest} />;
    case 'down':
      return <IconDown {...rest} />;
    case 'back':
      return <IconBack {...rest} />;
    case 'huanyipi':
      return <IconHuanyipi {...rest} />;
    case 'xihuan':
      return <IconXihuan {...rest} />;
    case 'more':
      return <IconMore {...rest} />;
    case 'shengyin':
      return <IconShengyin {...rest} />;
    case 'V':
      return <IconV {...rest} />;
    case 'user':
      return <IconUser {...rest} />;
    case 'bofang':
      return <IconBofang {...rest} />;
    case 'play2':
      return <IconPlay2 {...rest} />;
    case 'time':
      return <IconTime {...rest} />;
    case 'message':
      return <IconMessage {...rest} />;
    case 'bofang1':
      return <IconBofang1 {...rest} />;
    case 'bofang2':
      return <IconBofang2 {...rest} />;
    case 'faxian':
      return <IconFaxian {...rest} />;
    case 'shijian':
      return <IconShijian {...rest} />;
    case 'shouye':
      return <IconShouye {...rest} />;
    case 'shoucang':
      return <IconShoucang {...rest} />;
  }

  return null;
};

export default Icon;
