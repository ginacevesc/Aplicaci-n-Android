import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, ScrollView} from 'react-native'
import Celda from './CeldaBajas';

export default class Bajas extends Component {
  constructor(props) {
    super(props);
    this.state = {
        citas:[],
        refreshing: false,
    };
    }
    
    renderItem = ({item}) => {
      return (
      <View>
          <Text> {this.state.citas.hora} </Text> 
      </View>
      )
    }

  componentDidMount = async () => {
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () 
    {
      if (this.readyState == 4 && this.status == 200) 
      {
        _this.setState({citas: JSON.parse(xhttp.responseText)});
        console.log(_this.state.citas);
      }
    };
    xhttp.open("GET", "https://ginaac.000webhostapp.com/VerCitas.php?codigo=213742731" ,true);
    xhttp.send();
    }

    handleRefresh = () => {
      this.setState({
        page: 1,
        refreshing: true,
        seed: this.state.seed +1,
      })
    };

    render() {
        return (
            <View>
              <ScrollView>
              {this.state.citas.map((citas, index) => (
                    <Celda key = {index}
                    hora1 = {citas.Hora}
                    dia1 = {citas.Dia}
                    mes1 = {citas.Mes}
                    codigo1 = {citas.Codigo}
                    datosC = {citas.Hora + " " + citas.Dia + " " + citas.Mes + " " + citas.Codigo}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    />
                ))}
              </ScrollView>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
  letra:{
      fontSize: 20,
  },
})
