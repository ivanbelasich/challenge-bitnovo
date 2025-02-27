import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ expiredTime }: { expiredTime: string }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const expiredTimestamp = new Date(expiredTime).getTime();

        const updateTimer = () => {
            const now = Date.now();
            const difference = expiredTimestamp - now;

            if (difference <= 0) {
                setTimeLeft('00:00');
                return;
            }

            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft(`${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [expiredTime]);

    return <span>{timeLeft}</span>;
};

export default CountdownTimer;