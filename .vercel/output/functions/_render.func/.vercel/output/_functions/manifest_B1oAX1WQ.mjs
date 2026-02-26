import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_D0_-X4ng.mjs';
import 'es-module-lexer';
import { h as decodeKey } from './chunks/astro/server_vweHXCA9.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/portfolio/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"posts/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/posts","isIndex":false,"type":"page","pattern":"^\\/posts\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts.astro","pathname":"/posts","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"projects/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/projects","isIndex":false,"type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects.astro","pathname":"/projects","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["D:/portfolio/src/components/posts-loop.astro",{"propagation":"in-tree","containsHead":false}],["D:/portfolio/src/pages/posts.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/posts@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["D:/portfolio/src/pages/post/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/post/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/portfolio/src/pages/about.astro",{"propagation":"none","containsHead":true}],["D:/portfolio/src/pages/index.astro",{"propagation":"none","containsHead":true}],["D:/portfolio/src/pages/projects.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/post/[slug]@_@astro":"pages/post/_slug_.astro.mjs","\u0000@astro-page:src/pages/projects@_@astro":"pages/projects.astro.mjs","\u0000@astro-page:src/pages/posts@_@astro":"pages/posts.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","D:/portfolio/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","D:/portfolio/src/content/post/ai-remove-image-background.md?astroContentCollectionEntry=true":"chunks/ai-remove-image-background_t9z9smaT.mjs","D:/portfolio/src/content/post/astro-aria.md?astroContentCollectionEntry=true":"chunks/astro-aria_CmTTNTQw.mjs","D:/portfolio/src/content/post/broadcast-channel.md?astroContentCollectionEntry=true":"chunks/broadcast-channel_DXRlbjlL.mjs","D:/portfolio/src/content/post/cloudflare-audio-concat.md?astroContentCollectionEntry=true":"chunks/cloudflare-audio-concat_B8LpdCxp.mjs","D:/portfolio/src/content/post/cloudflare-pypi-mirror.md?astroContentCollectionEntry=true":"chunks/cloudflare-pypi-mirror_BYFSNo62.mjs","D:/portfolio/src/content/post/cloudflare-web-analytics-kill-adblock.md?astroContentCollectionEntry=true":"chunks/cloudflare-web-analytics-kill-adblock_C_8qsR30.mjs","D:/portfolio/src/content/post/cloudflare-worker-image.md?astroContentCollectionEntry=true":"chunks/cloudflare-worker-image_DBGfFi1u.mjs","D:/portfolio/src/content/post/deploy-fediverse-instance.md?astroContentCollectionEntry=true":"chunks/deploy-fediverse-instance_Dfbcgd5_.mjs","D:/portfolio/src/content/post/dns-surf.md?astroContentCollectionEntry=true":"chunks/dns-surf_DUfuVgFx.mjs","D:/portfolio/src/content/post/email-ml.md?astroContentCollectionEntry=true":"chunks/email-ml_Bu8E9Cav.mjs","D:/portfolio/src/content/post/github-og-image.md?astroContentCollectionEntry=true":"chunks/github-og-image_DROQVhnn.mjs","D:/portfolio/src/content/post/google-safe-browsing-alternative.md?astroContentCollectionEntry=true":"chunks/google-safe-browsing-alternative_CvJfpNnT.mjs","D:/portfolio/src/content/post/guide-to-running-mcp-server-in-a-sandbox.md?astroContentCollectionEntry=true":"chunks/guide-to-running-mcp-server-in-a-sandbox_BEsnbmBJ.mjs","D:/portfolio/src/content/post/looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong.md?astroContentCollectionEntry=true":"chunks/looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong_BlVOhDnm.mjs","D:/portfolio/src/content/post/minimal-docker-image-for-vite.md?astroContentCollectionEntry=true":"chunks/minimal-docker-image-for-vite_C9uOS1L-.mjs","D:/portfolio/src/content/post/rss-beauty.md?astroContentCollectionEntry=true":"chunks/rss-beauty_D2UhAwB7.mjs","D:/portfolio/src/content/post/run-python-programs-easily-in-the-browser.md?astroContentCollectionEntry=true":"chunks/run-python-programs-easily-in-the-browser__0UZm5U1.mjs","D:/portfolio/src/content/post/sink.md?astroContentCollectionEntry=true":"chunks/sink_9M8oScpy.mjs","D:/portfolio/src/content/post/umami-kill-adblock.md?astroContentCollectionEntry=true":"chunks/umami-kill-adblock_CeYaYqgD.mjs","D:/portfolio/src/content/post/use-cloudflare-snippets-to-set-up-a-docker-registry-mirror.md?astroContentCollectionEntry=true":"chunks/use-cloudflare-snippets-to-set-up-a-docker-registry-mirror_Cpi9OQi6.mjs","D:/portfolio/src/content/post/vercel-edge-image.md?astroContentCollectionEntry=true":"chunks/vercel-edge-image_BdfoVPKU.mjs","D:/portfolio/src/content/post/vercel-kill-adblock.md?astroContentCollectionEntry=true":"chunks/vercel-kill-adblock_dVmFQjnQ.mjs","D:/portfolio/src/content/post/ai-remove-image-background.md?astroPropagatedAssets":"chunks/ai-remove-image-background_Bb9cJv61.mjs","D:/portfolio/src/content/post/astro-aria.md?astroPropagatedAssets":"chunks/astro-aria_CmBWsEYk.mjs","D:/portfolio/src/content/post/broadcast-channel.md?astroPropagatedAssets":"chunks/broadcast-channel_Dg00nQK4.mjs","D:/portfolio/src/content/post/cloudflare-audio-concat.md?astroPropagatedAssets":"chunks/cloudflare-audio-concat_NIcv9-f3.mjs","D:/portfolio/src/content/post/cloudflare-pypi-mirror.md?astroPropagatedAssets":"chunks/cloudflare-pypi-mirror_DLXFnCZR.mjs","D:/portfolio/src/content/post/cloudflare-web-analytics-kill-adblock.md?astroPropagatedAssets":"chunks/cloudflare-web-analytics-kill-adblock_BYw4druI.mjs","D:/portfolio/src/content/post/cloudflare-worker-image.md?astroPropagatedAssets":"chunks/cloudflare-worker-image_C5HB2wwq.mjs","D:/portfolio/src/content/post/deploy-fediverse-instance.md?astroPropagatedAssets":"chunks/deploy-fediverse-instance_CkjKFjge.mjs","D:/portfolio/src/content/post/dns-surf.md?astroPropagatedAssets":"chunks/dns-surf_e2tn0lWO.mjs","D:/portfolio/src/content/post/email-ml.md?astroPropagatedAssets":"chunks/email-ml_CKYNUal4.mjs","D:/portfolio/src/content/post/github-og-image.md?astroPropagatedAssets":"chunks/github-og-image_Ce9yCDE9.mjs","D:/portfolio/src/content/post/google-safe-browsing-alternative.md?astroPropagatedAssets":"chunks/google-safe-browsing-alternative_Dl23Ew68.mjs","D:/portfolio/src/content/post/guide-to-running-mcp-server-in-a-sandbox.md?astroPropagatedAssets":"chunks/guide-to-running-mcp-server-in-a-sandbox_D0T7JDxr.mjs","D:/portfolio/src/content/post/looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong.md?astroPropagatedAssets":"chunks/looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong_CJ-Upxts.mjs","D:/portfolio/src/content/post/minimal-docker-image-for-vite.md?astroPropagatedAssets":"chunks/minimal-docker-image-for-vite_B89qCB8u.mjs","D:/portfolio/src/content/post/rss-beauty.md?astroPropagatedAssets":"chunks/rss-beauty_ulGwaOja.mjs","D:/portfolio/src/content/post/run-python-programs-easily-in-the-browser.md?astroPropagatedAssets":"chunks/run-python-programs-easily-in-the-browser_BzH_KFOS.mjs","D:/portfolio/src/content/post/sink.md?astroPropagatedAssets":"chunks/sink_BL0eVQsw.mjs","D:/portfolio/src/content/post/umami-kill-adblock.md?astroPropagatedAssets":"chunks/umami-kill-adblock_DHocFo4V.mjs","D:/portfolio/src/content/post/use-cloudflare-snippets-to-set-up-a-docker-registry-mirror.md?astroPropagatedAssets":"chunks/use-cloudflare-snippets-to-set-up-a-docker-registry-mirror_DaEZjh6V.mjs","D:/portfolio/src/content/post/vercel-edge-image.md?astroPropagatedAssets":"chunks/vercel-edge-image_DsaubCQR.mjs","D:/portfolio/src/content/post/vercel-kill-adblock.md?astroPropagatedAssets":"chunks/vercel-kill-adblock_BeC5aVr3.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_D9aVaOQr.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcEe_9wP.mjs","D:/portfolio/src/content/post/ai-remove-image-background.md":"chunks/ai-remove-image-background_CZAm5Jbs.mjs","D:/portfolio/src/content/post/astro-aria.md":"chunks/astro-aria_ClzqpAqg.mjs","D:/portfolio/src/content/post/broadcast-channel.md":"chunks/broadcast-channel_B8x9pwIC.mjs","D:/portfolio/src/content/post/cloudflare-audio-concat.md":"chunks/cloudflare-audio-concat_CdPVq9Pw.mjs","D:/portfolio/src/content/post/cloudflare-pypi-mirror.md":"chunks/cloudflare-pypi-mirror_Chfp0N92.mjs","D:/portfolio/src/content/post/cloudflare-web-analytics-kill-adblock.md":"chunks/cloudflare-web-analytics-kill-adblock_NMBbPs1d.mjs","D:/portfolio/src/content/post/cloudflare-worker-image.md":"chunks/cloudflare-worker-image_DthM7KAL.mjs","D:/portfolio/src/content/post/deploy-fediverse-instance.md":"chunks/deploy-fediverse-instance_7LDRgFeR.mjs","D:/portfolio/src/content/post/dns-surf.md":"chunks/dns-surf_CM3DBOK6.mjs","D:/portfolio/src/content/post/email-ml.md":"chunks/email-ml_BocyorEo.mjs","D:/portfolio/src/content/post/github-og-image.md":"chunks/github-og-image_DG2gxegv.mjs","D:/portfolio/src/content/post/google-safe-browsing-alternative.md":"chunks/google-safe-browsing-alternative_DnoIdvXN.mjs","D:/portfolio/src/content/post/guide-to-running-mcp-server-in-a-sandbox.md":"chunks/guide-to-running-mcp-server-in-a-sandbox_CbHi1z87.mjs","D:/portfolio/src/content/post/looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong.md":"chunks/looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong_BNujfXrE.mjs","D:/portfolio/src/content/post/minimal-docker-image-for-vite.md":"chunks/minimal-docker-image-for-vite_Bmw0H9mM.mjs","D:/portfolio/src/content/post/rss-beauty.md":"chunks/rss-beauty_DSfYv6Iz.mjs","D:/portfolio/src/content/post/run-python-programs-easily-in-the-browser.md":"chunks/run-python-programs-easily-in-the-browser_BvEGIHOL.mjs","D:/portfolio/src/content/post/sink.md":"chunks/sink_CGfHYBdG.mjs","D:/portfolio/src/content/post/umami-kill-adblock.md":"chunks/umami-kill-adblock_CTfhC0LV.mjs","D:/portfolio/src/content/post/use-cloudflare-snippets-to-set-up-a-docker-registry-mirror.md":"chunks/use-cloudflare-snippets-to-set-up-a-docker-registry-mirror_qKAIpsYq.mjs","D:/portfolio/src/content/post/vercel-edge-image.md":"chunks/vercel-edge-image_C2Pmtxxl.mjs","D:/portfolio/src/content/post/vercel-kill-adblock.md":"chunks/vercel-kill-adblock_DFEosG63.mjs","\u0000@astrojs-manifest":"manifest_B1oAX1WQ.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.BGWVWotS.js","/astro/hoisted.js?q=1":"_astro/hoisted.BCwZQlnr.js","D:/portfolio/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.C06vs49o.js","D:/portfolio/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.n4tcr7eN.js","D:/portfolio/src/layouts/main.astro?astro&type=script&index=0&lang.ts":"_astro/main.astro_astro_type_script_index_0_lang.DF2keTmI.js","D:/portfolio/src/layouts/main.astro?astro&type=script&index=1&lang.ts":"_astro/main.astro_astro_type_script_index_1_lang.CbgSXvim.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/about.DBp2iNa4.css","/favicon.ico","/icon.png","/robots.txt","/Rohail_Zuberi_Resume.pdf","/_astro/hoisted.BCwZQlnr.js","/_astro/hoisted.BGWVWotS.js","/_astro/index.astro_astro_type_script_index_0_lang.C06vs49o.js","/_astro/index.astro_astro_type_script_index_0_lang.n4tcr7eN.js","/_astro/main.astro_astro_type_script_index_0_lang.DF2keTmI.js","/_astro/main.astro_astro_type_script_index_1_lang.CbgSXvim.js","/_astro/main.DOO1HVwp.css","/assets/images/about.jpg","/assets/images/cover.png","/assets/images/favicon.png","/assets/images/logo-dark.png","/assets/images/logo.png","/assets/images/photo.png","/assets/images/experiences/aerodyne.jpg","/assets/images/experiences/autopilots.png","/assets/images/experiences/lums.svg","/assets/images/posts/code-canvas.jpg","/assets/images/posts/coffee.jpg","/assets/images/posts/flowchart.jpg","/assets/images/posts/perfect-coffee.jpg","/assets/images/posts/pour-over.jpg","/assets/images/posts/vintage-tech-01.jpg","/assets/images/posts/vintage-tech-02.jpg","/assets/images/posts/workspace.jpg","/assets/images/projects/broadcast-channel.png","/assets/images/projects/dns.surf.png","/assets/images/projects/html.zone.png","/assets/images/projects/long.png","/assets/images/projects/sink.cool.png","/assets/images/projects/tempmail.best.png","/about/index.html","/posts/index.html","/projects/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"yZhuxvtNKp0P6VbfWQUYKdeIVoSQUzs+Ywa9bxeaIEw=","experimentalEnvGetSecretEnabled":false});

export { manifest };
