import { Subject } from 'rxjs';

const subject = new Subject();

export const cartSumService = {
    sendCartSum: cartSum => subject.next(cartSum),
    getCartSum: () => subject.asObservable()
};