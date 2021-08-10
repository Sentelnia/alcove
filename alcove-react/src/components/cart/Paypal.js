import React from "react";
import ReactDOM from "react-dom"

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

class Paypal extends React.Component {
  createOrder(data, actions) {
    console.log('data createOrder:',data)
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: this.props.amount,
          },
        },
      ],
    });
  }

  onApprove(data, actions) {
    this.props.cartToOrder();
    return actions.order.capture();
  }

  render() {
    return (
      <PayPalButton
        createOrder={(data, actions) => this.createOrder(data, actions)}
        onApprove={(data, actions) => this.onApprove(data, actions)}
      />
    );
  }
}

export default Paypal;