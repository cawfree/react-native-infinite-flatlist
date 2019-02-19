import InfiniteFlatList from './InfiniteFlatList';
import React from 'react';
import renderer from 'react-test-renderer';
import { Text, FlatList } from 'react-native';

test('InfiniteFlatList renders correctly', () => {
  const data = [{ id: '123', name: 'Test' }];
  const renderItem = item => <Text>{ item.name }</Text>;
  const tree = renderer.create(<InfiniteFlatList data={data} renderItem={renderItem} />).toJSON();
  expect(tree).toMatchSnapshot();
});


test('Props are being transferred and consumed', () => {
  const data = [{ id: '123', name: 'Test' }];
  const renderItem = item => <Text>{item.name}</Text>;
  const props = {
    data,
    renderItem,
    numColumns: 4,
    somethingRandom: 'test',
  };
  const rendered = renderer.create(<InfiniteFlatList { ...props } />);
  const tree = rendered.toJSON();
  const propKeys = Object.keys(props);
  const flatListPropKeys = Object.keys(rendered.root.findByType(FlatList).props);
  const infiniteFlatListPropKeys = Object.keys(rendered.root.findByType(InfiniteFlatList).props);
  // flatListPropKeys ⊇ infiniteFlatListPropKeys
  expect(flatListPropKeys).toEqual(expect.arrayContaining(propKeys));
  expect(infiniteFlatListPropKeys).toEqual(expect.arrayContaining(propKeys));
  expect(tree).toMatchSnapshot();
});
