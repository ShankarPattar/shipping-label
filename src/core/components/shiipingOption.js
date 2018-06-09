import React from 'react';
import PropTypes from 'prop-types';
import  {selectedValues, shippingOption} from './../../utilities/util';

export default class ShippingOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {shippingOption: ""}
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    onChange(val) {
        selectedValues.shippingOption = val;
        this.setState({shippingOption: val});
    }

    submit(){
        this.props.setShippingOption(this.state.shippingOption);
    }
    render() {
       return (
            <form onSubmit={this.submit}>
                <h4>Select the shipping option</h4>
                <div>
                    <label className="form-weight-label">
                        Shipping Option :
                    </label>

                    <select className="form-weight-input" required  onChange={(e) => {
                        this.onChange(e.target.value)
                    }}>
                        <option value=""> None </option>
                        <option value={shippingOption.ground}>1</option>
                        <option value={shippingOption.priority}>2</option>
                    </select>

                </div>
                <div>
                    <button className="form-button" onClick={(val) => {
                        this.props.previous(this.props.wizardAction.prev)
                    }}>Previous
                    </button>
                    <button className="form-button" type="submit">Next</button>
                </div>

            </form>);
    }
}

ShippingOption.propTypes = {
    shippingOption: PropTypes.string,
    previous: PropTypes.func.isRequired,
    stepCount: PropTypes.number,
    setShippingOption: PropTypes.func.isRequired,
    wizardAction:PropTypes.object.isRequired
};