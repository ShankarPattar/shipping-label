import React from 'react';
import PropTypes from 'prop-types';
import AddressForm from './addressForm';
import Weight from './weigth';
import ShippingOption from './shiipingOption';
import Confirmation from './confrimation';
import ProgressLabel from '../../features/shipping-label-maker/progress';
import {FROM_ADDRESS_MODEL, TO_ADDRESS_MODEL} from '../../utilities/util';

export default class Wizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressList: {From: '', To: ''},
            weight: '',
            shippingOption: '',
            stepCount: 1
        };
        this.getAddressForm = this.getAddressForm.bind(this);
        this.setWeight = this.setWeight.bind(this);
        this.setShippingOption = this.setShippingOption.bind(this);
        this.onComplete = this.onComplete.bind(this);
        }

    onSubmit = (addressModel, action) => {
        let newAdrList = this.state.addressList;
        if (action === 'sender') newAdrList.From = addressModel;
        if (action === 'reciever') newAdrList.To = addressModel;
        this.setState({addressList: newAdrList, stepCount: this.state.stepCount + 1});
    }

    setWeight(weight) {
        this.setState({weight: weight, stepCount: this.state.stepCount + 1});
    }

    setShippingOption(shippingOption) {
        this.setState({shippingOption: shippingOption, stepCount: this.state.stepCount + 1});
    }

    onComplete() {
        this.props.onComplete(this.state)
        this.setState({stepCount: 0});
    }

    previous(val) {
        this.setState({stepCount: this.state.stepCount - 1});
    }

    getAddressForm() {
        const addressForm = <AddressForm title={this.state.stepCount===1 ?"sender":"reciever"}
                                           key={this.state.stepCount}
                                           stepCount={this.state.stepCount}
                                           addressModel={this.state.stepCount===1?FROM_ADDRESS_MODEL :TO_ADDRESS_MODEL}
                                           wizardAction={this.props.wizardAction}
                                           previous={(val) => {this.previous(val)}}
                                           onSubmit={(addressModel,action)=>{this.onSubmit(addressModel, action)}}/>

        const weight = <Weight setWeight={(val) =>{this.setWeight(val)}} previous={(val) => {this.previous(val)}}
                                           wizardAction={this.props.wizardAction}/>;

        const shippingOption = <ShippingOption setShippingOption={(val) => { this.setShippingOption(val)}}
                                               previous={(val) => {this.previous(val)}}
                                               wizardAction={this.props.wizardAction}/>

        const confirmation = <Confirmation weight={this.state.weight}
                                           shippingOption={this.state.shippingOption}
                                           senderAddr={this.state.addressList.From}
                                           receiverAddr={this.state.addressList.To}
                                           confirm={ this.onComplete }
                                           previous={(val) => {this.previous(val)}}
                                           wizardAction={this.props.wizardAction}/>
        return (
            this.state.stepCount === 1 ? addressForm : this.state.stepCount === 2 ? addressForm : this.state.stepCount === 3 ? weight : this.state.stepCount === 4 ? shippingOption : this.state.stepCount === 5 ? confirmation : undefined
        )
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Shipping label maker</h3>
                    <ProgressLabel step={this.state.stepCount}/>
                    {this.getAddressForm()}
                </div>
                <div>

                </div>
            </div>

        );

    }
}
Wizard.propTypes = {
    onAction: PropTypes.func,
    wizardAction:PropTypes.object.isRequired
};
