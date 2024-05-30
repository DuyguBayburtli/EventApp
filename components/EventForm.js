import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Alert, KeyboardAvoidingView, ImageBackground } from 'react-native';
import Input from './Input';

export default function Form({ cancelHandler, onSubmit, buttonLabel, defaultValues }) {
  const [inputs, setInputs] = useState({
    title: { value: defaultValues ? defaultValues.title : '', isValid: true },
    location: { value: defaultValues ? defaultValues.location : '', isValid: true },
    date: { value: defaultValues ? defaultValues.date : '', isValid: true },
    time: { value: defaultValues ? defaultValues.time : '', isValid: true },
    description: { value: defaultValues ? defaultValues.description : '', isValid: true },
    image: { value: defaultValues ? defaultValues.image : '', isValid: true },
  });

  function inputChange(inputIdentifier, enteredValue) {
    setInputs((currentInput) => {
      return {
        ...currentInput,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const eventData = {
      title: inputs.title.value,
      location: inputs.location.value,
      date: new Date(inputs.date.value),
      time: inputs.time.value,
      description: inputs.description.value,
      image: inputs.image.value,
    };

    const titleIsValid = eventData.title.trim().length > 0;
    const locationIsValid = eventData.location.trim().length > 0;
    const dateIsValid = eventData.date.toString() !== 'Invalid Date';
    const timeIsValid = eventData.time.trim().length > 0;
    const descriptionIsValid = eventData.description.trim().length > 0;
    const imageIsValid = eventData.image.trim().length > 0;

    if (!titleIsValid || !locationIsValid || !dateIsValid || !timeIsValid || !descriptionIsValid || !imageIsValid) {
      setInputs((currentInputs) => {
        return {
          title: { value: currentInputs.title.value, isValid: titleIsValid },
          location: { value: currentInputs.location.value, isValid: locationIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          time: { value: currentInputs.time.value, isValid: timeIsValid },
          description: { value: currentInputs.description.value, isValid: descriptionIsValid },
          image: { value: currentInputs.image.value, isValid: imageIsValid },
        };
      });
      return;
    }

    onSubmit(eventData);
  }

  return (
    <ImageBackground source={require('../assets/gokkusagı.jpg')} style={styles.backgroundImage}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>Etkinlik Bilgileri</Text>
        <View style={styles.inputContainer}>
          <Input
            label="Etkinlik Adı"
            invalid={!inputs.title.isValid}
            textInputConfig={{
              onChangeText: inputChange.bind(this, 'title'),
              value: inputs.title.value,
              style: styles.input,
              labelStyle: styles.label,
            }}
          />
          <Input
            label="Yer"
            invalid={!inputs.location.isValid}
            textInputConfig={{
              onChangeText: inputChange.bind(this, 'location'),
              value: inputs.location.value,
              style: styles.input,
              labelStyle: styles.label,
            }}
          />
          <View style={styles.row}>
            <Input
              label="Tarih"
              invalid={!inputs.date.isValid}
              textInputConfig={{
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                onChangeText: inputChange.bind(this, 'date'),
                value: inputs.date.value,
                style: [styles.input],
                labelStyle: styles.label,
              }}
            />
            <Input
              label="Saat"
              invalid={!inputs.time.isValid}
              textInputConfig={{
                placeholder: 'HH:MM',
                maxLength: 5,
                onChangeText: inputChange.bind(this, 'time'),
                value: inputs.time.value,
                style: [styles.input],
                labelStyle: styles.label,
              }}
            />
          </View>
          <Input
            label="Açıklama"
            invalid={!inputs.description.isValid}
            textInputConfig={{
              multiline: true,
              onChangeText: inputChange.bind(this, 'description'),
              value: inputs.description.value,
              style: styles.input,
              labelStyle: styles.label,
            }}
          />
          <Input
            label="Resim URL"
            invalid={!inputs.image.isValid}
            textInputConfig={{
              onChangeText: inputChange.bind(this, 'image'),
              value: inputs.image.value,
              style: styles.input,
              labelStyle: styles.label,
            }}
          />
        </View>

        <View style={styles.error}>
          {!inputs.title.isValid && <Text style={styles.errorText}>Lütfen geçerli bir etkinlik adı giriniz.</Text>}
          {!inputs.location.isValid && <Text style={styles.errorText}>Lütfen geçerli bir yer giriniz.</Text>}
          {!inputs.date.isValid && <Text style={styles.errorText}>Lütfen geçerli bir tarih giriniz.</Text>}
          {!inputs.time.isValid && <Text style={styles.errorText}>Lütfen geçerli bir saat giriniz.</Text>}
          {!inputs.description.isValid && <Text style={styles.errorText}>Lütfen geçerli bir açıklama giriniz.</Text>}
          {!inputs.image.isValid && <Text style={styles.errorText}>Lütfen geçerli bir resim URL'si giriniz.</Text>}
        </View>
        <View style={styles.buttons}>
          <Pressable onPress={cancelHandler} style={styles.cancel}>
            <Text style={styles.cancelText}>İptal Et</Text>
          </Pressable>
          <Pressable onPress={submitHandler} style={styles.submit}>
            <Text style={styles.submitText}>{buttonLabel}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
backgroundImage: {
  flex: 1,
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
},
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.7)', // Arka planı hafif opak yapar
  width: '100%',
  padding: 20,
},
title: {
fontSize: 25,
fontWeight: 'bold',
textAlign: 'center',
color: '#444',
marginVertical: 10,
marginBottom: 0,
},
inputContainer: {
  width: '100%',
  marginBottom: 10,
  color:'#444'
},
row: {
  flexDirection: 'row',
  marginBottom: 10, // Tarih ve saat arasındaki boşluk
  marginHorizontal:30,
  marginLeft:20,
  marginStart:0,
  paddingVertical:10,
  justifyContent: 'space-between',
  
},
buttons: {
  flexDirection: 'row', // Butonları yan yana koy
  marginTop: 0, // Butonların üst boşluğu
  padding:20
},
halfWidth: {
  flex: 1,
  marginHorizontal: 35,
  marginStart:5, 
  paddingVertical:10

},

cancel: {
  backgroundColor: '#444', // İptal butonu rengi
  minWidth: 120,
  marginRight: 10,
  padding: 8,
  borderRadius: 8,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 8,
},
submit: {
  backgroundColor: 'orange', // Gönder butonu rengi
  minWidth: 120,
  marginLeft: 10,
  padding: 8,
  borderRadius: 8,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 8,
},
cancelText: {
color: 'white',
fontWeight: 'bold',
},

submitText: {
color: 'white',
fontWeight: 'bold',
},
error: {
alignItems: 'center',
marginVertical: 10,
},
errorText: {
color: 'red',
fontWeight: 'bold',
},
input: {
  backgroundColor: '#fff', // Beyaz arka plan
  paddingHorizontal: 20, // Daha fazla iç boşluk
  paddingVertical: 10,
  marginTop: 10, // Daha fazla üst boşluk
  borderRadius: 40, // Daha yuvarlak köşeler
  borderWidth: 1,
  borderColor: '#ddd', // Daha yumuşak bir gri ton
  fontSize: 16, // Daha büyük yazı boyutu
  shadowColor: '#000', // Gölgelendirme için
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 8, // Android'de gölge için
},
label: {
color: '#444',
marginBottom: 5,
textAlign: 'center',
},
});