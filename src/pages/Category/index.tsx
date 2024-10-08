import {Animated, StyleSheet, Text, View, Alert} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import React, {useEffect, useState} from 'react';
import {ICategory} from '@/models/category';
import Touchable from '@/components/Touchable';
import CategoryItem from '@/pages/Category/CategoryItem';
import _ from 'lodash';
import ScrollView = Animated.ScrollView;
import HeaderRightButton from '@/pages/Category/HeaderRightButton';

const mapStateToProps = ({category}: RootState) => {
  return {
    myCategories: category.myCategories,
    categories: category.categories,
    isEdit: category.isEdit,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

interface IState {
  myCategories: ICategory[];
}

//确定不能移除的选项,推荐和VIP是固定的
const fixedItems = [0, 1];

const Category: React.FC<IProps> = props => {
  const {dispatch, isEdit} = props;
  const [myCategories, setMyCategories] = useState([...props.myCategories]);

  //点击完成按钮后
  function onSubmit() {
    console.log('submit', myCategories);
    dispatch({
      type: 'category/toggle',
      payload: {
        //将我选择的分类提交到dva进而再提交到本地存储中
        myCategories: [...myCategories],
      },
    });
  }

  //长按进入编辑
  function onLongPress() {
    dispatch({
      type: 'category/toggle',
      payload: {
        isEdit: true,
      },
    });
  }

  function onPress(item: ICategory, index: number, selected: boolean) {
    const disabled = fixedItems.indexOf(index) > -1;
    if (disabled) {
      //禁用状态下无法删除
      return;
    }
    //编辑状态下才有效
    if (isEdit) {
      // Alert.alert('message', `${selected}`);
      if (selected) {
        setMyCategories(
          myCategories.filter(selectedItem => selectedItem.id !== item.id),
        );
      } else {
        //不用push的原因是为了告诉react数据更新了
        setMyCategories([...myCategories, item]);
      }
    }
  }

  //渲染可以被编辑的分类
  function RenderItem(item: ICategory, index: number) {
    const disabled = fixedItems.indexOf(index) > -1;
    return (
      <Touchable key={item.id} onPress={() => onPress(item, index, true)}>
        <CategoryItem
          disabled={disabled}
          selected={true}
          isEdit={isEdit}
          data={item}
        />
      </Touchable>
    );
  }

  //渲染不可被编辑的分类
  function RenderUnSelectedItem(item: ICategory, index: number) {
    return (
      <Touchable
        key={item.id}
        onPress={() => onPress(item, index, false)}
        onLongPress={onLongPress}>
        <CategoryItem
          data={item}
          isEdit={isEdit}
          selected={false}
          disabled={false}
        />
      </Touchable>
    );
  }

  useEffect(() => {
    // console.log('init myCategories: ', props.myCategories);
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton onSubmit={onSubmit}></HeaderRightButton>
      ),
    });
  }, []);

  //离开分类页面退出编辑模式
  useEffect(() => {
    return () => {
      dispatch({
        type: 'category/toggle',
        payload: {
          isEdit: false,
        },
      });
    };
  }, []);
  const classifyGroup = _.groupBy(props.categories, item => item.classify);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.classifyName}>我的分类</Text>
      <View style={styles.classifyView}>
        {myCategories?.map(RenderItem) ?? <></>}
      </View>
      {/*  渲染可以被编辑的标签*/}
      <View>
        {Object.keys(classifyGroup).map(classify => {
          return (
            <View key={classify}>
              <Text style={styles.classifyName}>{classify}</Text>
              <View style={styles.classifyView}>
                {/*只渲染不在我的组件里的*/}
                {classifyGroup[classify].map((item, index) => {
                  if (
                    (myCategories || []).find(
                      selectedItem => selectedItem.id === item.id,
                    )
                  ) {
                    return null;
                  }
                  return RenderUnSelectedItem(item, index);
                })}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

class Category2 extends React.Component<IProps, IState> {
  state = {
    myCategories: [...this.props.myCategories],
  };

  constructor(props: IProps) {
    super(props);
    props.navigation.setOptions({
      headerRight: () => <HeaderRightButton onSubmit={this.onSubmit} />,
    });
  }

  componentWillUnmount() {
    //离开分类页面要推出编辑模式
    const {dispatch} = this.props;
    dispatch({
      type: 'category/toggle',
      payload: {
        isEdit: false,
      },
    });
  }

  onSubmit = () => {
    const {dispatch} = this.props;
    const {myCategories} = this.state;
    dispatch({
      type: 'category/toggle',
      payload: {
        //将我选择的分类提交到dva进而再提交到本地存储中
        myCategories: myCategories,
      },
    });
  };
  onLongPress = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'category/toggle',
      payload: {
        isEdit: true,
      },
    });
  };
  onPress = (item: ICategory, index: number, selected: boolean) => {
    const {isEdit} = this.props;
    const {myCategories} = this.state;
    const disabled = fixedItems.indexOf(index) > -1;
    if (disabled) {
      //禁用状态下无法删除
      return;
    }
    //编辑状态下才有效
    if (isEdit) {
      if (selected) {
        this.setState({
          myCategories: myCategories.filter(
            selectedItem => selectedItem.id !== item.id,
          ),
        });
      } else {
        this.setState({
          //不用push的原因是为了告诉react数据更新了
          myCategories: [...myCategories, item],
        });
      }
    }
  };
  renderItem = (item: ICategory, index: number) => {
    const {isEdit} = this.props;
    const disabled = fixedItems.indexOf(index) > -1;
    return (
      <Touchable key={item.id} onPress={() => this.onPress(item, index, true)}>
        <CategoryItem
          data={item}
          isEdit={isEdit}
          selected
          disabled={disabled}
        />
      </Touchable>
    );
  };
  renderUnSelectedItem = (item: ICategory, index: number) => {
    const {isEdit} = this.props;
    return (
      <Touchable
        key={item.id}
        onPress={() => this.onPress(item, index, false)}
        onLongPress={this.onLongPress}>
        <CategoryItem
          data={item}
          isEdit={isEdit}
          selected={false}
          disabled={false}
        />
      </Touchable>
    );
  };
  render() {
    const {categories = []} = this.props;
    const {myCategories = []} = this.state;

    const classifyGroup = _.groupBy(categories, item => item.classify);

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.classifyName}>我的分类</Text>
        <View style={styles.classifyView}>
          {myCategories.map(this.renderItem)}
        </View>
        <View>
          {Object.keys(classifyGroup).map(classify => {
            return (
              <View key={classify}>
                <Text style={styles.classifyName}>{classify}</Text>
                <View style={styles.classifyView}>
                  {/*只渲染不在我的组件里的*/}
                  {classifyGroup[classify].map((item, index) => {
                    if (
                      myCategories.find(
                        selectedItem => selectedItem.id === item.id,
                      )
                    ) {
                      return null;
                    }
                    return this.renderUnSelectedItem(item, index);
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6f6',
  },
  classifyName: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 8,
    marginLeft: 10,
  },
  classifyView: {
    flexDirection: 'row',
    //自动换行
    flexWrap: 'wrap',
    padding: 5,
  },
});

export default connector(Category2);
