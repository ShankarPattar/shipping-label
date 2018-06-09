import React from 'react';
import Progress from 'react-progressbar';
import PropTypes from 'prop-types';
export default class ProgressLabel extends React.Component {
    render() {
        return (
            <div className="progress-bar">
                <Progress completed={this.props.step * 20}/>
                {this.props.step && <label> Step{this.props.step} of Step5</label>}
            </div>
        )
    }
}

ProgressLabel.propTypes = {
    step: PropTypes.number.isRequired
};