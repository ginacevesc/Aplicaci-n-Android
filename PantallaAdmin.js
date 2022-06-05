import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class PantallaAdmin extends Component {
    render() {
        return (
            <View>
                <View>
                    <Text style = {styles.Titulo}> Prueba </Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    Titulo: {
        fontSize: 90,
        marginLeft: 25,
        marginTop: 10,
        marginBottom: -10,
        fontWeight: "bold",
        color: "red"
      },
  });
