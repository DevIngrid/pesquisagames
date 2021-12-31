import React from 'react';
import {Text, StyleSheet} from 'react-native';

const CreateRecord = () => {
    return (
        <Text style={styles.text}>Hello create-record</Text>
    );
}

const styles = StyleSheet.create({
  text: {
      color: '#FFF',
      fontSize:50,
      textAlign: 'center',
      marginTop: 100
  }
});

export default CreateRecord;