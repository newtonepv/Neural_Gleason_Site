import CopyPlugin from 'copy-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Disable tree-shaking for TensorFlow.js
        config.optimization.sideEffects = false;

        // Add copy-webpack-plugin configuration
        config.plugins.push(
            new CopyPlugin({
                patterns: [
                    {
                        from: './node_modules/onnxruntime-web/dist/*.wasm',
                        to: '../static/chunks/[name][ext]',
                    },
                ],
            })
        );

        return config;
    },
};

export default nextConfig;