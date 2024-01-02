const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const liveServer = require("live-server")

const dev=process.env.NODE_ENV
if(dev){
  liveServer.start({
    // root: "./",
    file: "index.html",
  })
}

console.log(dev)
module.exports = {
  mode: 'development',
  watch:true,
 entry: './src/index.tsx',
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.css$/i,
            use: ["style-loader", {
              loader:"css-loader",
          options:{
            modules:true
          }
        }
      ],
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
        ],
      },
    resolve: {
        extensions: ['.tsx', '.js', '.ts'],
        plugins: [
          
          new TsconfigPathsPlugin({/* options: see below */})],
            },
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',

  },
};