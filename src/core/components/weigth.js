import React from 'react';
import PropTypes from 'prop-types';
import {selectedValues} from '../../utilities/util';

export default class Weight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {weight: ""}
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    onChange(val) {
        selectedValues.weight = val;
        this.setState({weight: val});
    }

    submit(){
        this.props.setWeight(this.state.weight)
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <h4>Enter the weight</h4>
                <div>
                    <label className="form-weight-label">
                    Weight :
                </label>
                    <input className="form-weight-input"
                           key="input"
                           type="number"
                           onChange={(e) => {
                               this.onChange(e.target.value)
                           }}
                           placeholder={selectedValues.weight ? selectedValues.weight : "Enter number"}
                          required/>
                    <div>
                        <button className="form-button" onClick={(val) => {
                            this.props.previous(this.props.wizardAction.prev)
                        }}>Previous
                        </button>
                        <button className="form-button" type="submit">Next</button>
                    </div>
                </div>

            </form>);
    }
}
Weight.propTypes = {
    previous: PropTypes.func.isRequired,
    setWeight: PropTypes.func.isRequired,
    wizardAction:PropTypes.object.isRequired
};