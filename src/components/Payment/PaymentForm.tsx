import React from 'react';
import { usePaymentForm } from '@/hooks/usePaymentForm';
import { ICurrency } from '@/types/currency';
import Image from 'next/image';

interface PaymentFormProps {
    currencies: ICurrency[];
}

const PaymentForm: React.FC<PaymentFormProps> = ({ currencies }) => {
    const {
        amount,
        setAmount,
        concept,
        setConcept,
        selectedCurrency,
        setSelectedCurrency,
        availableCurrencies,
        submitError,
        handleSubmit,
        isSubmitting,
    } = usePaymentForm(currencies);

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-8">

            <div>
                <label className="block mb-1 text-subtitle text-darkBlue font-bold">Importe a pagar:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-[609px] h-[56px] border border-gray rounded-[6px] px-[12px] py-[18px] text-black"
                    placeholder="Añade importe a pagar"

                />
            </div>

            <div>
                <label className="block mb-1 text-subtitle text-darkBlue font-bold">Seleccionar moneda:</label>
                <div className="relative w-[609px]">
                    {selectedCurrency && (
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Image
                                src={availableCurrencies.find(c => c.symbol === selectedCurrency)?.image || ""}
                                alt={selectedCurrency}
                                width={20}
                                height={20}
                                className="w-5 h-5"
                            />
                        </div>
                    )}

                    <select
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        className="w-full h-[56px] border border-gray rounded-[6px] px-[12px] pl-10 py-[18px] text-black 
               font-sans font-normal text-[14px] leading-[20px] tracking-[0.01em] appearance-none bg-white"

                    >
                        <option value="" disabled>Selecciona una criptodivisa</option>
                        {availableCurrencies.map((currency) => (
                            <option key={currency.symbol} value={currency.symbol}>
                                {currency.name} ({currency.symbol})
                            </option>
                        ))}
                    </select>
                    <div className="absolute text-black right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        ▼
                    </div>
                </div>
            </div>

            <div>
                <label className="block mb-1 text-subtitle text-darkBlue font-bold">Concepto:</label>
                <input
                    type="text"
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    className="w-[609px] h-[56px] border border-gray rounded-[6px] px-[12px] py-[18px] text-black"
                    placeholder="Añade descripción del pago"

                />
            </div>

            {submitError && <p className="text-red-500 mb-4 text-center">{submitError}</p>}

            <button
                type="submit"
                className="w-[609px] h-[56px] bg-lightBlue text-white rounded-[6px] flex items-center justify-center px-[12px] py-[18px] disabled:opacity-50"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
                ) : (
                    "Continuar"
                )}
            </button>
        </form>
    );
};

export default PaymentForm;
