import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Title, View, Thumbnail } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import { AppLoading } from 'expo';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class HeaderDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    styles = StyleSheet.create({
        tinyLogo: {
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'contain'
        },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' }
    });

    render() {
        return (
            <Row>
                <Col size={1} style={{ height: 100 }}>
                    <Image
                        style={this.styles.tinyLogo}
                        source={{ uri: this.props.product.image_url }}
                    />
                </Col>
                <Col size={2} style={{ height: 100 }}>
                    <Row size={1}>
                        <Text style={this.styles.bold}>{this.props.product.product_name}</Text>
                    </Row>
                    <Row size={2}>
                        <Text style={this.styles.italic}>{this.props.product.brands}</Text>
                    </Row>
                    <Row size={1}>
                        <Text>Allergènes : </Text>
                        <Text style={this.styles.italic}>{this.props.product.allergens_from_ingredients}</Text>
                    </Row>
                </Col>
            </Row>
        );
    }
}