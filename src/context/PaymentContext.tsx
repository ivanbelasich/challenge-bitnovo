import React, { createContext, useState, useContext } from 'react';
import { IPayment } from '@/types/payment';

interface PaymentContextType {
    paymentDetails: IPayment | null;
    setPaymentDetails: (details: IPayment) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [paymentDetails, setPaymentDetails] = useState<IPayment | null>(null);

    return (
        <PaymentContext.Provider value={{ paymentDetails, setPaymentDetails }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePaymentContext = () => {
    const context = useContext(PaymentContext);
    if (context === undefined) {
        throw new Error('usePaymentContext must be used within a PaymentProvider');
    }
    return context;
};