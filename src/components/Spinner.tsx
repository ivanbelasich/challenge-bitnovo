import React from "react";

interface SpinnerProps {
    color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ color = "darkBlue" }) => {
    return (
        <svg
            className={`animate-spin h-5 w-5 border-4 border-${color} rounded-full`}
            viewBox="0 0 24 24"
        />
    );
};

export default Spinner;
