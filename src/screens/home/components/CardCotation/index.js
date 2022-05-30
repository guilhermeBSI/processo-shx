import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Card } from '@rneui/themed';


const CardCotation = ({ cotacaoCompra, cotacaoVenda, dataHoraCotacao }) => {
  return (
  <Card>
    <Card.Title>{`Data ${dataHoraCotacao}`}</Card.Title>
      <Card.Divider />
      <Text style={styles.fonts}>
        Compra: {cotacaoCompra}
      </Text>
      <Text style={styles.fonts}>
        Venda: {cotacaoVenda}
      </Text>
  </Card>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
},
fonts: {
  marginBottom: 8,
  fontSize: 18,
},
});

export default CardCotation;