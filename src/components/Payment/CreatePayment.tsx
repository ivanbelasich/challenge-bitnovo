import React, { useState, useEffect } from 'react';
import { getCurrencies } from '@/services/currencyService';
import PaymentForm from '@/components/Payment/PaymentForm';
import { ICurrency } from '@/types/currency';

const CreatePayment = () => {
    const [currencies, setCurrencies] = useState<ICurrency[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrencies = async () => {
            setIsLoading(true);
            try {
                const response = await getCurrencies();
                setCurrencies(response);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCurrencies();
    }, []);

    return (
        <div className="w-[673px] h-[530px] rounded-[16px] border border-gray-300 p-8 flex flex-col gap-8 shadow-md">
            <h1 className="text-title text-darkBlue text-center font-bold">Crear pago</h1>
            {error && <p className="text-red-500">Error cargando criptodivisas.</p>}
            {isLoading ? <p>Cargando...</p> : <PaymentForm currencies={currencies} />}
        </div>
    );
};

export default CreatePayment;
