import React from 'react';
import './features/shipping-features.css';
import LoginForm from './core/login/loginForm';
import Wizard from './core/components/wizard';
import { wizardAction } from './utilities/util';
import ShippingLabel from './shipping/shippingLabel';

const Welcome = ({user, onSignOut})=> {

    return (
        <div  >
            <label className="progress-bar">Welcome <strong>{user.username}</strong>!</label>
            <label className="progress-bar"><a href=" " onClick={onSignOut}>Sign out</a></label>

        </div>
    )
}
class ShippingLabelMaker extends React.Component {

    constructor(props) {
        super(props);
        this.onComplete = this.onComplete.bind(this);
        this.state = {
            shippingInfo:null,
            user: null
        }
    }
    signIn(username, password) {
          this.setState({
            user: {
                username,
                password,
            }
        })
    }
    signOut() {
        this.setState({user: null})
    }

    onComplete(shippingInfo) {
        console.log(shippingInfo);
        this.setState({
            shippingInfo: {
                shippingInfo
            }
        })
    }
    render() {
        return (
            <div>{(this.state.user) ?
                <div className="dynamic-form">
                    <Welcome user={this.state.user} onSignOut={this.signOut.bind(this)}/>
                    {! this.state.shippingInfo &&  <Wizard  wizardContext = {this.state.shippingInfo} onComplete={(shippingInfo)=>{this.onComplete(shippingInfo)}} wizardAction={wizardAction}/>}
                    {this.state.shippingInfo && <ShippingLabel/>}
                    </div>
                    : <LoginForm onSignIn={this.signIn.bind(this)} />}
            </div>
        )

    }
}
export default ShippingLabelMaker;


