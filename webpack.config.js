/* eslint-disable no-undef */
const resolve = require("path").resolve;
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const url = require("url");
const publicPath = "/assets/";
// const publicPath = '/'
const itemName = "dist";

module.exports = (options = {}) => {
	return {
		entry: {
			vendor: "./src/vendor",
			index: "./src/main.js",
			common: ["vue", "vue-router", "vue-resource"],
			elementui: ["element-ui"]
		},
		output: {
			path: resolve(__dirname, itemName),
			filename: "js/[name].js?[hash]",
			chunkFilename: "js/chunk[id].js?[hash]",
			publicPath: publicPath
		},
		module: {
			rules: [{
				test: /\.vue$/,
				use: ["vue-loader"]
			}, {
				test: /\.js$/,
				use: [{
					loader: "babel-loader",
					options: {
						presets: [
							["es2015", {
								modules: false
							}]
						],
						plugins: ["syntax-dynamic-import"]
					}
				}],
				exclude: /node_modules/
			}, {
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: ["style-loader", "postcss-loader"],
					use: "css-loader"
				})
			}, {
				test: /\.(scss|sass)$/,
				use: ExtractTextPlugin.extract("sass-loader"),
				exclude: /node_modules/
			}, {
				test: /\.(png|jpg|jpeg|gif|svg|svgz)$/,
				use: [{
					loader: "url-loader",
					options: {
						limit: 8129
					}
				}, {
					loader: "file-loader",
					options: {
						name: "[name]_[hash:6].[ext]",
						outputPath: "images/"
					}
				}],
				exclude: /node_modules/
			}, {
				test: /\.(eot|ttf|woff|woff2)$/,
				use: [{
					loader: "file-loader",
					options: {
						name: "[name]_[hash:8].[ext]",
						outputPath: "fonts/"
					}
				}]
			}]
		},
		plugins: [new webpack.optimize.CommonsChunkPlugin({
			names: ["vendor", "manifest", "common", "elementui"]
		}), new HtmlWebpackPlugin({
			template: "src/index.html"
		}), new ExtractTextPlugin({
			filename: "[name].[hash:5].css",
			allChunks: true
		}), new webpack.optimize.UglifyJsPlugin({
			mangle: {
				except: ["$super", "$", "exports", "require"]
			}
		}), new webpack.optimize.DedupePlugin()],
		resolve: {
			alias: {
				"~": resolve("src"),
				"~app": resolve("src/apps"),
				vue: "vue/dist/vue.js"
			}
		},
		devServer: {
			host: "127.0.0.1",
			port: 8010,
			proxy: {
				"/api/": {
					target: "http://127.0.0.1:8080",
					changeOrigin: true,
					pathRewrite: {
						"^/api": ""
					}
				},
				"/server/": {
					target: "http://tiramisu.localhost.com",
					changeOrigin: true,
					pathRewrite: {
						"^/server": ""
					}
				}
			},
			historyApiFallback: {
				index: url.parse(publicPath).pathname
			}
		},
		devtool: options.dev ? "#eval-source-map" : "#source-map"
	}; // 'vue': 'vue/dist/vue.min.js', //  别名vue,用作动态解释模板
};