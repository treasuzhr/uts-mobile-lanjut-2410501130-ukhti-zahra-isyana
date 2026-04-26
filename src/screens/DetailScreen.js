import React, {useEffect, useState, useContext } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FavoriteContext } from '../context/FavoritesContext';

const DetailScreen = ({ route }) => {
    const { idMeal } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { dispatch } = useContext(FavoriteContext);

    const getMealDetail = async () => {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
          const json = await response.json();
          setData(json.meals[0]);
        } catch (error) {
          setError('Gagal memuat data.');
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
      getMealDetail();
    }, []);

    return (
      <View style={{flex: 1, padding: 24}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <View>
            <Text>{data.strMeal}</Text>
            <Text>{data.strCategory}</Text>
            <Text>{data.strArea}</Text>
            <Text>{data.strInstructions}</Text>
            <Text>{data.strYoutube}</Text>
            <TouchableOpacity onPress={() => dispatch({
              type: 'ADD_FAVORITE',
              payload: data
            })}>
              <Text>Tambah ke Favorit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )  
};

export default DetailScreen;