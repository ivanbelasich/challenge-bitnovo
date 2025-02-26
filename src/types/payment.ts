export interface ICreatePaymentRequest {
    expected_output_amount: number;
    input_currency: string;
    merchant_urlko?: string;
    merchant_urlok?: string;
    merchant_url_standby?: string;
    notes: string;
    reference?: string;
    fiat?: string;
    language?: string;
    tag_memo?: string;
}

export interface ICreatePaymentResponse {
    identifier: string;
    reference: string | null;
    payment_uri: string | null;
    web_url: string;
    address: string | null;
    tag_memo: string | null;
    input_currency: string | null;
    expected_input_amount: number | null;
    rate: number | null;
    notes: string;
    fiat: string;
    language: string;
}

export interface IPayment {
    fiat_amount: number;
    fiat: string;
    currency_id: string;
    merchant_device: string;
    created_at: string;
    notes: string;
    address: string;
    crypto_amount: number;
    reference: string;
    tag_memo?: string;
    expired_time: string;
    status: string;
}