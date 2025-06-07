const path = require("path");
const isDevelopment = process.env.NODE_ENV !== 'production';

/**@type {import('webpack').Configuration}*/
module.exports = [
  {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
      localeloader: "./src/webviews/localeloader.ts",
      gradle2020importpage: "./src/webviews/pages/gradle2020importpage.ts",
      projectcreatorpage: "./src/webviews/pages/projectcreatorpage.ts",
      riologpage: ["./src/riolog/sharedscript.ts", "./src/riolog/script/implscript.ts"],
      testSvelte: "./src/webviews/pages/test-svelte.ts",
      helpComponent: "./src/webviews/pages/help-svelte.ts"
    },
    devtool: isDevelopment ? 'inline-source-map' : 'source-map',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          include: [/node_modules/],
        },
        {
          test: /\.svelte$/,
          use: {
            loader: 'svelte-loader',
            options: {
              compilerOptions: {
                dev: isDevelopment
              },
              emitCss: false
            }
          }
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name][ext]'
          }
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        }
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".svelte"],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      conditionNames: ['svelte', 'browser', 'import', 'module', 'main'],
      fallback: {
        net: false,
        timers: require.resolve("timers-browserify"),
      },
    },
    output: {
      path: path.resolve(__dirname, "resources", "dist"),
      filename: "[name].js",
      hashFunction: "sha256",
    },
  },
  {
    target: "node",
    mode: isDevelopment ? 'development' : 'production',
    entry: "./src/extension.ts",
    output: {
      path: path.resolve(__dirname, "out"),
      filename: "extension.js",
      libraryTarget: "commonjs2",
      devtoolModuleFilenameTemplate: "../[resource-path]",
      hashFunction: "sha256",
    },
    devtool: isDevelopment ? 'inline-source-map' : 'source-map',
    externals: {
      vscode: "commonjs vscode",
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    node: false,
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
      ],
    },
  },
];