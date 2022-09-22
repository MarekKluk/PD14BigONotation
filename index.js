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
            const listOfProducts = createListOfOrdersWithPairedProduct(orders, products);
        })
}

function createListOfOrdersWithPairedProduct(orders, products) {
    let ordersWithProducts = [];
    orders.forEach(
        order => order[]
    )
    return
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



const tile = createOrderTile({
        id: 1233,
        product: {
            amount: 2,
            name: 'Razer Keyboard'
        }},
    {
        name: 'Bob Smith'
    });
document.body.append(tile);