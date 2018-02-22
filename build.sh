ROOT_DIR=`pwd`

if ! command -v npm &> /dev/null; then
  echo 'Please install `npm` first!'
  exit 1
fi

cd $ROOT_DIR/react
rm -rf node_modules
yarn install
npm run build

cd $ROOT_DIR/vue
rm -rf node_modules
yarn install
npm run build

cd $ROOT_DIR/polymer
rm -rf bower_components
bower install
polymer build
