import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Title, View, Thumbnail } from 'native-base';

export default class ListIngredient extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
        }
    }

    async componentDidMount() {
    }

    render() {
        return (

            <List
                keyExtractor={(item,index) => index.toString()} 
                dataArray={this.props.ingredients}
                renderRow={(item) =>
                    <ListItem >
                        <Body>
                            <Text>{item.ingredientId}</Text>
                        </Body>
                        <Right>
                            <Text>{item.count}x</Text>
                        </Right>
                    </ListItem>
                }>
            </List>
        );
    }
}