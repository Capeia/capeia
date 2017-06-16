// @flow
import React from 'react'
import Relay from 'react-relay/classic'
import Link from 'found/lib/Link'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import classNames from 'classnames'
import { FormGroup, Glyphicon, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Field, formValueSelector, change, touch } from 'redux-form'
import { Form, Input } from 'shared/form'
import { handleMutationErrors } from 'shared/util/handleMutationErrors'
import DonationSuccessForm from './DonationSuccessForm'
import TestModeIndicator from './TestModeIndicator'
import donationValidator from 'shared/validators/donationValidator'
import { getStore } from 'store'
import {
  normalizeAmount,
  normalizeCardExpiration,
  normalizeCardNumber,
  normalizeCardCVC
} from './field-normalizers'
import s from './PaymentForm.scss'

const FORM_ID = 'payment'

type Props = {
  // TODO: If this becomes a pattern, create proper type for this
  mutation: Object,

  amountValue: ?string,

  /**
   * The form optionally handles rewards.
   * Passing an explicit null value indicates that rewards are enabled,
   * but none is selected.
   */
  reward?: ?{
    id: string,
    title: string,
    minAmount: number
  },

  onRewardRemove?: () => {}
}

type State = {
  stripeError: ?string,
  submitting: boolean,

  /**
   * Id of the created donation.
   * If this is set, it indicates success.
   */
  donationId: ?string,
  infoToken: ?string,

  /**
   * Whether or not this form is currently in Stripe test mode.
   */
  isTestMode: boolean
}

// TODO: Use client side Stripe.JS validation utils
class PaymentForm extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.ClassicRelay
  }

  props: Props
  state: State = {
    stripeError: null,
    submitting: false,
    donationId: null,
    infoToken: null,
    isTestMode: false
  }

  componentDidMount () {
    if (window.Stripe.key.startsWith('pk_test')) {
      this.setState({ isTestMode: true })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { reward } = this.props
    const amountValue = Number(this.props.amountValue || 0)
    const nextReward = nextProps.reward
    if (nextReward != null) {
      if (reward == null || reward.minAmount < nextReward.minAmount) {
        if (amountValue === 0 || nextReward.minAmount > amountValue) {
          getStore().dispatch(change(FORM_ID, 'amount', nextReward.minAmount))
        }
      }
    }
  }

  componentDidUpdate (prevProps) {
    const prevReward = prevProps.reward
    const { reward } = this.props
    if (
      (prevReward != null && reward == null) ||
      (prevReward != null && reward != null && prevReward.minAmount !== reward.minAmount)
    ) {
      // Force a re-validation (previously invalid amount could be valid now)
      // (By passing a number we bypass the internal value diff check)
      // "amountValue" doesn't always contain the newest values here for some reason,
      // so we have to juggle a bit to get reasonably intuitive behavior.
      const amount = reward != null &&
        reward.minAmount > prevReward.minAmount &&
        reward.minAmount > Number(this.props.amountValue)
        ? reward.minAmount
        : Number(this.props.amountValue)
      getStore().dispatch(change(FORM_ID, 'amount', amount))
    }
  }

  _prepateData = (data) => {
    this.setState({ stripeError: null, submitting: true })

    const cardNumber = data.cardNumber.replace(/[^\d]/g, '')
    const expRaw = data.cardExpiration.replace(/[^\d]/g, '')
    const expMonth = expRaw.slice(0, 2)
    const expYear = expRaw.slice(2)

    return new Promise((resolve, reject) => {
      try {
        window.Stripe.card.createToken({
          number: cardNumber,
          cvc: data.cardCvc,
          exp_month: expMonth,
          exp_year: expYear
        }, (status, response) => {
          if (response.error) {
            this.setState({
              stripeError: response.error.message,
              submitting: false
            })
            reject()
          }

          resolve({
            donorEmail: data.email,
            token: response.id,
            amount: data.amount,
            reward: this.props.reward && this.props.reward.id
          })
        })
      } catch (e) {
        // Should mostly happen if someone has Stripe blocked (e.g. via NoScript)
        window.alert('Failed to connect to Stripe servers')
        console.log(e)
        reject()
      }
    })
  }

  _createMutation = (data, callbacks) => {
    const mutation = this.props.mutation.create(
      data,
      this.context.relay.environment,
      {
        onSuccess: response => {
          callbacks.onSuccess(response)
          // FIXME: We shouldn't know about this. Fix by providing own mutation configs?
          const newEdge = (response.makeDonation || response.makeAotmDonation).newDonationEdge
          const infoToken = (response.makeDonation || response.makeAotmDonation).infoToken
          this.setState({
            donationId: newEdge.node.id,
            infoToken,
            submitting: false
          })
        },
        onFailure: handleMutationErrors((transaction, handle) => {
          callbacks.onFailure(transaction)
          this.setState({ submitting: false })
          handle({
            'validation': (err) => {
              this.setState({ stripeError: err.message })
              return true
            }
          })
        })
      }
    )

    return {
      commit: () => {
        mutation.commit(this.props.mutation.configs)
      }
    }
  }

  _renderInput = (field) => {
    return (
      <Input
        {...field.input}
        // TODO: Add native support for 'error' on <Input>? Maybe as pre/suffix w/ small popover?
        // (Currently we don't display error messages at all - bad!)
        className={classNames(field.className, {
          [s.fieldError]: field.meta.touched && field.meta.error
        })}
        focusClassName={field.focusClassName}
        prefix={field.prefix}
        suffix={field.suffix}
        type={field.type}
        placeholder={field.placeholder} />
    )
  }

  _renderReward () {
    const { reward, onRewardRemove } = this.props
    if (reward === undefined) return null

    let content
    if (reward === null) {
      content = 'No Reward'
    } else {
      content = (
        <span>
          Reward: <strong>{reward.title}</strong>
          {' '}
          <span
            title='Remove Reward'
            onClick={onRewardRemove}
            role='button'>⨯</span>
        </span>
      )
    }

    return (
      <div className={s.reward}>
        <div className={s.rewardLabel}>
          {content}
        </div>
      </div>
    )
  }

  _renderForm () {
    const minAmount = this.props.reward ? this.props.reward.minAmount : 1
    return (
      <div>
        <Form
          id={FORM_ID}
          validator={donationValidator(minAmount)}
          prepareData={this._prepateData}
          createMutation={this._createMutation}>
          <FormGroup className={s.amountInputWrapper}>
            <Field
              name='amount'
              component={this._renderInput}
              normalize={normalizeAmount}
              className={s.amountInput}
              prefix={<Glyphicon glyph='usd' />}
              type='number' />
          </FormGroup>

          {this._renderReward()}

          <FormGroup>
            <Field
              name='email'
              component={this._renderInput}
              prefix={<Glyphicon glyph='envelope' />}
              type='email'
              placeholder='Email' />
          </FormGroup>

          <FormGroup className={s.creditCardInput}>
            <Field
              name='cardNumber'
              component={this._renderInput}
              normalize={normalizeCardNumber}
              className={s.number}
              focusClassName={s.focus}
              prefix={<Glyphicon glyph='credit-card' />}
              placeholder='Card number' />
            <div className={s.inlineWrapper}>
              <Field
                name='cardExpiration'
                component={this._renderInput}
                normalize={normalizeCardExpiration}
                className={s.expiration}
                focusClassName={s.focus}
                prefix={<Glyphicon glyph='calendar' />}
                placeholder='MM / YY' />
              <Field
                name='cardCvc'
                component={this._renderInput}
                normalize={normalizeCardCVC}
                className={s.cvc}
                focusClassName={s.focus}
                suffix={<Glyphicon glyph='lock' />}
                placeholder='CVC' />
            </div>
          </FormGroup>

          <FormGroup style={{textAlign: 'center'}}>
            <Button bsStyle='success' type='submit'>
              Pay {this.props.amountValue && `$${this.props.amountValue}`}
            </Button>
          </FormGroup>
        </Form>

        {this.state.stripeError &&
          <p className={s.error}>{this.state.stripeError}</p>
        }

        <p className={s.notice}>
          All major credit cards are supported.
        </p>
        <p className={s.notice}>
          Payments are handled securely via <strong>Stripe</strong>.
        </p>
        <p className={s.notice}>
          By submitting this form you accept our <Link to='/terms-of-use' target='_blank'>terms of use</Link>.
        </p>

        {this.state.isTestMode &&
          <TestModeIndicator />
        }
      </div>
    )
  }

  render () {
    const completed = (this.state.donationId !== null)

    return (
      <div className={s.PaymentForm}>
        {this.state.submitting &&
          <div className={s.submitOverlay}>
            <div className={s.spinner}>
              <Glyphicon glyph='cog' />
            </div>
          </div>
        }

        <div className={s.tabHeader}>
          <div className={classNames(s.tab, {[s.active]: !completed})}>
            <div className={s.step}>1</div>
            Donate
          </div>
          <div className={classNames(s.tab, {[s.active]: completed})}>
            <div className={s.step}>2</div>
            <div>
              Personalize
              <div className={s.optional}>Optional</div>
            </div>
          </div>
        </div>

        <div className={s.tabContent}>
          {!completed &&
            this._renderForm()
          }
          {completed &&
            <DonationSuccessForm donationId={this.state.donationId} infoToken={this.state.infoToken} />
          }
        </div>
      </div>
    )
  }
}

const selector = formValueSelector(FORM_ID)
const PaymentFormWithSelectors = connect(
  state => ({
    amountValue: selector(state, 'amount')
  })
)(PaymentForm)

export default withStyles(s)(PaymentFormWithSelectors)
