import React from 'react';
import { StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';

import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Title, View, Thumbnail, Button, Icon } from 'native-base';
import ListIngredient from '../components/ListIngredient';
import PieApp from '../components/PieApp';

/**
 * Count how many time user ate an ingredient
 */
export default class ResultScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isPie: false,
        }
        const { navigation } = this.props;
        navigation.addListener('focus', async () => {
            await this.loadStore()
        });
    }

    async componentDidMount() {
        await this.loadStore()
    }

    loadStore = async () => {
        try {
            const value = await AsyncStorage.getItem('PRODUCTS');
            if (value !== null) {
                // get products list
                const products = await JSON.parse(value)
                // merge them all to the same array
                const ingredients = products.map(product => product.ingredients.map(ingredient => ingredient.id)).flat()
                // counts on occurences
                const counts = new Map([...new Set(ingredients)].map(
                    x => [x, ingredients.filter(y => y === x).length]
                ));
                // transform to JS array [{idIngredient, count}]
                let ingredientsCounted = [];
                const sortedValues = new Map([...counts.entries()]
                    .sort((a, b) => b[1] - a[1]))
                    .forEach((val, key) => {
                        // We should find a way to bind id to text 
                        ingredientsCounted.push({ ingredientId: key, count: val });
                    })
                this.setState({ ingredientsCounted });
            }
        } catch (error) {
            // Error retrieving data
        }
    }


    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Résultats</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.setState({ isPie: !this.state.isPie })}>
                            <Icon name={this.state.isPie ? 'list' : 'pie'} />
                        </Button>
                    </Right>
                </Header>
                {this.state.isPie ? <PieApp ingredients={this.state.ingredientsCounted}></PieApp> : <ListIngredient title="Resultats" ingredients={this.state.ingredientsCounted}></ListIngredient>}

            </Container>
        );
    }
} 
