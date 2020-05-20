import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { AsyncStorage } from 'react-native';
import BodyDetail from '../components/detail/BodyDetail';
import HeaderDetail from '../components/detail/HeaderDetail';
import { AppLoading } from 'expo';

interface IProps {
    route: any;
}

interface IState {
    product_slug: string;
    product: object;
    loading?: boolean
}

export default class DetailsScreen extends React.Component<IProps, IState> {
    static navigationOptions = ({ navigation }) => {
        return {
            headerVisible: () => false,
            headerTitle: () => <Text>{navigation.getParam('product_name', 'valeur manquante')}</Text>,
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => alert('This is a button!')}
                    style={{ marginRight: 15 }}
                >
                    <Icon name="heart" />
                </TouchableOpacity>
            ),
        };
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            product_slug: props.route.params.data || "",
            product: {},
            loading: true
        }
    }

    async componentDidMount() {
        try {
            const apiCall = await fetch(`https://us.openfoodfacts.org/api/v0/product/${this.state.product_slug}`);
            const responseCall = await apiCall.json();
            const product = responseCall.product;
            this.setState({ product, loading: false });
            this.saveInStore(product)
        } catch (err) {
            console.log("Error fetching data-----------", err);
        }
    }

    saveInStore = async (product) => {
        try {
            const productsStore = await AsyncStorage.getItem('PRODUCTS');
            const productToSave = { ...product, date: new Date().setHours(0, 0, 0, 0) };
            if (productsStore !== null) {
                let products = JSON.parse(productsStore);
                products.push(productToSave)
                await AsyncStorage.setItem('PRODUCTS', JSON.stringify(products));
                console.log("SAVE WITH OTHERS")
            } else {
                await AsyncStorage.setItem('PRODUCTS', JSON.stringify([productToSave]));
                console.log("SAVE WITH NEW TAB")
            }
        } catch (error) {
            console.log(error);
        }
    }

    styles = StyleSheet.create({
        grid: {
            height: 100,
            marginTop: 15,
            marginBottom: 5
        },
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
        if (this.state.loading) {
            return <AppLoading />;
        }
        return (
            <Container>
                <Grid style={this.styles.grid}>
                    {/* Header */}
                    <Row>
                        <HeaderDetail product={this.state.product}></HeaderDetail>
                    </Row>
                    {/* Ingredients */}
                    <BodyDetail ingredients={this.state.product.ingredients}></BodyDetail>
                </Grid>
            </Container>
        );
    }
} 