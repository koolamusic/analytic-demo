// ==================== import dependencies for this component ================
import React, { Component } from 'react';
import styled from 'styled-components';
import {
    WrappedButton,
    WrappedCard,
    WrappedIcon,
    StyledPageHeader,
} from 'lib/components/extend';
import PropTypes from 'prop-types';
import PageWrapper from 'lib/components/layout/dashboard';
import {
    MainWrapper,
    HorizontalSpacer,
    RowSection,
} from 'lib/components/snippets';

import { reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
import * as PageActions from './actions';
// ==================== import dependencies for this component =================

const RequestRow = styled(RowSection)`
    & button:nth-child(1) {
        margin-right: 7px;
    }
`;

class Page extends Component {
    // componentDidMount() {
    //     // ==== call reset form in Redux Form Props ====
    //     this.props.reset();
    // }

    _requestType = data => {
        const { change, handleSubmit } = this.props;
        change('request_type', data);
        handleSubmit();
    };

    render() {
        const { pristine, submitting, invalid } = this.props;

        return (
            <PageWrapper
                showHeader={false}
                withNextPrevious={true}
                handlePrevClick={() => this._requestType('send')}
                previousText={'Send Escrow'}
                handleNextClick={() => this._requestType('receive')}
                // bodyProps={wizardBodyProps}
            >
                <StyledPageHeader
                    onBack={() => window.history.back()}
                    title="Disclaimer"
                    // subTitle="Please read this !!!"
                />
                <HorizontalSpacer padding={'2rem'} />
                <MainWrapper showHeader padding={'0px'}>
                    <WrappedCard>
                        <p>
                            A disclaimer is any statement that is used to
                            specify or limit the scope of obligations and rights
                            that are enforceable in a legally recognized
                            relationship (such as host/visitor,
                            manufacturer/consumer, etc.). The disclaimer usually
                            acts to relieve a party of liability in situations
                            involving risk or uncertainty.
                        </p>
                    </WrappedCard>

                    <RequestRow>
                        <WrappedButton
                            block
                            onClick={() => this._requestType('send')}
                            type={'primary'}
                        >
                            Send <WrappedIcon type="right" />
                        </WrappedButton>

                        <WrappedButton
                            block
                            onClick={() => this._requestType('receive')}
                            disabled={(pristine && invalid) || submitting}
                            loading={submitting}
                        >
                            Receive <WrappedIcon type="right" />
                        </WrappedButton>
                    </RequestRow>
                </MainWrapper>
            </PageWrapper>
        );
    }
}
Page.propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    change: PropTypes.func,
};

function mapStateToProps(state) {
    return state.pay;
}

const mapDispatchToProps = {};

// ============== Wrap Component around Redux Form ========
const FormPage = reduxForm({
    form: 'pay',
    onSubmit: PageActions.routeOrigin,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(Page);
// ============== Wrap Component around Redux Form ========

// =========== Wrap Form Around Global Store ==============
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormPage);
// ============ Wrap Form Around Global Store ============
