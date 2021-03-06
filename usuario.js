import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, Alert} from 'react-native'
import MenuDrawer from 'react-native-side-drawer'
global.data;
global.resultado;
global.nombre;
import CalendarPicker from 'react-native-calendar-picker';
import {Picker} from '@react-native-community/picker';
<Button title = "Ir a Bajas" onPress={() => navigation.navigate('formatoB')} ></Button>

export default class usuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedStartDate: null,
      hora:'',
      minutos:'',
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
        <Text style={styles.vGlobal}>{global.resultado}</Text>
        <View style = {styles.botonIr}>
          <Button title = "Ir a Bajas" onPress={() => this.props.navigation.navigate('formatoB')} ></Button>
        </View>
        <View style = {styles.botonIr}>
          <Button title = "Ir a Modificar" onPress={() => this.props.navigation.navigate('Modifica')} ></Button>
        </View>
        <Text style={styles.closeDrawer}>Cerrar</Text>
      </TouchableOpacity>
    );
  };

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  render() {
    const navigation = this.props.navigation;
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    const hacerCita = () => {
      var datosSep = startDate.split(' ');
      var HoraMin = this.state.hora + ":" + this.state.minutos;
      var sepData = global.data.split(' ');
      var salida = datosSep[0] + "  " + datosSep[1] + "  " + datosSep[2] + "  " + 
        this.state.hora + " " + sepData[0] + " "+ global.nombre + " " + sepData[1];
      //console.log(salida);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
          //console.log(this.responseText);
          if (xhttp.responseText == "1")
          {
            Alert.alert("Cita Agendada");
          } 
          if (xhttp.responseText == "2")
          {
            Alert.alert("Fecha/Hora no disponibles");
          }
        }
      };
      var link = 'https://ginaac.000webhostapp.com/AltaCitas.php?diasemana=' +
      datosSep[0] +
      '&mes=' +
      datosSep[1] +
      '&dia=' +
      datosSep[2] +
      '&hora=' +
      this.state.hora +
      '&codigo=' +
      sepData[0] +
      '&nombre=' +
      global.nombre +
      '&carrera=' +
      sepData[1];
      xhttp.open(
        'GET',
        link, true
      );
      xhttp.send();
    };
    return (
      <View style={styles.container}>
        <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={500}
          overlay={true}
          opacity={0.4}>
          <View style = {styles.btnMenu}>
            <Button color = "black" title = "Men??" onPress={this.toggleOpen}/>
          </View>
        </MenuDrawer>
        <CalendarPicker onDateChange={this.onDateChange}/>
        <View>
          <Text style = {styles.fechaSeleccionada}>SELECTED DATE:{ startDate }</Text>
        </View>
        <Picker
          selectedValue={this.state.hora}
          style={styles.pickerH}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({hora: itemValue})  
          }>
          <Picker.Item label="8:00" value="8:00" />
          <Picker.Item label="8:15" value="8:15" />
          <Picker.Item label="8:30" value="8:30" />
          <Picker.Item label="8:45" value="8:45" />
          <Picker.Item label="9:00" value="9:00" />
          <Picker.Item label="9:15" value="9:15" />
          <Picker.Item label="9:30" value="9:30" />
          <Picker.Item label="9:45" value="9:45" />
          <Picker.Item label="10:00" value="10:00" />
          <Picker.Item label="10:15" value="10:15" />
          <Picker.Item label="10:30" value="10:30" />
          <Picker.Item label="10:45" value="10:45" />
          <Picker.Item label="11:00" value="11:00" />
          <Picker.Item label="11:15" value="11:15" />
          <Picker.Item label="11:30" value="11:30" />
          <Picker.Item label="11:45" value="11:45" />
          <Picker.Item label="12:00" value="12:00" />
          <Picker.Item label="12:15" value="12:15" />
          <Picker.Item label="12:30" value="12:30" />
          <Picker.Item label="12:45" value="12:45" />
          <Picker.Item label="13:00" value="13:00" />
          <Picker.Item label="13:15" value="13:15" />
          <Picker.Item label="13:30" value="13:30" />
          <Picker.Item label="13:45" value="13:45" />
        </Picker>
        <View style = {styles.btnCita}>
          <Button color = "black" title = "Hacer Cita" onPress={hacerCita}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 30,
    zIndex: 0
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#FF8A65",
    padding: 20,
    opacity: 10,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  btnMenu: {
    //marginTop: 10,
    fontWeight:"bold",
    width:70,
    height:35,
    justifyContent: "center",
  },
  btnCita: {
    marginTop: -110,
    fontWeight:"bold",
    width:70,
    height:35,
    alignItems: "center",
    justifyContent: "center",
  },
  closeDrawer: {
    marginTop: 150,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    textDecorationLine: 'underline',
  },
  vGlobal: {
    marginTop: 30,
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  fechaSeleccionada: {
    marginTop: -120,
    //marginLeft: 10,
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  pickerH: {
    marginTop: -200,
    height: 50, 
    width: 200
  },
  pickerM: {
    marginTop: -150,
    height: 50, 
    width: 200
  },
  botonIr:{
    marginTop: 40,
  },
})