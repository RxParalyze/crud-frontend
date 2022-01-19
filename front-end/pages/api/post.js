import http from 'node:http'
const postApi = 'http://localhost:8080/api/posts';

export default async function handler(req, res) {
    return new Promise((resolve, reject) => {
        if (req.method === 'POST') {
            const { title, content, excerpt, authorId, published } = req.body;

            try {
                const result = await fetch(
                    postApi,
                    {
                        method: 'POST',
                        body: req,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    },
                    response => {
                        response.pipe(res);
                        resolve();
                    }
                );
            } catch(error) {
                res.status(500).json({ message: 'Storing Post failed' });
                reject();
            }
        }
        else {
            reject();
        }
    });
}