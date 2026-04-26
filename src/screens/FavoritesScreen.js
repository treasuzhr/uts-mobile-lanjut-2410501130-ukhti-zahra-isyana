import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { FavoriteContext } from '../context/FavoritesContext';

const FavoritesScreen = () => {
  const { state, dispatch } = useContext(FavoriteContext);
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, padding: 24}}>
      <FlatList
        data={state.favorites}
        keyExtractor={(item) => item.idMeal}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Home', {
              screen: 'Detail',
              params: { idMeal: item.idMeal }
            })}>
              <Text>{item.strMeal}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch({
              type: 'REMOVE_FAVORITE',
              payload: item.idMeal
            })}>
              <Text>Hapus dari Favorit</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default FavoritesScreen;