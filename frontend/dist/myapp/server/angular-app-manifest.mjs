
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 1,
    "route": "/game/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 432, hash: '57574e47eee97576358a5cc9b47cf7b08c0c830183f1ac9a559b49eaeaa9ee2b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 945, hash: '09b6d83c3eff1fb2a2f52ec9d2656bb36787b31aceb0cda92a69dd7194c7c664', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 2070, hash: 'f7b7ab501adc30f629fa4c5a39b456a309fbaf0da4cf76732a4a978699c7b9dc', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
