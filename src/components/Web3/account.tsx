import { useAccount, useDisconnect } from 'wagmi';

export function Account() {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    return (
        <div className="text-center">

            <p className="text-sm md:text-base break-words">
                Cuenta conectada: <strong>{address}</strong>
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-2 mt-2">
                <button
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
    );
}