import React from 'react';
import PropTypes from 'prop-types';
import {shippingOption, selectedValues} from '../../utilities/util';

export default class Confirmation extends React.Component {
    getShippingCost = () => {
        const shippingRate = 0.40;
        const weightVal = this.props.weight ? this.props.weight : selectedValues.weight
        const weight = parseInt(weightVal);
        const selectedShipping = this.props.shippingOption ? this.props.shippingOption : selectedValues.shippingOption
        const shippingOptionValue = parseInt(selectedShipping);
        const shippingCost = weight * shippingRate * (shippingOptionValue === shippingOption.ground ? 1 : 1.5);

        return (
            <div>
                <div>
                    <h5>Shipping Cost : <label className="address-labels">{shippingCost}</label></h5>
                </div>
                <div>
                    <h5>Shipping Option Selected : <label className="address-labels">{shippingOptionValue}</label></h5>
                </div>
                <div>
                    <h5>Shipping Weight : <label className="address-labels">{weight}</label></h5>
                </div>
            </div>)
    }

    getAddressFormat = (address) => {
        return (
            <div>
                <span className="address-labels">{address[0].label} :</span>
                <span className="address-labels">{address[0].name}</span>

                <span className="address-labels">{address[1].label} :</span>
                <span className="address-labels">{address[1].street}</span>

                <span className="address-labels"> {address[2].label} :</span>
                <span className="address-labels">{address[2].city}</span>

                <span className="address-labels">{address[3].label} :</span>
                <span className="address-labels">{address[3].state}</span>

                <span className="address-labels">{address[4].label} :</span>
                <span className="address-labels">{address[4].zip}</span>
            </div>
        )

    }

    render() {
        return (
            <div>
                <h4>Verify the below details and confirm it.</h4>
                <div>
                    <h5> Sender Address </h5>
                    {this.getAddressFormat(this.props.senderAddr)}
                    <h5> Receiver Address </h5>
                    {this.getAddressFormat(this.props.receiverAddr)}
                </div>
                <div>
                    {this.getShippingCost()}
                </div>
                <div>
                    <button className="form-button" onClick={(val) => {
                        this.props.previous(this.props.wizardAction.prev)
                    }}>Previous
                    </button>
                    <button className="form-button" onClick={(val) => {
                        this.props.confirm(this.props.wizardAction.end)
                    }}>Confirm
                    </button>
                </div>
            </div>);
    }
}
Confirmation.propTypes = {
    confirm: PropTypes.func.isRequired,
    shippingOption: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    senderAddr: PropTypes.array.string,
    receiverAddr: PropTypes.array.isRequired,
    previous: PropTypes.func.isRequired
};