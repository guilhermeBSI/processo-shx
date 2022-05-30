import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Card } from '@rneui/themed';
import { getDateString } from '../../../../helpers/Date';


const CardCotation = ({ name, low, high, date }) => {
  return (
  <Card>
    <Card.Title>{`${name} - ${getDateString(date)}`}</Card.Title>
      <Card.Divider />
      <Text style={styles.fonts}>
        Alta: {high}
      </Text>
      <Text style={styles.fonts}>
        Baixa: {low}
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