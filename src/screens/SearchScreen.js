import React, { useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [validationError, setValidationError] = useState('');
    const navigation = useNavigation();

    const getMeals = async () => {
      if (query.trim() === '') {
        setValidationError('Kolom pencarian tidak boleh kosong.');
        return;
      }
      if (query.trim().length < 3) {
        setValidationError('Minimal 3 karakter.');
        return;
      }
      setValidationError('');

        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
          const json = await response.json();
          setData(json.meals);
        } catch (error) {
          setError('Gagal memuat data.');
        } finally {
          setLoading(false);
        }
    };

    return (
        <View style={{flex: 1, padding: 24}}>
          
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Cari resep..."
          />
          <TouchableOpacity onPress={getMeals}>
            <Text>Cari</Text>
          </TouchableOpacity>
          {validationError ? <Text>{validationError}</Text> : null}

          {isLoading ? (
            <ActivityIndicator />
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            <FlatList
              data={data}
              keyExtractor={({idMeal}) => idMeal}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.navigate('Detail', {
                  idMeal: item.idMeal
                })}>
                  <Text>{item.strMeal}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      );

};

export default SearchScreen;