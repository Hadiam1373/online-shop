import {number, object} from "yup";

const otpSchema = object({
    otp:number().required('Otp is required'),
})