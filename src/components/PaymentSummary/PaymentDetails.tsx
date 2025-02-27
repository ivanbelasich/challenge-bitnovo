import { IPayment } from '@/types/payment';
import React from 'react';

interface PaymentDetailsProps {
    paymentDetails: IPayment;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ paymentDetails }) => (
    <div className="flex flex-col items-center text-darkBlue w-full h-full px-4 md:px-0">
        <h2 className="text-lg md:text-xl font-bold mb-4">Resumen del Pedido</h2>
        <div className="bg-lightGray w-full max-w-md md:max-w-lg p-4 md:p-6 rounded-2xl">
            <div className="space-y-4 md:space-y-6 text-sm md:text-base">
                <p className="flex items-center justify-between">
                    <strong>Importe:</strong>
                    <strong>{paymentDetails.fiat_amount} {paymentDetails.fiat}</strong>
                </p>
                <p className="border-t border-gray-300 pt-4 flex items-center justify-between">
                    <strong>Moneda Seleccionada:</strong>
                    <span>{paymentDetails.currency_id}</span>
                </p>
                <p className="border-t pt-4 border-gray-300 flex justify-between">
                    <strong>Comercio:</strong>
                    <span>{paymentDetails.merchant_device}</span>
                </p>
                <p className="flex justify-between">
                    <strong>Fecha:</strong>
                    <span>{new Date(paymentDetails.created_at).toLocaleString()}</span>
                </p>
                <p className="border-t pt-4 border-gray-300 flex justify-between">
                    <strong>Concepto:</strong>
                    <span>{paymentDetails.notes}</span>
                </p>
            </div>
        </div>
    </div>
);

export default PaymentDetails;
