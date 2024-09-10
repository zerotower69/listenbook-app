import React, {ComponentProps} from 'react';
import {
  Animated,
  FlatList,
  FlatListProps,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {hp, navigationRef, viewportWidth, wp} from '@/utils/index';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import SnapCarousel, {
  Pagination,
  ParallaxImage,
} from 'react-native-snap-carousel';
import {ICarousel} from '@/models/home';

interface AdditionalParallaxProps {
  carouselRef?: React.Component<FlatListProps<any>> | undefined;
  itemHeight?: number | undefined;
  itemWidth?: number | undefined;
  scrollPosition?: Animated.Value | undefined;
  sliderHeight?: number | undefined;
  sliderWidth?: number | undefined;
  vertical?: boolean | undefined;
}

const slideWidth = viewportWidth;
const sideWidth = wp(90);
export const sideHeight = hp(20);
const itemWidth = sideWidth + wp(2) * 2;

const mapStateToProps = (state: RootState) => {
  const route = navigationRef.current?.getCurrentRoute()?.params ?? {
    namespace: 'home',
  };
  // @ts-ignore
  const {namespace = 'home'} = route;
  const home = state[namespace];
  return {
    data: home.carousels,
    activeCarouselIndex: home.activeCarouselIndex,
  };
};
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  namespace: string;
}

const Carousel: React.FC<IProps> = props => {
  const {data, dispatch, namespace, activeCarouselIndex} = props;

  function onSnapToItem(index: number) {
    dispatch({
      type: namespace + '/setState',
      payload: {
        activeCarouselIndex: index,
      },
    });
  }

  const renderCarouselItem = (
    baseData: {item: unknown; index: number; dataIndex: number},
    props: {
      scrollPosition: Animated.Value | undefined;
      carouselRef: ScrollView | FlatList<ICarousel> | null;
      vertical: false;
      itemWidth: number;
      sliderWidth: number;
    },
  ) => {
    const item = baseData.item as ICarousel;
    return (
      <ParallaxImage
        key={item.id}
        source={{uri: item.image}}
        style={styles.image}
        containerStyle={styles.imageContainer}
        parallaxFactor={0.8}
        showSpinner
        spinnerColor="rgba(0,0,0,0.25)"
        {...props}
      />
    );
  };

  function renderPagination() {
    return (
      <View style={styles.paginationWrapper}>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeCarouselIndex}
          containerStyle={styles.paginationContainer}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dot}
          inactiveDotScale={0.7}
          inactiveDotOpacity={0.4}
        />
      </View>
    );
  }
  return (
    <View>
      {/*设置ref*/}
      <SnapCarousel
        data={data}
        renderItem={renderCarouselItem}
        sliderWidth={slideWidth}
        itemWidth={itemWidth}
        hasParallaxImages
        onSnapToItem={onSnapToItem}
        loop={true}
        autoplay={true}
        vertical={false}
      />
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: itemWidth,
    height: sideHeight,
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    top: -20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
});

export default connector(Carousel);
