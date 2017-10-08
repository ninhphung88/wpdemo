/* eslint-disable import/no-extraneous-dependencies */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        //contentBase: path.join(__dirname, "build"),
        //compress: true,
        //open: true,

        // Không refresh nếu hot loading thất bại. Tốt trong khi thực hiện giao diện client.
        // hotOnly: true,
        // Nếu bạn cũng muốn refresh trên các errors, thiết lập
        hot: true,
        // headers bit is to allow Cross-Origin Resource Sharing which is necessary for HMR.
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    
        // Cho phép history API fallback để được sử dụng HTML5 History API dựa trên routing các họat động.
        // Tốt cho các thiết lập phức tạp.
        historyApiFallback: true,
        stats: 'errors-only', // Chỉ hiển thị các lỗi để giảm lượng đầu ra.
        // Phân tích cú pháp host và port từ env để cho phép tùy biến.
        // Nếu bạn sử dụng Docker, Vagrant or Cloud9, set host: options.host || '0.0.0.0';
        // 0.0.0.0 is available to all network device không giống như default `localhost`.
        // Tùy chỉnh host/port ở đây nếu cần
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        // WDS cung cấp 1 overlay trên trình duyệt cho chụp lại các warnings và errors:
        // overlay: true captures only errors
        overlay: {
            errors: true,
            warnings: true,
        },
        /*watchOptions: {
            // Delay việc xây dựng lại sau lần thay đổi đầu tiên
            aggregateTimeout: 300,

            // Poll using interval (in ms, accepts boolean too)
            poll: 1000,
        },*/
    },
    /*
    plugins: [
        // Bỏ qua node_modules để sử dụng CPU với poll watching giảm đáng kể.
        new webpack.WatchIgnorePlugin([
            path.join(__dirname, 'node_modules')
        ]),
    ],*/
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),    
    ],
});

exports.lintJavaScript = ({ include, exclude, options }) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                enforce: 'pre',

                loader: 'eslint-loader',
                options,
            },
        ],
    },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,

                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            //root: '.',   // {String}    Default: /
                            //url: false, // {Boolean} Default: true
                            //alias: { '../fonts/bootstrap': 'bootstrap-sass/assets/fonts/bootstrap' }, // {Object} Default: {}
                            //import: false,   // {Boolean} Default: true 
                            //modules: true, // {Boolean} Default: false
                            //minimize: true || {/* CSSNano Options */}, // {Boolean|Object} Default: false
                            //sourceMap: true,   // {Boolean} Default: false
                            //camelCase: true,   // {Boolean|String} Default: false
                            //importLoaders: 1, // {Number} Default: 0
                        },
                    },
                ],
            },
        ],
    },
});

exports.loadSASS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                include,
                exclude,

                use: [
                    'style-loader', // creates style nodes from JS strings
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            //root: '.',   // {String}    Default: /
                            //url: false, // {Boolean} Default: true
                            //alias: { '../fonts/bootstrap': 'bootstrap-sass/assets/fonts/bootstrap' }, // {Object} Default: {}
                            //import: false,   // {Boolean} Default: true 
                            //modules: true, // {Boolean} Default: false
                            //minimize: true || {/* CSSNano Options */}, // {Boolean|Object} Default: false
                            //sourceMap: true,   // {Boolean} Default: false
                            //camelCase: true,   // {Boolean|String} Default: false
                            //importLoaders: 1, // {Number} Default: 0
                        },
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                        options: {
                            // Xem node-sass cho tất cả các tùy chọn Sass có sẵn.
                            // https://github.com/andrew/node-sass
                        },
                    },
                ],
            },
        ],
    },
});

exports.extractCSS = ({ include, exclude, use }) => {
    // Output CSS được trích xuất tới 1 file
    const plugin = new ExtractTextPlugin({
        filename: '[name].[contenthash:8].css', // {String|Function} 
        //id: ,                 // {String}
        //allChunks: ,     // {Boolean}
        //disable: ,         // {Boolean}
        //ignoreOrder: , // {Boolean}
    });
    
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,

                    use: plugin.extract({
                        use,
                        fallback: 'style-loader',
                    }),
                },
            ],
        },
        plugins: [plugin],
    };
};

exports.autoprefix = () => ({
    loader: 'postcss-loader',
    options: {
        plugins: [
            require('autoprefixer')({
                //browsers: ['last 2 versions', 'ie 10'], // (array) https://github.com/ai/browserslist#queries
                //env: , // (string): môi trường cho Browserslist
                //cascade: , // (boolean) Default: true
                //add: , // (boolean) Default: true
                //remove: , // (boolean) Default: true
                //supports: , // (boolean) Default: true
                //flexbox: 'no-2009', // (boolean|string) Default: true
                //grid: , // (boolean) Default: false
                //stats: , // (object) tùy chọn usage statistics cho > 10% in my stats truy vấn browsers. 
                            // https://github.com/ai/browserslist#custom-usage-data   
            }),
        ],
    },
});

exports.purifyCSS = ({ paths }) => ({
    plugins: [
        new PurifyCSSPlugin({ paths }),
    ],
});

exports.lintCSS = ({ include, exclude }) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                enforce: 'pre',

                loader: 'postcss-loader',
                options: {
                    plugins: [
                        require('stylelint')({
                            // Ignore node_modules CSS
                            ignoreFiles: 'node_modules/**/*.css',
                            //
                        }),
                    ],
                },
            },
        ],
    },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg)$/,
                include,
                exclude,

                use: {
                    loader: 'url-loader',
                    options,
                },
            },
        ],
    },
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                // Capture eot, ttf, woff, and woff2
                test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                include,
                exclude,

                use: {
                    loader: 'file-loader',
                    options,
                },
            },
        ],
    },
});

exports.loadJavaScript = ({ include, exclude }) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,

                loader: 'babel-loader',
                options: {
                    // Bật caching để cải thiện hiệu suất trong quá trình phát triển. Nó sử dụng thư mục OS default theo mặc định. 
                    // Nếu bạn cần 1 cái gì đó tùy chỉnh hơn, truyền 1 path tới nó. Ví dụ: { cacheDirectory: '<path>' }
                    cacheDirectory: true,
                },
            },
        ],
    },
});

exports.generateSourceMaps = ({ type }) => ({
    devtool: type,
});

exports.extractBundles = (bundles) => ({
    plugins: bundles.map((bundle) => (
        new webpack.optimize.CommonsChunkPlugin(bundle)
    )),
});

exports.clean = (path) => ({
    plugins: [
        new CleanWebpackPlugin([path]),
    ],
});

exports.attachRevision = () => ({
    plugins: [
        new webpack.BannerPlugin({
            banner: new GitRevisionPlugin().version(),
        }),
    ],
});

exports.minifyJavaScript = () => ({
    plugins: [
        new BabiliPlugin(),
    ],
});

exports.minifyCSS = ({ options }) => ({
    plugins: [
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: options,
            canPrint: false,
        }),
    ],
});

// Đang lỗi
exports.treeShaking = () => ({
    plugins: [
        new UglifyJSPlugin(),
    ],
});

exports.setFreeVariable = (key, value) => {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [
            new webpack.DefinePlugin(env),
        ],
    };
};

exports.page = ({
    inject,
    path = '',
    template,
    title,
    entry,
    chunks,
    appMountId,
    baseHref,
    devServer,
    googleAnalytics,
    meta,
    mobile,
    links,
    inlineManifestWebpackName,
    scripts,
    favicon,
    window,
} = {}) => ({
    entry,
    plugins: [
        new HtmlWebpackPlugin({
            inject,
            template,
            chunks,
            filename: `${path && path + '/'}index.html`,
            appMountId,
            baseHref,
            devServer,
            googleAnalytics,
            meta,
            title,
            mobile,
            links,
            inlineManifestWebpackName,
            scripts,
            favicon,
            window,
        }),
    ],
});