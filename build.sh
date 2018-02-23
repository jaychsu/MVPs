ROOT_DIR=`pwd`

need_exit=false
build_polymer=true

if ! command -v npm &> /dev/null; then
  echo 'Please install `npm` first!'
  need_exit=true
fi

if ! command -v yarn &> /dev/null; then
  echo 'Please install `yarn` first!'
  need_exit=true
fi

if $need_exit = true; then
  exit 1
fi

if ! command -v bower &> /dev/null || ! command -v polymer &> /dev/null; then
  build_polymer=false
fi

cd $ROOT_DIR/react
rm -rf node_modules
yarn install
npm run build

cd $ROOT_DIR/vue
rm -rf node_modules
yarn install
npm run build

if $build_polymer = true; then
  cd $ROOT_DIR/polymer
  rm -rf bower_components
  bower install
  polymer build
fi
