import { setHeaders } from '../lib/proxy';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';

export async function createLabellingRole(req: EnhancedRequest,
                                          roleName: string,
                                          caseId: string,
                                          currentUserId: string,
                                          assignerId: string): Promise<any> {
    const body = createBody(roleName, caseId, currentUserId, assignerId);
    const fullPath = '';
    const headers = setHeaders(req);
    const response = await http.post(fullPath, body, { headers });
    return response;
}

export function createBody(roleName: string, caseId: string, currentUserId: string, assignerId: string): any {
    return {
        roleName,
        caseId,
        currentUserId,
        assignerId,
    }
}
