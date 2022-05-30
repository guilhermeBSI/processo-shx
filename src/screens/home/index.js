import react, { useContext, useState } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { DatePicker } from './components/DatePicker';
import { Button } from "@rneui/base";
import CardCotation from './components/CardCotation';
import HomeContext from '../../context/context';
import axios from 'axios';
import { getDataFromTimestamp, padTo2Digits } from '../../helpers/Date';

const endPoint = 'https://economia.awesomeapi.com.br';

export default function Home() {
  const [initialDate, setInitialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date()); 
  const { state, setState } = useContext(HomeContext);

  const formatDate = (dateToFormat) => {
    const day = padTo2Digits(dateToFormat.getDate());
    const month = padTo2Digits(dateToFormat.getMonth() + 1);
    const year = dateToFormat.getFullYear();

    return `${year}${month}${day}`
  }

  const fetchData = async () => {
    try {
      setState({
        ...state,
        cotation: [],
        loading: true,
      });

      const { data } = await axios.get(`${endPoint}/USD-BRL/10?start_date=${formatDate(initialDate)}&end_date=${formatDate(finalDate)}`)
      
      setState({
        ...state,
        cotation: data,
        loading: false,
      });
    } catch ({ message }) {
      Alert.alert('Erro!', message);
      setState({
        ...state,
        loading: false,
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerSearch}>
        <View style={styles.containerCamposData}>
          <DatePicker
            label="Data inicial"
            date={initialDate}
            setDate={setInitialDate}
            style= {{
              width: '100%',
            }}
          />
          <DatePicker
            label="Data final"
            date={finalDate}
            setDate={setFinalDate}
            style= {{
              width: '100%',
            }}
          />
        </View>
        <Button
          title="Pesquisar"
          onPress={() => fetchData()}
          loading={state.loading}
        />      
      </View>
      <FlatList
        keyExtractor={({timestamp}) => timestamp}
        data={state.cotation}
        contentContainerStyle={{ marginBottom: 10 }}
        renderItem={({ item }) => (
          <CardCotation
            name={state.cotation[0].name}
            low={item.low}
            high={item.high}
            date={getDataFromTimestamp(item.timestamp)}
          /> 
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    height: '100%',
  },
  containerSearch: {
    padding: 12,
  },
  containerCamposData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
