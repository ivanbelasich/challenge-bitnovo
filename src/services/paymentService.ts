import { API_BASE_URL, DEVICE_ID } from '@/constants/api';
import { ICreatePaymentRequest, ICreatePaymentResponse } from '@/types/payment';
import axios from 'axios';

const API_URL = `${API_BASE_URL}/orders/`;

export const createPayment = async (formData: ICreatePaymentRequest): Promise<ICreatePaymentResponse> => {
    try {
        const { data } = await axios.post(API_URL, formData, {
            headers: {
                'X-Device-Id': DEVICE_ID,
            },
        });
        return data;
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
};