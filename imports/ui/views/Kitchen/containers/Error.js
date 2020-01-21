// ==================== import dependencies for this component ================
import React, { Component } from 'react';
import { Col, PageHeader, Icon, Input, Card, Button } from 'antd';
import { reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import * as PageActions from '../modules/actions';

// ================= peer dependencies ==========================
import { LargeText, Section } from 'lib/components/snippets';
// ==================== import dependencies for this component =================

// ==================== ANTD Extended =================
const Search = Input.Search;

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false,
        };
    }

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <Section backgroundColor={'inherit'} justifyContent={'center'}>
                <PageHeader
                    onBack={() => this.props.navigateToRoute('origin')}
                    title="An Error Occured"
                    subTitle="Start all over again"
                />

                <Col span={18} offset={3}>
                    <Button onClick={handleSubmit} loading={submitting}>
                        Restart
                    </Button>
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
    onSubmit: PageActions.resetAndRestart,
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
