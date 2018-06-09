import React from 'react';
import PropTypes from 'prop-types';
import '../../css/form.css';

export default class AddressForm extends React.Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
         };

    handleOnChange(key) {
        let addressModel = this.props.addressModel;
        addressModel[addressModel.findIndex(obj => obj.key === key)][key] = this[key].value;
    }

    renderForm = () => {
        let model = this.props.addressModel;
        let formUI = model.map((m) => {
            let key = m.key;
            let type = m.type || "text";
            let inputClass = m.key === 'name' || m.key === 'street' ? "form-input" : m.key === 'zip' ? "form-group-zip" : m.key === 'state' ? "form-group-st" : "form-group-street";
            let labelClass = m.key === 'name' || m.key === 'street' ? "form-label-street" : "form-label";
            return (
                <div key={"form" + key}>
                    <label className={labelClass}
                           key={"l" + m.key}
                           htmlFor={m.key}>
                        {m.label}
                    </label>
                    <input
                           className={inputClass}
                           ref={(key) => {
                               this[m.key] = key
                           }}
                           type={type}
                           key={"i" + m.key}

                           onChange={() => {
                               this.handleOnChange(key)
                           }}
                           placeholder={m.name?m.name:m.street? m.street:m.city?m.city:m.state?m.state:m.zip?m.zip:""}
                           />
                </div>
            );
        });
        return formUI;
    }

    submit() {
        this.props.onSubmit(this.props.addressModel, this.props.title);
    }


    render() {
        let title = this.props.title;
        return (
            <div>
                <form onSubmit={this.submit}>
                    <h4>Enter the {title}'s address :</h4>
                    {this.renderForm()}
                    <div>{this.props.stepCount !== 1 &&
                    <button className="form-button" onClick={(val) => {
                        this.props.previous(this.props.wizardAction.prev)
                    }}>Previous</button>}
                    <button className="form-button" type="submit">Next</button>
                    </div>
                </form>
            </div>);
    }
}
AddressForm.propTypes = {
    addressModel: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    previous: PropTypes.func.isRequired,
    stepCount: PropTypes.number.isRequired
};