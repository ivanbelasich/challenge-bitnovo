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

    const [timeLeft, setTimeLeft] = useState('');
    const [activeTab, setActiveTab] = useState<'smartQR' | 'metaMask'>('smartQR');


    useEffect(() => {
        if (!paymentInfo.length) return;

        const socket = new WebSocket(`${WS_URL}/${identifier}`);
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.status) {
                setPaymentInfo((prev) => [{ ...prev[0], status: data.status }]);

                if (['EX', 'OC'].includes(data.status)) {
                    router.push('/payment/failed');
                } else if (['CO', 'AC'].includes(data.status)) {
                    router.push('/payment/success');
                }
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => socket.close();
    }, [paymentInfo, setPaymentInfo, identifier]);

    useEffect(() => {
        if (!paymentInfo.length) return;

        const expiredTime = new Date(paymentInfo[0].expired_time).getTime();
        const updateTimer = () => {
            const now = Date.now();
            const difference = expiredTime - now;

            if (difference <= 0) {
                setTimeLeft('00:00');
                return;
            }

            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [paymentInfo]);

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
                <div className="flex pt-20 justify-center gap-6 h-[579px]">
                    <PaymentDetails paymentDetails={paymentDetails} />
                    <PaymentActions
                        paymentDetails={paymentDetails}
                        timeLeft={timeLeft}
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
