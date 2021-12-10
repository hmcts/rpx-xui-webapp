export interface RoleExclusion {
    id: string;
    type: string;
    name: string;
    userType: string;
    notes: string;
    added: Date;
    email?: string;
    actorId: string;
}
