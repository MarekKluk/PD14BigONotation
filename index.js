const fetchBuyers = fetch('https://my-json-server.typicode.com/Solnick/fake-orders-db/buyers');
const fetchOrders = fetch('https://my-json-server.typicode.com/Solnick/fake-orders-db/orders');
const fetchProducts = fetch('https://my-json-server.typicode.com/Solnick/fake-orders-db/products');

Promise.allSettled([fetchBuyers, fetchOrders, fetchProducts])
    .then(handleFetchedData);

function handleFetchedData(responses) {
    Promise.allSettled([responses[0].value.json(), responses[1].value.json(), responses[2].value.json()])
        .then(dataArray => {
            const buyers = dataArray[0].value;
            const orders = dataArray[1].value;
            const products = dataArray[2].value;
            const ordersAndHisProductPair = createListOfOrdersWithPairedProduct(orders)
            const buyersAndHisOrderId = createListOfBuyersWithPairedBuyerId(buyers)
            const newListOfOrders = createListOfOrders(products, ordersAndHisProductPair);
            createOrderTiles(newListOfOrders, buyersAndHisOrderId)
        })
}
function createListOfOrdersWithPairedProduct(orders) {
    let orderIdAndHisProductPair = {};
    orders.forEach(
        order => {
            orderIdAndHisProductPair[order.productId] = order
        });
    return orderIdAndHisProductPair;
}
function createListOfBuyersWithPairedBuyerId(buyers) {
    let buyerAndHisOrderPair = {};
    buyers.forEach(
        buyer => {
            buyerAndHisOrderPair[buyer.id] = buyer
        });
    return buyerAndHisOrderPair;
}
function createListOfOrders(products, ordersAndHisProductPair) {
    const newListOfOrders = [];
    products.forEach(product => {
        newListOfOrders.push({
            id: ordersAndHisProductPair[product.id].id,
            buyerId: ordersAndHisProductPair[product.id].buyerId,
            product: {
                amount: 1,
                name: product.name,
            }
        })
    })
    return newListOfOrders
}

function createOrderTiles (orders, buyers) {
    orders.forEach(order =>{
        const tile = createOrderTile(order, buyers[order.buyerId]);
        document.body.append(tile);
    })
}

function createOrderTile(order, buyer) {
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
}
