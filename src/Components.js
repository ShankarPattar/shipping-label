import React from 'react';
import { Button } from 'reactstrap';
import MultiPleSelect from './multiSelect';

export default class CheckboxOption extends React.Component {

    render() {
        return (
            <div>
                 <Button color="danger">Danger!</Button>
                 <MultiPleSelect/>
            </div>
        )
    }
}