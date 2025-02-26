import { useState } from 'react';
import { ICurrency } from '@/types/currency';
import { ICreatePaymentRequest } from '@/types/payment';
import { createPayment } from '@/services/paymentService';

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
            setSelectedCurrency('');
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

        try {
            const paymentRequest: ICreatePaymentRequest = {
                expected_output_amount: parseFloat(amount),
                input_currency: selectedCurrency,
                notes: concept,
            };

            const { identifier } = await createPayment(paymentRequest)

            window.location.href = `/payment/${identifier}`;
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
