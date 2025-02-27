import { useAccount, useDisconnect, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { usePaymentContext } from "@/context/PaymentContext";

export function Account() {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    const { paymentDetails } = usePaymentContext();

    const { data: hash, error, isPending, sendTransaction } = useSendTransaction();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

    const handleSend = () => {
        if (!paymentDetails?.address) return;
        sendTransaction({
            to: paymentDetails.address as `0x${string}`,
            value: parseEther(paymentDetails.crypto_amount.toString()),
        });
    };
    console.log({ paymentDetails })
    return (
        <div className="flex flex-col items-center w-full max-w-md bg-lightGray p-6 rounded-xl">
            <p className="text-sm w-full md:text-base text-gray-700 font-medium text-center break-words">
                Cuenta conectada: <span className="font-bold text-blue-600">{address}</span>
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-4 w-full">
                <button
                    disabled={isPending}
                    onClick={handleSend}
                    className="w-full md:w-auto px-6 py-2 text-white font-medium rounded-lg transition-all duration-300
                     bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isPending ? "Confirmando..." : `Enviar ${paymentDetails?.crypto_amount} ${paymentDetails?.currency_id}`}
                </button>

                <button
                    onClick={() => disconnect()}
                    className="w-full md:w-auto px-6 py-2 text-white font-medium rounded-lg transition-all duration-300 
                     bg-red-500 hover:bg-red-600"
                >
                    Desconectar billetera
                </button>
            </div>


            {isConfirming && <div className="mt-2 text-yellow-500 text-sm animate-pulse">Esperando confirmación...</div>}
            {isConfirmed && <div className="mt-2 text-green-500 text-sm">Transacción confirmada.</div>}
            {error && <div className="mt-2 text-red-500 text-sm">Hubo un error al procesar el pago. Por favor, intente de nuevo.</div>}
        </div>
    );
}
