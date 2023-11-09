/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/api/checkout',
            headers: [
              {
                key: 'Access-Control-Allow-Origin',
                value: '*',
              },
              {
                key: 'Access-Control-Allow-Methods',
                value: 'GET,HEAD,PUT,PATCH,POST,DELETE',
              },
            ],
          },
        ];
      },
}

module.exports = nextConfig
