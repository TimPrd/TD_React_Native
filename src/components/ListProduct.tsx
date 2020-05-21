import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Title, View, Thumbnail, Separator, Button, Icon } from 'native-base';
import { AppLoading } from 'expo';
export default class ListProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: null,
            products: [],
            isReady: false
        }
    }

    async loadData() {
        await this.setState({
            //reverse array (latest is first) and add porperties : custom id, timestamp -> date and if we need a separator 
            products: this.props.products
                .map((e, i, a) => a[(a.length - 1) - i])
                .map((p, index) => {
                    const { product_name, image_url, nutriscore_score } = p;
                    const product = {
                        product_name,
                        image_url,
                        nutriscore_score
                    };
                    return {
                        product,
                        id: "_" + Math.random().toString(36).substr(2, 9),
                        date: new Date(p.date),
                        isSeparator: index > 0 ? new Date(this.props.products[index - 1].date) > new Date(p.date) : true //check if we pass to another date
                    };
                })
        });
        this.setState({ isReady: true })
    }


    componentWillReceiveProps() {
        this.loadData()
    }

    componentDidMount() {
        this.loadData()
    }

    /**
     * Basic format date. Not localized at all...
     */
    formatDate = (date: Date) => {
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }

    /**
     * Create item in list
     */
    itemList = ({ product }) => {
        return (
            <ListItem thumbnail>
                <Left>
                    <Thumbnail circular source={{ uri: product.image_url }} />
                </Left>
                <Body>
                    <Text>{product.product_name}</Text>
                    <Text note numberOfLines={1}>Nutri-score : {product.nutriscore_score}/40</Text>
                </Body>
            </ListItem>
        )
    }

    /**
     * Render an item with a divider or only a listItem
     */
    renderItem = (item) => {
        return item.isSeparator
            ?
            (
                <>
                    <Separator bordered>
                        <Text>{this.formatDate(item.date)}</Text>
                    </Separator>
                    {this.itemList(item)}
                </>
            )
            :
            this.itemList(item);
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }

        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>{this.props.title}</Title>
                    </Body>
                    <Right>
                        <Button danger transparent onPress={() => this.props.clearHistoryFunction()}>
                            <Icon name="trash" />
                        </Button>
                    </Right>
                </Header>
                <List dataArray={this.state.products}
                    renderRow={(item) =>
                        this.renderItem(item)
                    }>
                </List>
            </Container >
        );
    }
}