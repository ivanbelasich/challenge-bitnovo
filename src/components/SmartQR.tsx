import React from 'react';

const SmartQR = ({ qrCodeUrl }) => {
    return (
        <div>
            <p>Escanea este código QR para pagar con SmartQR:</p>
            <img src={qrCodeUrl} alt="QR Code" className="w-40 h-40" />
        </div>
    );
};

export default SmartQR;
