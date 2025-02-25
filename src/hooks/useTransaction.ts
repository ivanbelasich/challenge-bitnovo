import { useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';

const useTransaction = (paymentDetails: any) => {
    const { sendTransaction } = useSendTransaction();

    const handleSendTransaction = async () => {
        console.log("holis")
        if (!paymentDetails || !paymentDetails.address) return;

        const to = paymentDetails.address;
        const value = parseEther(paymentDetails.crypto_amount.toString());

        sendTransaction(
            { to, value },
            {
                onSuccess: (txHash) => {
                    console.log('Transacción enviada:', txHash);
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