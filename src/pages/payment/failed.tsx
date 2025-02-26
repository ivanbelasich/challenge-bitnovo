import { useRouter } from 'next/router';

const PaymentFailed = () => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full">
                        ❌
                    </div>
                </div>
                <h2 className="text-xl font-bold text-red-700">¡Pago fallido!</h2>
                <p className="text-gray-600 mt-2">
                    Ha ocurrido un error con el pago.
                </p>
                <button
                    onClick={() => router.push('/')}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Crear nuevo pago
                </button>
            </div>
        </div>
    );
};

export default PaymentFailed;
