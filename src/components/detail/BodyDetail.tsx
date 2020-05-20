import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Title, View, Thumbnail } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import { AppLoading } from 'expo';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class BodyDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Row size={4} style={{ marginTop: 5 }}>
                <Col>
                    <Row size={5}>
                        <Text style={{ fontWeight: 'bold' }}> Ingrédients : </Text>
                    </Row>
                    <Row size={90}>
                        <List dataArray={this.props.ingredients}
                            renderRow={(item) =>
                                <ListItem>
                                    <Body>
                                        <Text>{item.text}</Text>
                                        {'vegetarian' in item &&
                                            <Text note> Végétarien : {item.vegetarian}</Text>}
                                    </Body>
                                    <Right>
                                        <Text note>{Math.round(item.percent) || '?'} % </Text>
                                    </Right>
                                </ListItem>
                            }>
                        </List>
                    </Row>
                </Col>
            </Row>
        );
    }
}