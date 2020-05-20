import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            scanned: null,
            styles: StyleSheet.create({
                container: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                layerTop: {
                    borderWidth: 1,
                    borderColor: "white",
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: Dimensions.get('window').height / 4,
                    width: Dimensions.get('window').width - 60,
                    marginRight: 15,
                    marginLeft: 15
                }
            })
        }
    }

    async componentDidMount() {
        //Getting Permission 
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    /**
     * Action to do when barcode is scanned
     */
    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true })
        console.log(`Bar code ${data} has been scanned!`);
        this.props.navigation.navigate('Details', { data });
    };

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return (
                <View>
                    <Text>No access to camera</Text>
                </View>
            );
        } else {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end'
                    }} >
                    <BarCodeScanner
                        onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                        style={[this.state.styles.container]}
                    >
                        <View style={this.state.styles.layerTop} />
                    </BarCodeScanner>

                    {this.state.scanned && <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />}
                </View >
            )
        }
    }
}