import Sound from 'react-native-sound';

Sound.setCategory('Playback');

let sound: Sound;

const init = (url: string) => {
  return new Promise((resolve, reject) => {
    sound = new Sound(url, Sound.MAIN_BUNDLE, error => {
      if (error) {
        reject(error);
      } else {
        resolve(void 0);
      }
    });
  });
};

//播放，直到播放完成才会返回
const play = () => {
  return new Promise((resolve, reject) => {
    if (sound) {
      sound.play(success => {
        if (success) {
          resolve(void 0);
        } else {
          reject(new Error('播放失败'));
        }
        //释放资源
        sound.release();
      });
    } else {
      //没有sound值也reject
      reject(new Error('播放失败'));
    }
  });
};

const pause = () => {
  return new Promise(resolve => {
    if (sound) {
      sound.pause(() => {
        resolve(void 0);
      });
    } else {
      resolve(void 0);
    }
  });
};

//获取当前播放时间
const getCurrentTime = () => {
  return new Promise(resolve => {
    if (sound && sound.isLoaded()) {
      sound.getCurrentTime(resolve);
    } else {
      resolve(0);
    }
  });
};

//获取音频时长
const getDuration = () => {
  if (sound) {
    return sound.getDuration();
  } else {
    return 0;
  }
};

export {init, play, pause, getDuration, getCurrentTime};
