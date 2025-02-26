'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import usePaymentInfo from '@/hooks/usePaymentInfo';
import PaymentDetails from '@/components/PaymentSummary/PaymentDetails';
import PaymentActions from '@/components/PaymentSummary/PaymentActions';
import PaymentModal from '@/components/PaymentSummary/PaymentModal';
import { WS_URL } from '@/constants/api';


const PaymentSummaryPage = () => {
    const router = useRouter();
    const { identifier } = router.query;
    const { paymentInfo, setPaymentInfo, isLoading, error } = usePaymentInfo(identifier as string); const [showModal, setShowModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const [timeLeft, setTimeLeft] = useState('');
    const [activeTab, setActiveTab] = useState<'smartQR' | 'metaMask'>('smartQR');

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSuccessAction = () => {
        closeModal();
        router.push("/");
    };

    useEffect(() => {
        if (!paymentInfo.length) return;

        const socket = new WebSocket(`${WS_URL}/${identifier}`);
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.status) {
                setPaymentInfo((prev) => [{ ...prev[0], status: data.status }]);

                if (['EX', 'OC'].includes(data.status)) {
                    setIsSuccess(false);
                    setShowModal(true);
                } else if (['CO', 'AC'].includes(data.status)) {
                    setIsSuccess(true);
                    setShowModal(true);
                }
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            socket.close();
        };
    }, [paymentInfo, setPaymentInfo, identifier]);

    useEffect(() => {
        if (!paymentInfo.length) return;

        const expiredTime = new Date(paymentInfo[0].expired_time).getTime();
        const updateTimer = () => {
            const now = new Date().getTime();
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


    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar la información del pago.</p>;
    if (!paymentInfo.length) return <p>No se pudo cargar la información del pago.</p>;

    const paymentDetails = paymentInfo[0];

    return (
        <div className="w-full h-screen bg-background text-black">
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
            <PaymentModal
                showModal={showModal}
                isSuccess={isSuccess}
                closeModal={closeModal}
                onSuccessAction={handleSuccessAction}
            />
        </div>
    );
};

export default PaymentSummaryPage;