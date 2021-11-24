export interface Booking {
    userId: string;
    appointmentId: string;
    roleId: string;
    contract_type_id: string;
    base_location_id: string;
    region_id: string;
    beginTime: Date;
    endTime: Date;
    created: Date;
}

export interface Bookings {
    bookings: Booking[];
}
