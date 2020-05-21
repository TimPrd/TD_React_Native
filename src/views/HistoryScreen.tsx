import { StyleSheet, View, RefreshControl, ScrollView, Alert } from 'react-native';
import { Text, Button, Icon } from 'native-base';
import ListProduct from '../components/ListProduct';

import { AsyncStorage } from 'react-native';
import * as React from 'react';



export default class HistoryScreen extends React.Component {

    products = []
    title = "History";
    navigationWillFocusListener = undefined;

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            refreshing: false,
        }
        // const { navigation } = this.props;
        // this.navigationWillFocusListener = navigation.addListener('focus', async () => {
        //     // this.forceUpdate();
        //     await this.loadStore()
        // });
    }

    async componentDidMount() {
        this.loadStore()
    }

    componentWillUnmount() {
        // this.navigationWillFocusListener.remove()
    }

    async _onRefresh() {
        this.setState({ refreshing: true });
        this.loadStore().then(() => this.setState({ refreshing: false }));
    }

    clearAllHistory() {
        AsyncStorage.clear();
    }

    loadStore = async () => {
        try {
            const value = await AsyncStorage.getItem('PRODUCTS');
            if (value !== null) {
                const products = JSON.parse(value)
                this.setState({ products: products });
            }
            console.log()
        } catch (error) {
            // Error retrieving data
        }
    }

    render() {
        return (
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                />
            }>
                {!this.state.products.length
                    ? <Text style={{ textAlign: "center", marginTop: "50%" }}>No history...</Text>
                    : <ListProduct title={this.title} products={this.state.products} clearHistoryFunction={this.clearAllHistory}></ListProduct>}
            </ScrollView>
        );
    }
} 