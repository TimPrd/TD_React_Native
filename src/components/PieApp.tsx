import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, StatusBar, View, SafeAreaView } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { Left, ListItem, List, Body, Right, Text } from 'native-base';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    title: {
        fontSize: 24,
        margin: 10
    },
    list: {
        width: "100%",
    },
    color: {
        height: "95%",
        marginRight: 15,
    }
});

export default class PieApp extends Component {
    MAX_INGREDIENTS = 5;

    constructor(props) {
        super(props);
        this.state = {
            ingredients: []
        }
    }

    componentDidMount() {
        this.setState({
            ingredients: this.props.ingredients
                .slice(0, this.MAX_INGREDIENTS)
                .map(ingredient => { return { ...ingredient, color: '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6) } })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Basic</Text>
                <PieChart
                    chart_wh={250}
                    series={[...this.state.ingredients.map(ingredient => ingredient.count)]}
                    sliceColor={[...this.state.ingredients.map(ingredient => ingredient.color)]}
                />
                <List
                    style={styles.list} 
                    keyExtractor={(item,index) => index.toString()}
                    dataArray={this.state.ingredients}
                    renderRow={(item) =>
                        <ListItem icon>
                            <Left style={[styles.color, { backgroundColor: item.color }]} />
                            <Body>
                                <Text>{item.ingredientId}</Text>
                            </Body>
                            <Right>
                                <Text>{item.count}</Text>
                            </Right>
                        </ListItem>
                    }>
                </List>

            </View>
        );
    }
}

AppRegistry.registerComponent('PieApp', () => PieApp);