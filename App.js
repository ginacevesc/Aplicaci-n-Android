import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginS from './login';
import UserS from './usuario';
//import CeldaBS from './Bajas';
import CeldaBS from './Bajas2';
import Modify from './modificar';
import datosM from './modCita';
import admin from './administrador';
import pAdmin from './PantallaAdmin';
import rAdmin from './RegistroAdmin';

class HomeScreen extends React.Component{
  render(){
    return(
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Login:{
    screen:LoginS
  },
  Usuario:{
    screen:UserS,
    navigationOptions:{
      headerShown: false,
    },
  },
  formatoB:{
    screen:CeldaBS,
    navigationOptions:{
      headerShown: false,
    },
  },
  Modifica:{
    screen:Modify,
    navigationOptions:{
      headerShown: false,
    },
  },
  UpdateC:{
    screen:datosM,
    navigationOptions:{
      headerShown: false,
    },
  },
  AdminScreen:{
    screen:admin,
    navigationOptions:{
      headerShown: false,
    },
  },
  InicioAdmin:{
    screen:pAdmin,
    navigationOptions:{
      headerShown: false,
    },
  },
  RegistrarAdmin:{
    screen:rAdmin,
    navigationOptions:{
      headerShown: false,
    },
  },
});

export default createAppContainer(AppNavigator);
