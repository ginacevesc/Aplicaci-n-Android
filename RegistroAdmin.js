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
      nip: '',
      carrera: '',
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
          if(xhttp.responseText == 0)
          {
            Alert.alert('Error al registrar. Intente de nuevo');
          }
          if(xhttp.responseText == 1)
          {
            var datos = xhttp.responseText;
            console.log("Aqui");
            console.log(datos);
            var datosSep = datos.split(',');
            //navigation.navigate('InicioAdmin');
            Alert.alert('Usuario registrado exitosamente.');
          }
          if(xhttp.responseText == 2)
          {
            Alert.alert('Usuario registrado anteriormente.');
          }
        }
      };
      xhttp.open(
        'GET',
        'https://ginaac.000webhostapp.com/AltaAdmin.php?user=' +
         this.state.codigo +
         '&password=' +
         this.state.nip +
         '&carrera=' +
         this.state.carrera,
         true,
      );
      xhttp.send();
    };

    return(
      <View>
        <Text style ={styles.titulo}>
            Registro Administradores
        </Text>
        <TextInput
          placeholder="Usuario"
          //keyboardType="number-pad"
          onChangeText={(codigo) => this.setState({codigo})}
          //value={this.state.code}
          style={styles.txtBox}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(nip) => this.setState({nip})}
          //value={this.state.nip}
          style={styles.txtBox}
        />

        <TextInput
          placeholder="Carrera"
          secureTextEntry={true}
          onChangeText={(carrera) => this.setState({carrera})}
          //value={this.state.nip}
          style={styles.txtBox}
        />

        <View style={styles.btnInicio}>
          <Button
            onPress={autentificacion}
            title="Aceptar"
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
  btnReg: {
    height: 20,
    width: 110,
    marginTop: 60,
    marginLeft: 144,
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
  titulo: {
    fontSize: 30,
    marginLeft: 22,
    marginTop: 35,
    marginBottom: 30,
    fontWeight: "bold",
    color: "#003f87"
  },
  imgstyle:{
    width:100,
    height:150,
    marginTop:50, 
    marginLeft:150, 
    alignContent:'center'
},
});