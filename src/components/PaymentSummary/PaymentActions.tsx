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
        <div className='flex flex-col text-darkBlue'>
            <h2 className="text-xl font-bold mb-4">Realiza el Pago</h2>
            <div className="bg-white w-[583px] m-h-[370px] p-[32px] rounded-2xl shadow-md">
                <p className='flex justify-center gap-2 p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {timeLeft}</p>
                <div className="flex justify-center space-x-4 mb-4">
                    <button
                        onClick={() => setActiveTab('smartQR')}
                        className={`p-2 ${activeTab === 'smartQR' ? 'bg-lightBlue text-white' : 'bg-lightGray'} rounded-[100px]`}
                    >
                        Smart QR
                    </button>
                    <button
                        onClick={() => setActiveTab('metaMask')}
                        className={`p-2 ${activeTab === 'metaMask' ? 'bg-lightBlue text-white' : 'bg-lightGray'} rounded-[100px]`}
                    >
                        Web3
                    </button>
                </div>

                {activeTab === 'smartQR' ? (
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <Image
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${paymentDetails.address}`}
                                alt="SmartQR"
                                width={150}
                                height={150}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 flex justify-center">
                        {isConnected ? (
                            <div>
                                <p>Cuenta conectada: {address}</p>
                                <div className='flex justify-around items-center'>
                                    <button
                                        onClick={handleSendTransaction}
                                        className="bg-blue-500 text-white p-2 rounded"
                                    >
                                        Confirmar pago
                                    </button>
                                    <button
                                        onClick={() => disconnect()}
                                        className="bg-red-500 text-white p-2 rounded"
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

                <div className="text-center mt-4">
                    <p>Enviar <strong>{paymentDetails.crypto_amount} {paymentDetails.currency_id}</strong></p>
                    <p>{paymentDetails.address}</p>
                    {paymentDetails.tag_memo && (
                        <p><strong>Etiqueta de Destino:</strong> {paymentDetails.tag_memo}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentActions;