'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import usePaymentInfo from '@/hooks/usePaymentInfo';
import PaymentDetails from '@/components/PaymentSummary/PaymentDetails';
import PaymentActions from '@/components/PaymentSummary/PaymentActions';
import { WS_URL } from '@/constants/api';
import Spinner from '@/components/Spinner';

const PaymentSummaryPage = () => {
    const router = useRouter();
    const { identifier } = router.query;
    const { paymentInfo, setPaymentInfo, isLoading, error } = usePaymentInfo(identifier as string);
    const [activeTab, setActiveTab] = useState<'smartQR' | 'metaMask'>('smartQR');


    useEffect(() => {
        if (!identifier) return;

        const socket = new WebSocket(`${WS_URL}/${identifier}`);

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data && data.status) {
                    setPaymentInfo((prev) => {
                        if (prev.length) {
                            return [{ ...prev[0], status: data.status }];
                        }
                        return prev;
                    });
                    if (['OC'].includes(data.status)) {
                        router.push('/payment/failed');
                    } else if (['EX'].includes(data.status)) {
                        router.push('/payment/expired');
                    } else if (['CO', 'AC'].includes(data.status)) {
                        router.push('/payment/success');
                    }
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, [identifier]);



    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <Spinner />
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-red-500">Error al cargar la información del pago.</p>
                </div>
            );
        }

        if (!paymentInfo.length) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-gray-500">No se encontraron detalles del pago.</p>
                </div>
            );
        }

        const paymentDetails = paymentInfo[0];

        return (
            <>
                <div className="flex flex-col md:flex-row gap-6 min-h-screen pt-10 md:pt-20 px-4">
                    <PaymentDetails paymentDetails={paymentDetails} />
                    <PaymentActions
                        paymentDetails={paymentDetails}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        handleSendTransaction={() => { }}
                    />
                </div>
            </>
        );
    };

    return <div className="w-full h-screen bg-background text-black">{renderContent()}</div>;
};

export default PaymentSummaryPage;
