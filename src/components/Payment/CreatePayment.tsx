import React, { useState, useEffect } from 'react';
import { getCurrencies } from '@/services/currencyService';
import PaymentForm from '@/components/Payment/PaymentForm';
import { ICurrency } from '@/types/currency';
import Spinner from '../Spinner';

const CreatePayment = () => {
    const [currencies, setCurrencies] = useState<ICurrency[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCurrencies = async () => {
            setIsLoading(true);
            try {
                const response = await getCurrencies();
                setCurrencies(response);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCurrencies();
    }, []);

    return (
        <div className="w-full max-w-[673px] rounded-[16px] border border-gray-300 p-4 flex flex-col shadow-md mx-4">
            <h1 className="text-lg sm:text-title text-darkBlue text-center font-bold">Crear pago</h1>
            {error && <p className="text-red-500 text-center">Error cargando criptodivisas.</p>}
            {isLoading ? (
                <div className='flex justify-center items-center h-[300px]'>
                    <Spinner />
                </div>
            ) : (
                <PaymentForm currencies={currencies} />
            )}
        </div>
    );
};

export default CreatePayment;
