// @flow
/* eslint-disable import/first, no-unused-vars */
import path from 'path';
//import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import merge from 'webpack-merge';
import glob from 'glob';

const parts = require('./webpack.parts');
import { WDS_PORT } from './src/shared/config';
import { isProd } from './src/shared/util';

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
    {
        // Nơi ứng dụng bắt đầu thực thi và Webpack bắt đầu bundling
        //entry: "./app/entry", // string | array | object
        //entry: ["./app/entry1", "./app/entry2"],
        //entry: {
        //    //a: "./app/entry-a",
        //    //b: ["./app/entry-b1", "./app/entry-b2"],
        //    app: PATHS.app, 
        //    //another: path.join(PATHS.app, 'another.js'),
        //},
        // Ở đây ứng dụng bắt đầu thực thi và webpack bắt đầu bundling

        output: {
            // Các tùy chọn liên quan đến cách webpack phát ra các kết quả
            
            path: PATHS.build, // string, thư mục cho tất cả files đầu ra, phải là 1 đường dẫn tuyệt đối(use module path Node.js)

            //filename: "bundle.js", // string
            filename: '[name].js', // cho nhiều điểm entry
            //filename: "[chunkhash].js", // for long term caching the filename template for entry chunks
            
            publicPath: "/wpdemo/", // string
            //publicPath: "",
            //publicPath: "https://cdn.example.com/", // url tới thư mục đầu ra được giải quyết tương đối tới trang HTML
            
            //library: "MyLibrary", // string, tên của library được xuất khẩu
            
            // Định dạng trong đó để xuất khẩu thư viện
            //libraryTarget: "umd", // universal module definition
            //libraryTarget: "umd2", // universal module definition
            //libraryTarget: "commonjs2", // exported with module.exports
            //libraryTarget: "commonjs-module", // exports with module.exports
            //libraryTarget: "commonjs", // exported as properties to exports
            //libraryTarget: "amd", // defined with AMD defined method
            //libraryTarget: "this", // property set on this
            //libraryTarget: "var", // variable defined in root scope
            //libraryTarget: "assign", // blind assignment
            //libraryTarget: "window", // property set to window object
            //libraryTarget: "global", // property set to global object
            //libraryTarget: "jsonp", // jsonp wrapper the type of the exported library

            /* Cấu hình đầu ra nâng cao */
            //pathinfo: true, // boolean, bao gồm thông tin path hữu ích về modules, exports, requests, etc. vào code được tạo ra
            
            //chunkFilename: "[id].js",
            //chunkFilename: "[chunkhash].js", // cho long term caching the filename template cho các chunks bổ sung

            //jsonpFunction: "myWebpackJsonp", // string, Tên của chức năng JSONP được sử dụng để load các chunks

            //sourceMapFilename: "[file].map", // string
            //sourceMapFilename: "sourcemaps/[file].map", // string, filename template của source map location

            //devtoolModuleFilenameTemplate: "webpack:///[resource-path]", // string, Tên template cho modules trong 1 devtool

            // string, Tên template cho các modules trong 1 devtool (được sử dụng cho các xung đột)
            //devtoolFallbackModuleFilenameTemplate: "webpack:///[resource-path]?[hash]", 
            
            //umdNamedDefine: true, // boolean, sử dụng 1 module AMD được đặt tên trong UMD library

            // Các quy định cách cross origin request are issued by the runtime
            //crossOriginLoading: "use-credentials", // enum
            //crossOriginLoading: "anonymous",
            //crossOriginLoading: false,
            
            /* Cấu hình đầu ra Expert (về rủi ro riêng) */

            //devtoolLineToLine: { // Sử dụng 1 SourceMaps được mapped 1:1 đơn giản for these modules (faster)
            //    test: /\.jsx$/, 
            //},
            
            //hotUpdateMainFilename: "[hash].hot-update.json", // string, filename template cho HMR manifest

            //hotUpdateChunkFilename: "[id].[hash].hot-update.js", // string, filename template cho HMR chunks

            //sourcePrefix: "\t", // string, prefix module sources trong bundle để có khả năng đọc tốt hơn
        },
        module: {
            // Cấu hình liên quan đến các modules
            rules: [
                // Các quy tắc cho các modules(cấu hình các loaders, parser options, etc.)
                
            ],
        },
        resolve: {
            // Các tùy chọn để giải quyết các requests (không áp dụng để giải quyết cho các loaders)
            
        },
        performance: {

        },
        // Tăng cường gỡ lỗi bằng cách thêm thông tin meta cho browser devtools source-map chi tiết nhất tại chi phí của tốc độ xây dựng
        //devtool: "source-map", // enum
        //devtool: "inline-source-map", // inlines SourceMap into original file
        //devtool: "eval-source-map", // inlines SourceMap per module
        //devtool: "hidden-source-map", // SourceMap without reference in original file
        //devtool: "cheap-source-map", // cheap-variant of SourceMap without module mappings
        //devtool: "cheap-module-source-map", // cheap-variant of SourceMap with module mappings
        //devtool: "eval", // no SourceMap, but named modules. Fastest at the expense of detail.
        // Thư mục home cho entry webpack và tùy chọn module.rules.loader là được giải quyết tương đối so với thư mục này
        //context: __dirname, // string (absolute path!)
        // Môi trường trong đó bundle nên chạy thay đổi hành vi loading chunk và các modules có sẵn
        //target: "web", // enum
        //target: "webworker", // WebWorker
        //target: "node", // Node.js via require
        //target: "async-node", // Node.js via fs and vm
        //target: "node-webkit", // nw.js
        //target: "electron-main", // electron, main process
        //target: "electron-renderer", // electron, renderer process
        //target: (compiler) => { /* ... */ }, // custom
        // Không follow/bundle các modules này, nhưng yêu cầu tại thời gian chạy từ môi trường
        //externals: ["react", /^@angular\//],
        //externals: "react", // string (exact match)
        //externals: /^[a-z\-]+($|\/)/, // Regex
        //externals: { // object
        //  angular: "this angular", // this["angular"]
        //  react: { // UMD
        //    commonjs: "react",
        //    commonjs2: "react",
        //    amd: "react",
        //    root: "React"
        //  }
        //},
        //externals: (request) => { /* ... */ return "commonjs " + request }
        // Cho phép bạn kiểm soát chính xác thông tin bundle được hiển thị
        //stats: "errors-only",
        //stats: { //object
        //  assets: true,
        //  colors: true,
        //  errors: true,
        //  errorDetails: true,
        //  hash: true,
        //  // ...
        //},
        // Danh sách các plugins bổ sung
        /*plugins: [
            new HtmlWebpackPlugin({
                // Required
                inject: false,
                template: require('html-webpack-template'),
                // template: 'node_modules/html-webpack-template/index.ejs',

                // Optional
                appMountId: 'app',
                //baseHref: 'http://example.com/awesome',
                //devServer: 'http://localhost:3001',
                googleAnalytics: {
                    trackingId: 'UA-XXXX-XX',
                    pageViewOnLoad: true,
                },
                meta: [
                    {
                        name: 'description',
                        content: 'A better default template for html-webpack-plugin.',
                    },
                ],
                mobile: true,
                links: [
                    'https://fonts.googleapis.com/css?family=Roboto',
                    {
                        href: '/apple-touch-icon.png',
                        rel: 'apple-touch-icon',
                        sizes: '180x180',
                    },
                    {
                        href: '/favicon-32x32.png',
                        rel: 'icon',
                        sizes: '32x32',
                        type: 'image/png',
                    },
                ],
                // inlineManifestWebpackName: 'webpackManifest',
                //scripts: [
                //    'http://example.com/somescript.js',
                //    {
                //        src: '/myModule.js',
                //        type: 'module'
                //    }
                //],
                title: 'Webpack demo',
                favicon: `${PATHS.app}/favicon.ico`,
                //window: {
                //    env: {
                //        apiHost: 'http://myapi.com/api/v1'
                //    }
                //}
                // Và bất kỳ tùy chọn cấu hình khác từ html-webpack-plugin:
                // https://github.com/ampedandwired/html-webpack-plugin#configuration
            }),
        ],*/
        /* Advanced configuration (click to show) */
        // Các tùy chọn giải quyết riêng cho các loaders
        //resolveLoader: { /* same as resolve */ }
        // Nắm bắt thông tin về thời gian
        //profile: true, // boolean
        // Thất bại ra trên lỗi đầu tiên thay vì dung nạp nó
        //bail: true, //boolean
        // disable/enable caching
        //cache: false, // boolean
        // enables watching
        //watch: true, // boolean
        //watchOptions: {
            // Tổng hợp nhiều thay đổi tới 1 single rebuild 
            //aggregateTimeout: 1000, // in ms

            // Bật chế độ polling để watching phải được sử dụng trên filesystems mà không thông báo về thay đổi, ví dụ: nfs shares
            //poll: true,
            //poll: 500, // intervall in ms
        //},
        //node: {/* TODO */},
        // TODO
        //recordsPath: path.resolve(__dirname, "build/records.json"),
        //recordsInputPath: path.resolve(__dirname, "build/records.json"),
        //recordsOutputPath: path.resolve(__dirname, "build/records.json"),
    },
    parts.lintJavaScript({ include: PATHS.app }),
    parts.lintCSS({ include: PATHS.app }),
    parts.loadFonts({
        options: {
            name: '[name].[hash:8].[ext]',
        },
    }),
    parts.loadJavaScript({ include: PATHS.app }),
]);

const productionConfig = merge([
    {
        performance: {
            hints: 'warning', // 'error' or false cũng hợp lệ
            maxEntrypointSize: 100000, // in bytes
            maxAssetSize: 450000, // in bytes
        },
        output: {
            chunkFilename: '[name].[chunkhash:8].js',
            filename: '[name].[chunkhash:8].js',
        },
        plugins: [
            new webpack.HashedModuleIdsPlugin(), // hashes result(Number thành Hash) và ẩn thông tin path
        ],
        recordsPath: path.join(__dirname, 'records.json'), // Tạo file records.json để 1 số Plugin sử dụng để thực hiện bộ nhớ đệm
    },
    parts.clean(path.join(PATHS.build, '/*')),
    parts.minifyJavaScript(),
    parts.minifyCSS({
        options: {
            discardComments: {
                removeAll: true,
                // Chạy cssnano trong chế độ safe(an toàn) để tránh các biến đổi tiềm ẩn ko an toàn.
                safe: true,
            },
        },
    }),
    parts.extractBundles([
        {
            name: 'vendor',
            // Trích xuất những thằng được import && Trong  node_modules && phần mở rộng .js -> vào 1 bundle tên là 'vendor'
            minChunks: ({ resource }) => (
                resource &&
                resource.indexOf('node_modules') >= 0 &&
                resource.match(/\.js$/)
            ),
        },
        {
            name: 'manifest',
            minChunks: Infinity,  // Nói webpack không được di chuyển bất kỳ modules nào đến bundle kết quả.
        },
    ]),
    //parts.attachRevision(), // Đang lỗi
    parts.generateSourceMaps({ type: 'source-map' }),
    parts.extractCSS({
        use: ['css-loader', parts.autoprefix()],
    }),
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
        //styleExtensions: ,     // {Array} Defaults ['.css']
        //moduleExtensions: , // {Array} Defaults [] nhưng ['.html'] có thể hữu ích ở đây.
        //minimize: ,              // Bật minification CSS. Bí danh tới purifyOptions.minify. Được tắt bởi mặc định.
        //purifyOptions: ,        // Truyền các tùy chọn tùy chỉnh tới PurifyCSS.  
        //verbose: ,               // để có được đầu ra rườm rà từ plugin. ...
    }),
    parts.loadImages({
        options: {
            limit: 1000,
            name: '[name].[hash:8].[ext]',
        },
    }),
    parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
    ),
    // parts.treeShaking(), // Đang lỗi
]);

const developmentConfig = merge([
    {
        output: {
            devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
        },
    },
    parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
    parts.devServer({
        // Tùy chỉnh host/port ở đây nếu cần
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS(),
    parts.loadImages(),
]);

module.exports = (env) => {
    /*for (var row = 1; row <= 7; row++) {
        var str = '#';
        var space = '';
        for (var hash = 1; hash < 4 - Math.abs(4 - row); hash++) {
            str += '#';
        }
        if (row === 1 || row === 7) { str += '            #'; }
        if (row === 2 || row === 6) { str += '        ##'; }
        if (row === 3 || row === 5) { str += '    ###'; }
        if (row === 4) { str += '####'; }
        if (row === Math.ceil(7/2)) {
            console.log("   ########");
        }
        for (var i = 0; i < 3 - Math.abs(4 - row); i++) {
            space += ' ';
        }
        str = space + str;
        console.log(str);
    }*/

    // Xác minh rằng --env làm việc:
    // console.log('env', env);
    
    /*if (env === 'production') {
        return merge(commonConfig, productionConfig);
    }
    return merge(commonConfig, developmentConfig);*/
    const pages = [
        parts.page({
            entry: {
                app: PATHS.app,
            },
            title: 'Webpack demo',
            chunks: ['app', 'manifest', 'vendor'],
            // Required
            inject: false,
            template: require('html-webpack-template'),
            // template: 'node_modules/html-webpack-template/index.ejs',
            
            // Optional
            appMountId: 'app',
            //baseHref: 'http://example.com/awesome',
            //devServer: 'http://localhost:3001',
            googleAnalytics: {
                trackingId: 'UA-XXXX-XX',
                pageViewOnLoad: true,
            },
            meta: [
                {
                    name: 'description',
                    content: 'A better default template for html-webpack-plugin.',
                },
            ],
            mobile: true,
            links: [
                'https://fonts.googleapis.com/css?family=Roboto',
                {
                    href: '/apple-touch-icon.png',
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                },
                {
                    href: '/favicon-32x32.png',
                    rel: 'icon',
                    sizes: '32x32',
                    type: 'image/png',
                },
            ],
            // inlineManifestWebpackName: 'webpackManifest',
            //scripts: [
            //    'http://example.com/somescript.js',
            //    {
            //        src: '/myModule.js',
            //        type: 'module'
            //    }
            //],
            favicon: `${PATHS.app}/favicon.ico`,
            //window: {
            //    env: {
            //        apiHost: 'http://myapi.com/api/v1'
            //    }
            //}
            // Và bất kỳ tùy chọn cấu hình khác từ html-webpack-plugin:
            // https://github.com/ampedandwired/html-webpack-plugin#configuration
        }),
        parts.page({
            entry: {
                another: path.join(PATHS.app, 'another.js'),
            },
            chunks: ['another', 'manifest', 'vendor'],
            title: 'Another demo',
            path: 'another',
            
            inject: true,
            template: require.resolve(
                'html-webpack-plugin/default_index.ejs',
            ),

        }),
    ];

    const config = env === 'production' ? productionConfig : developmentConfig;

    return merge([commonConfig, config].concat(pages));
};

/*plugins: [
    new HtmlWebpackPlugin({
        // Required
        inject: false,
        template: require('html-webpack-template'),
        // template: 'node_modules/html-webpack-template/index.ejs',

        // Optional
        appMountId: 'app',
        //baseHref: 'http://example.com/awesome',
        //devServer: 'http://localhost:3001',
        googleAnalytics: {
            trackingId: 'UA-XXXX-XX',
            pageViewOnLoad: true,
        },
        meta: [
            {
                name: 'description',
                content: 'A better default template for html-webpack-plugin.',
            },
        ],
        mobile: true,
        links: [
            'https://fonts.googleapis.com/css?family=Roboto',
            {
                href: '/apple-touch-icon.png',
                rel: 'apple-touch-icon',
                sizes: '180x180',
            },
            {
                href: '/favicon-32x32.png',
                rel: 'icon',
                sizes: '32x32',
                type: 'image/png',
            },
        ],
        // inlineManifestWebpackName: 'webpackManifest',
        //scripts: [
        //    'http://example.com/somescript.js',
        //    {
        //        src: '/myModule.js',
        //        type: 'module'
        //    }
        //],
        title: 'Webpack demo',
        favicon: `${PATHS.app}/favicon.ico`,
        //window: {
        //    env: {
        //        apiHost: 'http://myapi.com/api/v1'
        //    }
        //}
        // Và bất kỳ tùy chọn cấu hình khác từ html-webpack-plugin:
        // https://github.com/ampedandwired/html-webpack-plugin#configuration
    }),
],*/



/*export default {
  entry: [
    './src/client',
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: WDS_PORT,
  },
};*/