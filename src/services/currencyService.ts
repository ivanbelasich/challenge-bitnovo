import { API_BASE_URL, DEVICE_ID } from '@/constants/api';
import { ICurrency } from '@/types/currency';
import axios from 'axios';

const API_URL = `${API_BASE_URL}/currencies`;

export const getCurrencies = async (): Promise<ICurrency[]> => {
    try {
        const { data } = await axios.get(API_URL, {
            headers: {
                'X-Device-Id': DEVICE_ID,
            },
        });
        return data;
    }
    catch (error) {
        console.error('Error fetching currencies:', error);
        throw new Error('Failed to fetch currencies');
    }
};