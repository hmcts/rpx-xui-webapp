import { CryptoWrapper } from './cryptoWrapper';

describe('Crypto Wrapper', () => {
    const cryptoWrapper = new CryptoWrapper();
    it('should be created', () => {
        expect(cryptoWrapper).toBeTruthy();
    });

    it('should be encypt and decrypt', () => {
        const encyptedObject = cryptoWrapper.encrypt('message');
        expect(cryptoWrapper.decrypt(encyptedObject)).toEqual('message');
    });
});
