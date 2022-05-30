import react, { useState } from 'react';
import {
  View,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import { Input } from '@rneui/themed';
import { formatDate } from '../../../../helpers/Date';


export const DatePicker = ({ date, setDate, style, label }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <TouchableNativeFeedback style={style} onPress={showDatepicker}>
      <View style={{width: '45%'}}>
        <Input
          label={label}
          editable={false}
          value={formatDate(date)}
          rightIcon={
            <FontAwesome
            style={{ marginLeft: 8 }}
              name='calendar'
              size={16}
              color='black'
            />
          }
        />
      
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});