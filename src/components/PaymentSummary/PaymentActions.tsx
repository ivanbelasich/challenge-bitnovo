import React, { useState } from 'react';
import Image from 'next/image';
import { IPayment } from '@/types/payment';
import { ConnectWallet } from '../Web3/connect-wallet';

interface PaymentActionsProps {
    paymentDetails: IPayment;
    timeLeft: string;
    activeTab: 'smartQR' | 'metaMask';
    setActiveTab: (tab: 'smartQR' | 'metaMask') => void;
    handleSendTransaction: () => void;
}

const PaymentActions: React.FC<PaymentActionsProps> = ({
    paymentDetails,
    timeLeft,
    activeTab,
    setActiveTab,
}) => {

    const [copiedField, setCopiedField] = useState('');
    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(''), 2000);
    };

    return (
        <div className="flex flex-col text-darkBlue w-full px-4 md:px-0">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-center">Realiza el Pago</h2>
            <div className="bg-white w-full max-w-lg p-4 md:p-6 rounded-2xl shadow-md mx-auto">
                <p className="flex justify-center items-center gap-2 text-sm md:text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {timeLeft}
                </p>

                <div className="flex justify-center space-x-2 md:space-x-4 mb-4 my-4">
                    <button
                        onClick={() => setActiveTab('smartQR')}
                        className={`p-2 text-sm md:text-base w-full md:w-auto ${activeTab === 'smartQR' ? 'bg-lightBlue text-white' : 'bg-lightGray'} rounded-full`}
                    >
                        Smart QR
                    </button>
                    <button
                        onClick={() => setActiveTab('metaMask')}
                        className={`p-2 text-sm md:text-base w-full md:w-auto ${activeTab === 'metaMask' ? 'bg-lightBlue text-white' : 'bg-lightGray'} rounded-full`}
                    >
                        Web3
                    </button>
                </div>

                {activeTab === 'smartQR' ? (
                    <div className="flex justify-center">
                        <Image
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${paymentDetails.address}`}
                            alt="SmartQR"
                            width={150}
                            height={150}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col space-y-2 md:space-y-4">
                        <ConnectWallet />
                    </div>
                )}

                <div className="text-center mt-4 text-sm md:text-base space-y-2">
                    <div className="flex items-center justify-center gap-2">
                        <p>
                            Enviar <strong>{paymentDetails.crypto_amount} {paymentDetails.currency_id}</strong>
                        </p>
                        <button onClick={() => handleCopy(paymentDetails.crypto_amount.toString(), 'amount')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M16 3H9a2 2 0 00-2 2v2M16 3v4M8 3v4" />
                            </svg>
                        </button>
                        {copiedField === 'amount' && <span className="text-green-500 text-sm">Copiado!</span>}
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <p className="break-words overflow-hidden">{paymentDetails.address}</p>
                        <button onClick={() => handleCopy(paymentDetails.address, 'address')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M16 3H9a2 2 0 00-2 2v2M16 3v4M8 3v4" />
                            </svg>
                        </button>
                        {copiedField === 'address' && <span className="text-green-500 text-sm">Copiado!</span>}
                    </div>

                    {paymentDetails.tag_memo && (
                        <div className="mt-2 p-2 bg-red-100 border-l-4 border-red-500 text-red-700">
                            <div className="flex items-center justify-between">
                                <p>
                                    <strong>Etiqueta de Destino:</strong> {paymentDetails.tag_memo}
                                </p>
                                <button onClick={() => handleCopy(paymentDetails.tag_memo || '', 'tagMemo')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M16 3H9a2 2 0 00-2 2v2M16 3v4M8 3v4" />
                                    </svg>
                                </button>
                            </div>
                            {copiedField === 'tagMemo' && <span className="text-green-500 text-sm">Copiado!</span>}
                            <p className="font-semibold mt-2">
                                ⚠️ Si no incluyes esta etiqueta al realizar el pago, podrías perder los fondos.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentActions;
