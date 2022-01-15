import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';

export const Input = ({
  text,
  value,
  handleTitle,
  disabled = false,
  isVisable = true,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{text}</Text>
      <TextInput
        style={disabled ? [styles.input, styles.disabledText] : styles.input}
        placeholder={text}
        maxLength={20}
        value={value}
        onChangeText={handleTitle}
        // {disabled && (editable={false} selectTextOnFocus={false})}
        editable={!disabled}
        secureTextEntry={!isVisable}
      />
    </View>
  );
};

export const MultilineInput = ({text, value, handleDesc, disabled = false}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{text}</Text>
      <TextInput
        style={
          disabled
            ? [styles.input, styles.disabledText, styles.multiline]
            : [styles.input, styles.multiline]
        }
        placeholder={text}
        multiline
        numberOfLines={5}
        onChangeText={handleDesc}
        value={value}
        editable={!disabled}
      />
    </View>
  );
};

export const DateInput = ({text, value, disabled = false}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (value) {
      setDate(new Date(value));
    }
  }, [setDate, value]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{text}</Text>
      <Text
        style={disabled ? [styles.input, styles.disabledText] : styles.input}
        placeholder={text}
        onPress={() => {
          !disabled && setOpen(true);
        }}>
        {date.toString().slice(0, -20)}
      </Text>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={dateIn => {
          setOpen(false);
          setDate(dateIn);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    color: '#000',
  },
  disabledText: {
    color: 'grey',
  },
  multiline: {
    height: 140,
    textAlignVertical: 'top',
  },
});
