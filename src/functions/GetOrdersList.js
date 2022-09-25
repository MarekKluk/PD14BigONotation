export default class GetOrdersList {
  constructor() {
    this.fetchBuyers = fetch(
      'https://my-json-server.typicode.com/Solnick/fake-orders-db/buyers',
    );
    this.fetchOrders = fetch(
      'https://my-json-server.typicode.com/Solnick/fake-orders-db/orders',
    );
    this.fetchProducts = fetch(
      'https://my-json-server.typicode.com/Solnick/fake-orders-db/products',
    );
    this.initializeFetchingOrders();
  }

  initializeFetchingOrders = () => {
    Promise.allSettled([
      this.fetchBuyers,
      this.fetchOrders,
      this.fetchProducts,
    ]).then(this.handleFetchedData);
  };

  handleFetchedData = (responses) => {
    Promise.allSettled([
      responses[0].value.json(),
      responses[1].value.json(),
      responses[2].value.json(),
    ]).then((dataArray) => {
      const buyers = dataArray[0].value;
      const orders = dataArray[1].value;
      const products = dataArray[2].value;
      const ordersAndHisProductPair = this.createListOfOrdersWithPairedProduct(orders);
      this.buyersAndHisOrderId = this.createListOfBuyersWithPairedBuyerId(buyers);
      this.newListOfOrders = this.createListOfOrders(
        products,
        ordersAndHisProductPair,
      );
    });
  };

  createListOfOrdersWithPairedProduct = (orders) => {
    let orderIdAndHisProductPair = {};
    orders.forEach((order) => {
      orderIdAndHisProductPair[order.productId] = order;
    });
    return orderIdAndHisProductPair;
  };

  createListOfBuyersWithPairedBuyerId = (buyers) => {
    let buyerAndHisOrderPair = {};
    buyers.forEach((buyer) => {
      buyerAndHisOrderPair[buyer.id] = buyer;
    });
    return buyerAndHisOrderPair;
  };

  createListOfOrders = (products, ordersAndHisProductPair) => {
    const newListOfOrders = [];
    products.forEach((product) => {
      newListOfOrders.push({
        id: ordersAndHisProductPair[product.id].id,
        buyerId: ordersAndHisProductPair[product.id].buyerId,
        product: {
          amount: 1,
          name: product.name,
        },
      });
    });
    return newListOfOrders;
  };

  createOrderTile = (order, buyer) => {
    const tile = document.createElement('div');
    tile.style.border = '1px solid black';
    tile.style.width = '200px';
    tile.style.height = '100px';
    const orderDetails = document.createElement('span');
    orderDetails.innerText = `order: ${order.id} \n ${order.product.amount}: ${order.product.name}`;
    const buyerDetails = document.createElement('span');
    buyerDetails.innerHTML = `bought by: ${buyer.name}`;

    tile.append(orderDetails);
    tile.append(document.createElement('p'));
    tile.append(buyerDetails);

    return tile;
  };

  renderListOfOrders = (orders, buyers) => {
    orders.forEach((order) => {
      const tile = this.createOrderTile(order, buyers[order.buyerId]);
      document.body.append(tile);
    });
  };
}
