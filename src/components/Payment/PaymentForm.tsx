import React from 'react';
import { usePaymentForm } from '@/hooks/usePaymentForm';
import { ICurrency } from '@/types/currency';
import Image from 'next/image';
import Spinner from '../Spinner';

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
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-8 flex flex-col">

            <div>
                <label className="block mb-1 text-subtitle text-darkBlue font-bold">Importe a pagar:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full h-[56px] border border-gray rounded-md px-3 py-4 text-black"
                    placeholder="Añade importe a pagar"

                />
            </div>

            <div>
                <label className="block mb-1 text-subtitle text-darkBlue font-bold">Seleccionar moneda:</label>
                <div className="relative w-full">
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
                        className="w-full h-[56px] border border-gray rounded-md px-3 pl-10 py-4 text-black 
               font-sans font-normal text-md leading-[20px] tracking-[0.01em] appearance-none bg-white"

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
                    className="w-full h-[56px] border border-gray rounded-md px-3 py-4 text-black"
                    placeholder="Añade descripción del pago"

                />
            </div>

            {submitError && <p className="text-red-500 mb-4 text-center">{submitError}</p>}

            <button
                type="submit"
                className="w-full h-[56px] bg-lightBlue text-white rounded-md flex items-center justify-center px-3 disabled:opacity-50"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <Spinner />
                ) : (
                    "Continuar"
                )}
            </button>
        </form>
    );
};

export default PaymentForm;
