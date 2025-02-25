import React from 'react';

interface PaymentDetailsProps {
    paymentDetails: any;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ paymentDetails }) => (
    < div className='flex flex-col text-darkBlue' >
        <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
        <div className="bg-lightGray w-[583px] m-h-[370px] p-[32px] rounded-2xl">
            <div className="space-y-4">
                <p><strong>Importe:</strong> {paymentDetails.fiat_amount} {paymentDetails.fiat}</p>
                <p className="border-t border-gray-300 pt-2 flex items-center gap-2">
                    <strong>Moneda Seleccionada:</strong>
                    {paymentDetails.currency_id}
                </p>
                <p className="border-t border-gray-300 pt-2"><strong>Comercio:</strong> {paymentDetails.merchant_device}</p>
                <p className="pt-2"><strong>Fecha:</strong> {new Date(paymentDetails.created_at).toLocaleString()}</p>
                <p className="border-t border-gray-300 pt-2"><strong>Concepto:</strong> {paymentDetails.notes}</p>
            </div>

        </div>
    </div >
);

export default PaymentDetails;