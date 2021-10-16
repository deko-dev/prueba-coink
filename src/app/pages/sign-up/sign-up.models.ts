/* eslint-disable @typescript-eslint/naming-convention */
export interface StepType {
    id: string;
    name: string;
}

export interface SignUpData {
    phone_number?: string;
    names?: string;
    last_names?: string;
    document_id?: number;
    document_number?: string;
    document_expiration_date?: Date;
    birth_date?: Date;
    gender_id?: number;
    state_id?: string;
    city_id?: string;
    address?: string;
    pin?: string;
    email?: string;
    imei?: string;
    push_registration_id?: string;
    topic_registration_id?: string;
    referrer_phonenumber?: string;
    parent_info?: string;
    query_id?: string;
}
