import React, {Component} from 'react'
import Modal from '../../components/UI/Modal/Modal';
// import axios from '../../axios-order';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            }) 
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log(error);
                this.setState({error: error});
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorDismissHandler = () => {
            this.setState({error: null});
        }

        render(){
            return (
                <React.Fragment>
                    <Modal show={this.state.error} dismiss={this.errorDismissHandler}>
                        {/* TODO change to error message */}
                        {this.state.error && this.state.error.message}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </React.Fragment>
            );
        }
    }
}

export default withErrorHandler
