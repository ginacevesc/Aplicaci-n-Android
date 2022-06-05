import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, ShadowPropTypesIOS, Alert } from 'react-native'

export class CeldaBajas extends Component {
  constructor(props) {
    super(props);
        this.state = {
      datosCita: props.datosC,
      hora: props.hora1,
      dia: props.dia1,
      mes: props.mes1,
      codigo: props.codigo1,
    };
  }
    
    render() {
    const borra = () => {
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        //console.log("Aqui");
        console.log(_this.state.datosCita);
        if (this.readyState == 4 && this.status == 200) 
        {
          if(xhttp.responseText == '1')
          {
            Alert.alert('Cita Cancelada.');
            
          }
          if (xhttp.responseText == '0')
          {
            Alert.alert('No se pudo cancelar la cita.');
          }
        }
    };
      xhttp.open(
        'GET',
        'https://ginaac.000webhostapp.com/BajasCitas.php?mes=' +
          this.state.mes +
          '&dia=' +
          this.state.dia +
          '&hora=' +
          this.state.hora +
          '&codigo=' +
          this.state.codigo,
        true,
      );
      xhttp.send();
    };
    return (
      <View>
        <View style={styles.fondo}>
          <Text style={styles.datos}>{this.state.hora}</Text>
          <Text style={styles.datos}>{this.state.dia}</Text>
          <Text style={styles.datos}>{this.state.mes}</Text>
          <View style={styles.boton}>
            <Button color="black" title="Borrar" onPress={borra}></Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    boton:{
        width: 80,
        height: 40,
        marginLeft: 110,
        marginTop: 10,
    },
    datos:{
        fontSize: 20,
        marginTop: 30,
        marginLeft: 100,
    },
    fondo:{
        width: 300,
        height: 200,
        borderWidth: 0,
        marginLeft: 50,
        marginTop: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    }
})

export default CeldaBajas
