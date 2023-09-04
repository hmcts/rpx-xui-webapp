export interface INotificationPreview {
    template_id: string;
    template_type: string;
    from: {
        from_email_address: string;
        from_mail_address: {
            address_line: string;
            city: string;
            county: string;
            country: string;
            postal_code: String;
        };
    };
    recipient_contact: {
        recipient_email_address: string;
        recipient_mail_address: {
            address_line: string;
            city: string;
            county: string;
            country: string;
            postal_code: String;
        };
    };
    subject: string;
    body: string;
    html: string;
}
//# sourceMappingURL=INotificationPreview.d.ts.map