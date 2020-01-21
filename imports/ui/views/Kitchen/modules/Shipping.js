// ==================== import dependencies for this component ================
import React, { Component } from 'react';
import { Col, PageHeader, Icon, Input, Card, Button } from 'antd';
import { reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import * as PageActions from './actions';

// ================= peer dependencies ==========================
import { LargeText, Section } from 'lib/components/snippets';
import { AddressCards } from 'lib/components/cards';
import ModalComponent from 'lib/components/modal';
import LocationForm from 'lib/components/addLocationForm';
// ==================== import dependencies for this component =================

// ==================== ANTD Extended =================
const Search = Input.Search;

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            confirmLoading: false,
            valuesPresent: false,
        };
        this._showModal = this._showModal.bind(this);
    }

    _showModal = () => {
        console.log('Clicked button');
        this.setState({
            modalVisible: true,
        });
    };

    _handleClose = () => {
        console.log('Clicked cancel button');
        this.setState({
            modalVisible: false,
        });
    };

    _addOriginAddress = data => {
        const { change } = this.props;
        change('destination_name', data.name);
        change('destination_phone', data.phone);
        change('destination_street', data.street);
        change('destination_city', data.city);
        change('destination_state_code', data.state_code);
        change('destination_country_code', data.country_code);

        this.setState({ valuesPresent: true });
        console.log('I AM ADDING ORIGINS ====>', this.props);

        this._handleClose();
    };

    render() {
        const {
            handleSubmit,
            pristine,
            invalid,
            submitting,
            dependencies,
            confirmLoading,
        } = this.props;
        console.log('xx------->> ', this.props);

        return (
            <Section backgroundColor={'inherit'} justifyContent={'center'}>
                <PageHeader
                    onBack={() => this.props.navigateToRoute('origin')}
                    title="Select your Destination"
                    subTitle="Where do you want to Ship to ?"
                />

                <Col span={18} offset={3}>
                    <Form onSubmit={handleSubmit}>
                        <Search
                            placeholder="search for user"
                            onSearch={value => console.log(value)}
                            enterButton
                        />
                        <br />
                        <br />

                        <>
                            {dependencies.locations.map((value, idx) => {
                                return (
                                    <AddressCards
                                        key={idx}
                                        obj={value}
                                        title={`${value.city}`}
                                        desc={value.street}
                                        handleButton={this._addOriginAddress}
                                        button={'Select'}
                                    />
                                );
                            })}
                        </>
                        <Section>
                            <a
                                onClick={this._showModal}
                                style={{ marginTop: 20 }}
                            >
                                Add New Destination
                            </a>
                        </Section>

                        <Button
                            onClick={handleSubmit}
                            loading={submitting}
                            type="submit"
                            disabled={
                                (pristine && invalid) ||
                                !this.state.valuesPresent
                            }
                        >
                            Submit
                        </Button>
                    </Form>
                </Col>

                <ModalComponent
                    FormComponent={
                        <LocationForm onSubmit={this._addOriginAddress} />
                    }
                    modalVisible={this.state.modalVisible}
                    onCancel={this._handleClose}
                    footer={[]}
                />
            </Section>
        );
    }
}

function mapStateToProps(state) {
    return state.pay;
}

const mapDispatchToProps = {
    navigateToRoute: PageActions.navigateToRoute,
};

// ============== Wrap Component around Redux Form ========
const NameForm = reduxForm({
    form: 'pay',
    onSubmit: PageActions.submitDestination,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(Page);
// ============== Wrap Component around Redux Form ========

// =========== Wrap Form Around Global Store ==============
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NameForm);
// ============ Wrap Form Around Global Store ============
