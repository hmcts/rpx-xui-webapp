import { ensureSessionCookies } from '../../common/sessionCapture';

export default async function a11ySessionGlobalSetup(): Promise<void> {
  await ensureSessionCookies('STAFF_ADMIN');
}
