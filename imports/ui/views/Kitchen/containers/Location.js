// ==================== import dependencies for this component ================
import React, { Component } from 'react';
import { Modal, Col, PageHeader, Icon, Input, Card, Button } from 'antd';
import { reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import * as PageActions from '../modules/actions';

// =========== peer dependencies ===============
import { LargeText, Section } from 'lib/components/snippets';
import { SearchField } from 'lib/components/inputs';
import LocationForm from 'lib/components/addLocationForm';
import { AddressCards } from 'lib/components/cards';
import ModalComponent from 'lib/components/modal';
// ==================== import dependencies for this component =================

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
        change('origin_name', data.name);
        change('origin_phone', data.phone);
        change('origin_street', data.street);
        change('origin_city', data.city);
        change('origin_state_code', data.state_code);
        change('origin_country_code', data.country_code);

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
                    onBack={() => this.props.navigateToRoute('disclaimer')}
                    title="Book a shipment"
                    subTitle="Add Shipping Origin"
                />

                <Col span={18} offset={3}>
                    <Form onSubmit={handleSubmit}>
                        <SearchField
                            name={'search'}
                            placeholder={'input search text'}
                            onSearch={value => console.log(value)}
                            // onSearch={handleSubmit}
                            // enterButton
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
                                Add New Location
                            </a>
                        </Section>

                        <Button
                            onClick={handleSubmit}
                            type="submit"
                            loading={submitting}
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
                    footer={
                        [
                            // <Button key="back"  onClick={this._handleCancel}>Cancel</Button>,
                            // <Button key="submit" type="primary" onClick={this._addOriginAddress}>Submit</Button>
                        ]
                    }
                />
            </Section>
        );
    }
}

function mapStateToProps(state) {
    return state.ship;
}

const mapDispatchToProps = {
    navigateToRoute: PageActions.navigateToRoute,
};

// ============== Wrap Component around Redux Form ========
const NameForm = reduxForm({
    form: 'ship',
    onSubmit: PageActions.submitOrigin,
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
