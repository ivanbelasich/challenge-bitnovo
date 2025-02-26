import React from 'react';
import Image from 'next/image';
import ConnectWallet from '../../providers';
import { useAccount, useDisconnect } from 'wagmi';
import { IPayment } from '@/types/payment';

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
    handleSendTransaction,
}) => {
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    return (
        <div className="flex flex-col text-darkBlue w-full px-4 md:px-0">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-center">Realiza el Pago</h2>
            <div className="bg-white w-full max-w-lg p-4 md:p-6 rounded-2xl shadow-md mx-auto">
                <p className="flex justify-center items-center gap-2 text-sm md:text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 md:size-6">
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
                    <div className="flex flex-col items-center space-y-2 md:space-y-4">
                        {isConnected ? (
                            <div className="text-center">
                                <p className="text-sm md:text-base break-words">Cuenta conectada: <strong>{address}</strong></p>
                                <div className="flex flex-col md:flex-row justify-center gap-2 mt-2">
                                    <button
                                        onClick={handleSendTransaction}
                                        className="bg-blue-500 text-white p-2 rounded w-full md:w-auto"
                                    >
                                        Confirmar pago
                                    </button>
                                    <button
                                        onClick={() => disconnect()}
                                        className="bg-red-500 text-white p-2 rounded w-full md:w-auto"
                                    >
                                        Desconectar billetera
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <ConnectWallet />
                        )}
                    </div>
                )}

                <div className="text-center mt-4 text-sm md:text-base">
                    <p>Enviar <strong>{paymentDetails.crypto_amount} {paymentDetails.currency_id}</strong></p>
                    <p className="break-words overflow-hidden">{paymentDetails.address}</p>

                    {paymentDetails.tag_memo && (
                        <div className="mt-2 p-2 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm md:text-base">
                            <p><strong>Etiqueta de Destino:</strong> {paymentDetails.tag_memo}</p>
                            <p className="font-semibold">
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
