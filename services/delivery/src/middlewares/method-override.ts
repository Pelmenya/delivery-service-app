import { Request } from 'express';
import methodOverrideFn from 'method-override';

export const methodOverride = methodOverrideFn((req: Request) => {
    if (req.body && typeof req.body === 'object' && 'method' in req.body) {
        const reqBody = req.body as { [key: string]: string };
        const methodOver = reqBody.method;
        delete reqBody.method;
        return methodOver;
    }
    return req.method;
});

