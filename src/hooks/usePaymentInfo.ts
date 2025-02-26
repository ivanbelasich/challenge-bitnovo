import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, DEVICE_ID } from '@/constants/api';
import { IPayment } from '@/types/payment';

const usePaymentInfo = (identifier: string) => {
    const [paymentInfo, setPaymentInfo] = useState<IPayment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!identifier) return;

        const fetchPaymentInfo = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/orders/info/${identifier}`,
                    {
                        headers: {
                            'X-Device-Id': DEVICE_ID,
                        },
                    }
                );

                if (Array.isArray(response.data) && response.data.length > 0) {
                    setPaymentInfo(response.data);
                } else {
                    setError(new Error("Respuesta inválida de la API"));
                }
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaymentInfo();
    }, [identifier]);

    return { paymentInfo, isLoading, error, setPaymentInfo };
};

export default usePaymentInfo;