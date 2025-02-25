import { useState } from 'react';
import axios from 'axios';
import { ICurrency } from '@/types/currency';
import { API_BASE_URL } from '@/constants/api';

export const usePaymentForm = (currencies: ICurrency[]) => {
    const [amount, setAmount] = useState('');
    const [concept, setConcept] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [availableCurrencies, setAvailableCurrencies] = useState<ICurrency[]>(currencies);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [tagMemo, setTagMemo] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAmountChange = (value: string) => {
        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) {
            setAmount('');
            setAvailableCurrencies(currencies);
            return;
        }
        setAmount(value);
        setAvailableCurrencies(
            currencies.filter(currency => {
                const min = parseFloat(currency.min_amount);
                const max = parseFloat(currency.max_amount);
                return numericValue >= min && numericValue <= max;
            })
        );
    };

    const handleSubmit = async () => {
        setSubmitError(null);
        setIsSubmitting(true);

        if (!amount || !selectedCurrency || !concept) {
            setSubmitError('Por favor, completa todos los campos.');
            setIsSubmitting(false);
            return;
        }

        if (['XRP', 'XLM', 'ALGO'].includes(selectedCurrency) && !tagMemo) {
            setSubmitError('Por favor, ingresa el TAG/MEMO.');
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append('expected_output_amount', amount);
        formData.append('input_currency', selectedCurrency);
        formData.append('merchant_urlko', 'https://webhook.site/error');
        formData.append('merchant_urlok', 'https://webhook.site/success');
        formData.append('notes', concept);
        formData.append('reference', 'Referencia de pago');
        formData.append('fiat', 'EUR');
        formData.append('language', 'ES');

        if (['XRP', 'XLM', 'ALGO'].includes(selectedCurrency)) {
            formData.append('tag_memo', tagMemo);
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/orders/`, formData, {
                headers: { 'X-Device-Id': '4ca42f96-c3e7-47c5-803b-d87699552538' },
            });

            window.location.href = `/payment/${response.data.identifier}`;


        } catch (error) {
            console.error('Error al crear la orden:', error);
            setSubmitError('Error al crear la orden. Inténtalo de nuevo.');
            setIsSubmitting(false);
        }
    };

    return {
        amount,
        setAmount: handleAmountChange,
        concept,
        setConcept,
        selectedCurrency,
        setSelectedCurrency,
        availableCurrencies,
        submitError,
        handleSubmit,
        tagMemo,
        setTagMemo,
        isSubmitting,
    };
};
