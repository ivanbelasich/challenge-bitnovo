import { useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { IPayment } from '@/types/payment';

const useTransaction = (paymentDetails: IPayment) => {
    const { sendTransaction } = useSendTransaction();

    const handleSendTransaction = async () => {
        if (!paymentDetails || !paymentDetails.address) return;

        const to = paymentDetails.address as `0x${string}`;
        const value = parseEther(paymentDetails.crypto_amount.toString());

        sendTransaction(
            { to, value },
            {
                onSuccess: () => {
                    return 'Transacción enviada correctamente.';
                },
                onError: (error) => {
                    console.error('Error al enviar la transacción:', error);
                    return 'Error al enviar la transacción.';
                },
            }
        );
    };

    return { handleSendTransaction };
};

export default useTransaction;