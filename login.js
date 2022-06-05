import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, TextInput, Image, Alert} from 'react-native';
import {createStackNavigator, createAppContainer, NavigationContext} from 'react-navigation';
//import {NavigationContext} from '@react-navigation/native'

export default class login extends Component{
  static contextType = NavigationContext;
  constructor(props){
    super(props);
    this.state = {
      codigo: '',
      nip: ''
    };
  }

  render() {
    const navigation = this.props.navigation;
    const autentificacion = () => {
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200){
          console.log(xhttp.responseText);
          if(xhttp.responseText == 0){
            Alert.alert('Datos incorrectos. Intente de nuevo');
          }
          else{
            var datos = xhttp.responseText;
            var datosSep = datos.split(',');
            var cadena = 'Codigo: ' + datosSep[1] + '\nNombre: ' + datosSep[2] + '\nCarrera: ' + datosSep[4];
            global.resultado = cadena;
            var cadena2 = datosSep[1] + ' ' + datosSep[4];
            global.data = cadena2;
            var cadena3 = datosSep[2]; 
            global.nombre = cadena3;
            navigation.navigate('Usuario');
          }
        }
      };
      xhttp.open(
        'GET',
        'https://cuceimobile.tech/Escuela/datosudeg.php?codigo=' +
         this.state.codigo +
         '&nip=' +
         this.state.nip,
         true,
      );
      xhttp.send();
    };

    irAdmin = () => {
      const navigation = this.props.navigation;
      navigation.navigate('AdminScreen');
    };

    return(
      <View>
        <Image style= {styles.imgstyle} source ={require('./Cucei.png')} />
        <TextInput
          placeholder="Codigo"
          keyboardType="number-pad"
          onChangeText={(codigo) => this.setState({codigo})}
          //value={this.state.code}
          style={styles.txtBox}
        />

        <TextInput
          placeholder="Nip"
          secureTextEntry={true}
          onChangeText={(nip) => this.setState({nip})}
          //value={this.state.nip}
          style={styles.txtBox}
        />

        <View style={styles.btnInicio}>
          <Button
            onPress={autentificacion}
            title="Entrar"
            fontWeight="bold"
            fontSize="larger"
            color="#87cefa"
          />
        </View>  
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnInicio: {
    height: 20,
    width: 100,
    marginTop: 80,
    marginLeft: 148,
    color: 'red',
    justifyContent: 'center',
  },
  btnAdmin: {
    height: 20,
    width: 128,
    marginTop: 180,
    marginLeft: 240,
    color: 'red',
    justifyContent: 'center',
  },
  txtBox: {
    marginTop: 40,
    margin: 20,
    marginLeft: 130,
    width: 130,
    borderWidth: 1,
    borderColor: 'silver',
  },
  imgstyle:{
    width:100,
    height:150,
    marginTop:50, 
    marginLeft:150, 
    alignContent:'center'
},
});