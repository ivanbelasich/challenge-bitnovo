import React from 'react';

const MetaMaskPayment = ({ handleMetaMaskPayment, isLoading }) => {
    return (
        <button onClick={handleMetaMaskPayment} disabled={isLoading}>
            {isLoading ? 'Procesando...' : 'Pagar con MetaMask'}
        </button>
    );
};

export default MetaMaskPayment;