import { IPayment } from '@/types/payment';
import React from 'react';

interface PaymentDetailsProps {
    paymentDetails: IPayment;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ paymentDetails }) => (
    < div className='flex flex-col text-darkBlue bg-background' >
        <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
        <div className="bg-lightGray w-[583px] m-h-[370px] p-[32px] rounded-2xl">
            <div className="space-y-6">
                <p className='flex items-center justify-between'><strong>Importe: </strong><strong> {paymentDetails.fiat_amount} {paymentDetails.fiat}</strong> </p>
                <p className="border-t border-gray-300 pt-4 flex items-center justify-between">
                    <strong>Moneda Seleccionada:</strong>
                    <strong> {paymentDetails.currency_id}</strong>
                </p>
                <p className="border-t pt-4 border-gray-300 flex justify-between"><strong>Comercio:</strong> <p>{paymentDetails.merchant_device}</p></p>
                <p className="flex justify-between"><strong>Fecha:</strong>   <p> {new Date(paymentDetails.created_at).toLocaleString()}</p></p>
                <p className="border-t pt-4 border-gray-300  flex justify-between"><strong>Concepto:</strong> <p>{paymentDetails.notes}</p></p>
            </div>

        </div>
    </div >
);

export default PaymentDetails;