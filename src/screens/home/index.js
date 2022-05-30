import react, { useContext, useState } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { DatePicker } from './components/DatePicker';
import { Button, Text } from "@rneui/base";
import CardCotation from './components/CardCotation';
import HomeContext from '../../context/context';
import axios from 'axios';
import { padTo2Digits } from '../../helpers/Date';

const endPoint = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@`;

export default function Home() {
  const [initialDate, setInitialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date()); 
  const { state, setState } = useContext(HomeContext);

  const formatDate = (dateToFormat) => {
    const day = padTo2Digits(dateToFormat.getDate());
    const month = padTo2Digits(dateToFormat.getMonth() + 1);
    const year = dateToFormat.getFullYear();

    return `${month}-${day}-${year}`
  }

  const fetchData = async () => {
    try {
      setState({
        ...state,
        cotation: [],
        loading: true,
      });
      const url = `${endPoint}dataInicial='${formatDate(initialDate)}'&@dataFinalCotacao='${formatDate(finalDate)}'&$top=50&$format=json`;

      const { data } = await axios.get(url);
      const { value = [] } = data;

      setState({
        ...state,
        cotation: value,
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
        keyExtractor={({dataHoraCotacao}) => dataHoraCotacao}
        data={state.cotation}
        contentContainerStyle={{ marginBottom: 10 }}
        renderItem={({ item }) => (
          <CardCotation
            cotacaoVenda={item.cotacaoVenda}
            cotacaoCompra={item.cotacaoCompra}
            dataHoraCotacao={item.dataHoraCotacao}
          /> 
        )}
        ListHeaderComponent={state.cotation.length > 0 ?
          (<Text
            style={{ textAlign: 'center' }}
            h4
          >
            Cotação dólar comercial
          </Text>) : <></>}
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
