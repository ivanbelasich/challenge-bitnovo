import React from 'react';

interface PaymentStatusModalProps {
    showModal: boolean;
    isSuccess: boolean;
    closeModal: () => void;
    onSuccessAction?: () => void;
}

const PaymentModal: React.FC<PaymentStatusModalProps> = ({ showModal, isSuccess, closeModal, onSuccessAction }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-md text-center w-[350px]">
                <div className="flex justify-center mb-4">
                    {isSuccess ? (
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            ✅
                        </div>
                    ) : (
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            ❌
                        </div>
                    )}
                </div>

                <h2 className="text-xl font-bold mb-2">
                    {isSuccess ? '¡Pago completado!' : 'Error en el pago'}
                </h2>

                <p className="text-gray-600 mb-4">
                    {isSuccess
                        ? 'El pago se ha realizado correctamente.'
                        : 'Hubo un problema al procesar el pago. Intenta nuevamente.'}
                </p>

                {isSuccess ? (
                    <button
                        onClick={onSuccessAction}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
                    >
                        Crear nuevo pago
                    </button>
                ) : (
                    <div className="flex gap-4">
                        <button
                            onClick={closeModal}
                            className="bg-gray-300 text-black px-4 py-2 rounded-lg flex-1"
                        >
                            Cerrar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;
