import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/constants/api';

const usePaymentInfo = (identifier: string) => {
    const [paymentInfo, setPaymentInfo] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!identifier) return;

        const fetchPaymentInfo = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/orders/info/${identifier}`,
                    {
                        headers: {
                            'X-Device-Id': '4ca42f96-c3e7-47c5-803b-d87699552538',
                        },
                    }
                );

                if (Array.isArray(response.data) && response.data.length > 0) {
                    setPaymentInfo(response.data);
                } else {
                    setError(new Error("Respuesta inválida de la API"));
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaymentInfo();
    }, [identifier]);

    return { paymentInfo, isLoading, error, setPaymentInfo };
};

export default usePaymentInfo;