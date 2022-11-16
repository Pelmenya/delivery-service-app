import http from 'http';

const url = String(process.env.COUNTER_URL || 'localhost:3001');

export const getCountViewBook = (bookId: string, cb: (cnt: number) => void) => {
    http.get(`${url}/counter/${bookId}`, (res) => {
        const { statusCode } = res;
        if (statusCode) {
            if (statusCode >= 200 || statusCode < 300) {
                res.setEncoding('utf8');
                let rowData = '';
                res.on('data', (chunk) => {
                    rowData += chunk;
                });
                res.on('end', () => {
                    const parseData = JSON.parse(rowData);
                    cb(Number(parseData));
                });
            } else console.log(`statusCode: ${statusCode}`);
        } else console.log('statusCode: undefined');
    }).on('error', (err) => {
        console.error(err);
    });
};

