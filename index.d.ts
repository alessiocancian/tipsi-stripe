
export interface StripeOptions {
		publishableKey: string
		merchantId?: string
		androidPayMode?: string
}

export type AccountHolderType = 'company' | 'individual'

export type PaymentMethodAddress = {
		city: string
		country: string
		line1: string
		line2: string
		postalCode: string
		state: string
}

export type PaymentMethodBillingDetails = {
		address: PaymentMethodAddress
		email: string
		name: string
		phone: string
}

export type CardBrandSlug =
		| 'unknown'
		| 'amex'
		| 'diners'
		| 'discover'
		| 'jcb'
		| 'mastercard'
		| 'unionpay'
		| 'visa'

export type CardBrandPresentableString =
		| 'Unknown'
		| 'American Express'
		| 'Diners Club'
		| 'Discover'
		| 'JCB'
		| 'MasterCard'
		| 'UnionPay'
		| 'Visa'

export type PaymentMethodCard = {
		brand?: CardBrandSlug
		country?: string
		expMonth: number
		expYear: number
		cvc: string
		number: string
		funding?: 'credit' | 'debit' | 'prepaid' | 'unknown'
		last4?: string
}

export type PaymentMethod = {
		id: string
		created: number
		livemode: boolean
		type: string
		card: PaymentMethodCard
		billingDetails: PaymentMethodBillingDetails
		customerId: string
}

export type StripePaymentIntentStatus =
		| 'unknown'
		| 'canceled'
		| 'processing'
		| 'requires_action'
		| 'requires_capture'
		| 'requires_payment_method'
		| 'requires_confirmation'
		| 'succeeded'

export type StripeSetupIntentStatus =
		| 'unknown'
		| 'canceled'
		| 'processing'
		| 'requires_action'
		| 'requires_payment_method'
		| 'requires_confirmation'
		| 'succeeded'

export type PaymentMethodParamsCardByToken = {
		token: string
}

export type CreatePaymentMethodParams = {
		billingDetails?: PaymentMethodBillingDetails
		card: PaymentMethodCard
		metadata?: object
}

export type ConfirmPaymentIntentParams = {
		clientSecret: string
		paymentMethod?: CreatePaymentMethodParams
		paymentMethodId?: string
		sourceId?: string
		returnURL?: string
		savePaymentMethod?: boolean
}

export type PaymentIntentConfirmationResult = {
		status: StripePaymentIntentStatus
		paymentIntentId: string
}

export type AuthenticatePaymentIntentParams = {
		clientSecret: string
		returnURL: string
}

export type PaymentIntentAuthenticationResult = {
		status: StripePaymentIntentStatus
		paymentIntentId: string
}

export type ConfirmSetupIntentParams = {
		clientSecret: string
		paymentMethod: CreatePaymentMethodParams
		paymentMethodId: string
		returnURL: string
}

export type SetupIntentConfirmationResult = {
		status: StripePaymentIntentStatus
		setupIntentId: string
		paymentMethodId: string
}

export type AuthenticateSetupIntentParams = {
		clientSecret: string
		returnURL: string
}

export type SetupIntentAuthenticationResult = {
		status: StripeSetupIntentStatus
		setupIntentId: string
		paymentMethodId: string
}

export type ApplePayNetworks =
		| 'american_express'
		| 'discover'
		| 'master_card'
		| 'visa'

export type ApplePayAddressFields =
		| 'all'
		| 'name'
		| 'email'
		| 'phone'
		| 'postal_address'

export type ApplePayShippingType =
		| 'shipping'
		| 'delivery'
		| 'store_pickup'
		| 'service_pickup'

export type StripeSourceType =
		| 'bancontact'
		| 'bitcoin'
		| 'giropay'
		| 'ideal'
		| 'sepaDebit'
		| 'sofort'
		| 'threeDSecure'
		| 'alipay'

export interface AppleNetworkOptions {
		networks: ApplePayNetworks
}

export interface ApplePaymentOptions {
		currencyCode: string
		countryCode: string
		requiredBillingAddressFields: ApplePayAddressFields[]
		requiredShippingAddressFields: ApplePayAddressFields[]
		shippingMethods: ApplePayShippingType[]
		shippingType: ApplePayShippingType
}

export interface AndroidPaymentOptions {
		total_price: string
		currency_code: string
		line_items: AndroidPaymentRequestItem[]
		shipping_address_required: boolean
		billing_address_required: boolean
}

export interface StripeCardDetails {
		cardId: string //	The Stripe ID for the card
		brand:
				| 'JCB'
				| 'American Express'
				| 'Visa'
				| 'Discover'
				| 'Diners Club'
				| 'MasterCard'
				| 'Unknown'
		funding?: 'debit' | 'credit' | 'prepaid' | 'unknown' // iOS only
		last4: string
		dynamicLast4: string // For Apple Pay, this refers to the last 4 digits of the Device Account Number for the tokenized card
		isApplePayCard: boolean
		expMonth: number // The card’s expiration month. 1-indexed (i.e. 1 == January)
		expYear: number //	The card’s expiration year
		country: string // Two-letter ISO code representing the issuing country of the card
		currency?: string // This is only applicable when tokenizing debit cards to issue payouts to managed accounts. The card can then be used as a transfer destination for funds in this currency
		name?: string //	The cardholder’s name
		addressLine1?: string //	The cardholder’s first address line
		addressLine2?: string //	The cardholder’s second address line
		addressCity?: string //	The cardholder’s city
		addressState?: string //	The cardholder’s state
		addressCountry?: string //	The cardholder’s country
		addressZip?: string //	The cardholder’s zip code
}

export interface StripeBankDetails {
		routingNumber: string //	The routing number of this account
		accountNumber: string //	The account number for this BankAccount.
		countryCode: string //	The two-letter country code that this account was created in
		currency: string //	The currency of this account
		accountHolderName: string //	The account holder's name
		accountHolderType: AccountHolderType
		fingerprint: string //	The account fingerprint
		bankName: string //	The name of bank
		last4: string //	The last four digits of the account number
}

export interface StripeToken {
		tokenId: string
		created: number
		livemode: boolean
		card?: StripeCardDetails
		bankAccount?: StripeBankDetails
		extra?: object
}

export interface ApplePaymentRequestItem {
		label: string
		amount: string
		type: 'final' | 'pending'
}

export interface AndroidPaymentRequestItem {
		currency_code: string
		total_price: string
		unit_price: string
		quantity: string
		description: string
}

export interface CardFormParams {
		requiredBillingAddressFields: 'full' | 'zip'
		managedAccountCurrency: string
		smsAutofillDisabled: boolean
		prefilledInformation: {
				email: string
				phone: string
				billingAddress: {
						name: string
						line1: string
						line2: string
						city: string
						state: string
						postalCode: string
						country: string
						phone: string
						email: string
				}
		}
		theme: {
				primaryBackgroundColor: string
				secondaryBackgroundColor: string
				primaryForegroundColor: string
				secondaryForegroundColor: string
				accentColor: string
				errorColor: string
		}
}

export interface CardTokenParams {
		number: string
		expMonth: number
		expYear: number
		cvc: string
		name?: string
		addressLine1?: string
		addressLine2?: string
		addressCity?: string
		addressState?: string
		addressZip?: string
		addressCountry?: string
		country?: string
		currency?: string

		// Android Only
		brand?: string
		last4?: string
		fingerprint?: string
		funding?: string
}

export interface BankAccountParams {
		accountNumber: string
		countryCode: string
		currency: string
		routingNumber: string
		accountHolderName: string
		accountHolderType: AccountHolderType
}

export interface SourceParams {
		type: StripeSourceType
		amount: number
		name: string
		returnURL: string
		statementDescriptor: string
		currency: string
		email: string
		bank: string
		iban: string
		addressLine1: string
		city: string
		postalCode: string
		country: string
		card: string
}

class Stripe {
		static setOptions(options: StripeOptions): void

		static deviceSupportsNativePay(): boolean
		static canMakeNativePayPayments(options?: AppleNetworkOptions): boolean

		static paymentRequestWithNativePay(
				options: ApplePaymentOptions | AndroidPaymentOptions,
				items: ApplePaymentRequestItem[],
		): Promise<string>
		static completeNativePayRequest(): Promise<void>
		static cancelNativePayRequest(): Promise<void>
		static openNativePaySetup(): Promise<void>

		static paymentRequestWithCardForm(
				params: CardFormParams,
		): Promise<PaymentMethod>
		static createTokenWithCard(
				params: CardTokenParams,
		): Promise<StripeToken>
		static createTokenWithBankAccount(
				params: BankAccountParams,
		): Promise<StripeToken>

		static createSourceWithParams(params: SourceParams): Promise<any>

		static createPaymentMethod(
				params: CreatePaymentMethodParams,
		): Promise<PaymentMethod>

		static confirmPaymentIntent(
				params: ConfirmPaymentIntentParams,
		): Promise<PaymentIntentConfirmationResult>

		static authenticatePaymentIntent(
				params: AuthenticatePaymentIntentParams,
		): Promise<PaymentIntentAuthenticationResult>

		static confirmSetupIntent(
				params: ConfirmSetupIntentParams,
		): Promise<SetupIntentConfirmationResult>
}

export default Stripe