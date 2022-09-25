import './styles.css';
import GetOrdersList from './functions/GetOrdersList';
const buttonToGenerateOrdersList = document.querySelector(
  '.create-order-list-button',
);

const newOrdersList = new GetOrdersList();
buttonToGenerateOrdersList.addEventListener('click', (event) => {
  newOrdersList.renderListOfOrders(
    newOrdersList.newListOfOrders,
    newOrdersList.buyersAndHisOrderId,
  );
});
