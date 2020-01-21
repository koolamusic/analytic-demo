import { Col, Icon, Button, PageHeader } from 'antd';
import { LargeText, Section } from 'lib/components/snippets';
import { reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import * as PageActions from '../modules/actions';
import { InputField } from 'lib/components/inputs';
// ==================== import dependencies for this component ================
import React, { Component } from 'react';
// ==================== import dependencies for this component =================

class Page extends Component {
    render() {
        const { handleSubmit, pristine, invalid, submitting } = this.props;

        return (
            <Section backgroundColor={'inherit'} justifyContent={'center'}>
                <PageHeader
                    onBack={() => this.props.navigateToRoute('review')}
                    title="Book a shipment"
                    subTitle="Add Shipping Origin"
                />

                <Col span={18} offset={3}>
                    <Form onSubmit={handleSubmit}>
                        <InputField
                            prefix={'user'}
                            placeholder="Enter your full name"
                            name={'name'}
                        />
                        <Button
                            disabled={pristine || invalid || submitting}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Form>
                </Col>
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
    onSubmit: PageActions.submitCheckout,
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
