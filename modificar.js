import React, {Component} from 'react';
import {
  View,
  Text,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MenuDrawer from 'react-native-side-drawer'

export default class Bajas2 extends Component {
  constructor(props) {
    super(props);
    //asigancion necesaria para que funcione el this en el llamado a la funcion borra
    this.borra = this.borra.bind(this);
    this.state = {
      // declaracion del arreglo citas donde se guaran los datos de la base de datos
      citas: [],
      //Variable para  hacer refresh
      refreshing: true,
      open: false,
    };
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={styles.animatedBox}>
        <Text style={styles.vGlobal}>{global.resultado}</Text>
        <View style = {styles.botonIr}>
          <Button title = "Ir a Altas" onPress={() => this.props.navigation.navigate('Usuario')} ></Button>
        </View>
        <View style = {styles.botonIr}>
          <Button title = "Ir a Bajas" onPress={() => this.props.navigation.navigate('formatoB')} ></Button>
        </View>
        <Text style={styles.closeDrawer}>Cerrar</Text>
      </TouchableOpacity>
    );
  };

  //funcion que llena la lista con los datos, se declaro en una funcion para no  poner el codigo de conexion cada rato
  //asi solo se manda llmar a la funcion
  TraeDatos = () => {
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () 
    {
      if (this.readyState == 4 && this.status == 200) 
      {
        _this.setState({
          citas: JSON.parse(xhttp.responseText),
          refreshing: false,
        });

        //console.log(_this.state.citas);
      }
    };
    xhttp.open(
      'GET',
      'https://ginaac.000webhostapp.com/VerCitas.php?codigo=213742731',
      true,
    );
    xhttp.send();
  };
  //funcion que manda llamar a borracitas.php el cual le pasamos como parametro id que es unico no olviden que deben cambiar la ruta
  // asu servidor..
  borra(id) {
    //console.log('borra');
    console.log(id);
    global.id = id;
    //let _this = this;
    this.props.navigation.navigate('UpdateC')
  }
  //formato de la linea que separa datos entre un registro y otr
  ListViewItemSeparator = () => {
    return (
      //returning the listview item saparator view
      <View
        style={{
          height: 0.2,
          width: '90%',
          backgroundColor: '#808080',
        }}
      />
    );
  };
  //Accion que actualiza la tabla o lista
  onRefresh() {
    this.setState({citas: []});
    this.TraeDatos();
  }
  //accion que carga los datos cuando carga la vista en el cel para verla
  componentDidMount = async () => {
    this.TraeDatos();
  };
  render() {
    //accion que se ejecuta mietras carga los datos, pantalla fiusha con el texto de cargando datos
    if (this.state.refreshing) {
      return (
        //loading view while data is loading
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{flex: 1, backgroundColor: '#DBDBDB', paddingTop: 20, justifyContent: "center", alignItems: "center"}}>
          <Text style = {styles.loading}> Cargando...</Text>
          <ActivityIndicator size = "large" color = "white" />
        </View>
      );
    }
    return (
      //Vista de la lista, se uso el componente Flatlist
      <View>
        <View>
        <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={500}
          overlay={true}
          opacity={0.4}>
          <View style = {styles.btnMenu}>
            <Button color = "black" title = "Menú" onPress={this.toggleOpen}/>
          </View>
        </MenuDrawer>
        </View>
        <Text style = {styles.titulo}> Modificar Citas </Text>
        <View>
          <FlatList
            numColumns = {2}
            // de donde se obtienen los datos, de el arreglo citas
            data={this.state.citas}
            //invocacion del separator de registros en la lista
            ItemSeparatorComponent={this.ListViewItemSeparator}
            //no se, en la documentacion no la encontre, si la quito no veo cambios, la dejo..
            enableEmptySections={true}
            //Vista de los datos item es el arreglo y para acceder a los datos hay que hace item.Hora, item.Dia etc
            renderItem={({item}) => (
              <View>
                <Text
                  //estilo del como se va a ver la hora
                  style={styles.rowViewContainer}
                  //Para funcionar requiere un id, este id no estaba contemplado originalmente en la base de datos, el cual
                  // deberan de alterar, deberan crear un campo nuevo en la tabla llamado id de tipo numerico y que sea AI (asi viene en
                  // la base de datos) AutoIncrementable, no sera necesario alterar los demas scripts la base de datos llena ese campo
                  //sola
                  //{item.Hora} es como accedemos a la hora  para mostarla
                  onPress={() => alert(item.id)}>
                  {item.Mes + " " + item.Dia}
                </Text>
                <Text
                  style={styles.rowViewContainer}
                  onPress={() => alert(item.id)}>
                  {item.Hora}
                </Text>
                <View style = {styles.btnBorrar}>
                
                <Button
                  //style={styles.rowViewContainer1}
                  title="Modificar" color="#EE0000"
                  //mandamos llamar a la funcion borra y le pasamos como parametro el id, que es unico en la tabla
                  onPress={() => this.borra(item.id)} />
                </View>
              </View>
            )}
            refreshControl={
              <RefreshControl
                //esto es para cuando bajas la lista se actualiza, ya se hace en automatico alla arriba :P
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    marginTop: 10,
  },
  rowViewContainer: {
    fontSize: 20,
    padding: 10,
    marginLeft: 75,
    fontFamily: "Constantia",
  },
  titulo: {
    fontSize: 30,
    marginLeft: 90,
    marginTop: 40,
    marginBottom: 60,
    fontWeight: "bold",
    color: "#003f87"
  },
  btnBorrar: {
    width: 112,
    marginBottom: 20,
    marginLeft: 58,
    padding: 10,
    //fontWeight: "bold",
  },
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
  loading: {
    fontSize: 15,
    fontFamily: "tahoma",
    //fontWeight:"bold",
  },
  botonIr:{
    marginTop: 40,
  },
  closeDrawer: {
    marginTop: 50,
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
});