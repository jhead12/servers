module.exports = {
    presets: ['@babel/preset-env'],
    plugins: [
      {
        test: /\.py$/,
        use: 'python-loader'
      }
    ]
  };