(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/performance.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Extend Window interface for gtag
__turbopack_context__.s({
    "animationHelpers": (()=>animationHelpers),
    "bundleHelpers": (()=>bundleHelpers),
    "lazyLoadHelpers": (()=>lazyLoadHelpers),
    "memoryHelpers": (()=>memoryHelpers),
    "performanceMonitor": (()=>performanceMonitor)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const performanceMonitor = {
    // Log Core Web Vitals
    logCWV: (metric)=>{
        if ("object" !== 'undefined' && window.gtag) {
            window.gtag('event', metric.name, {
                value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                event_category: 'Web Vitals',
                event_label: metric.id,
                non_interaction: true
            });
        }
        // Also log to console in development
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('Web Vital:', metric);
        }
    },
    // Measure loading performance
    measureLoadTime: (name, startTime)=>{
        const endTime = performance.now();
        const duration = endTime - startTime;
        if ("TURBOPACK compile-time truthy", 1) {
            console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
        }
        return duration;
    },
    // Mark performance milestones
    mark: (name)=>{
        if ("object" !== 'undefined' && 'performance' in window) {
            performance.mark(name);
        }
    },
    // Measure between marks
    measure: (name, startMark, endMark)=>{
        if ("object" !== 'undefined' && 'performance' in window) {
            try {
                performance.measure(name, startMark, endMark);
                const measure = performance.getEntriesByName(name)[0];
                if ("TURBOPACK compile-time truthy", 1) {
                    console.log(`Performance: ${name} took ${measure.duration.toFixed(2)}ms`);
                }
                return measure.duration;
            } catch (error) {
                console.warn('Performance measurement failed:', error);
            }
        }
        return 0;
    }
};
const lazyLoadHelpers = {
    // Check if element is in viewport
    isInViewport: (element, rootMargin = '0px')=>{
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    },
    // Preload critical resources
    preloadResource: (href, as, type)=>{
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        if (type) link.type = type;
        document.head.appendChild(link);
    },
    // Prefetch next page resources
    prefetchPage: (href)=>{
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
    }
};
const animationHelpers = {
    // Check if user prefers reduced motion
    prefersReducedMotion: ()=>{
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
    // Get optimized animation duration based on user preference
    getAnimationDuration: (normalDuration)=>{
        return animationHelpers.prefersReducedMotion() ? 0 : normalDuration;
    },
    // Create performance-optimized animation config
    createAnimationConfig: (config)=>({
            duration: animationHelpers.getAnimationDuration(config.duration || 0.3),
            ease: config.ease || 'easeOut',
            delay: animationHelpers.getAnimationDuration(config.delay || 0)
        })
};
const bundleHelpers = {
    // Dynamic import with error handling
    dynamicImport: async (importFn)=>{
        try {
            return await importFn();
        } catch (error) {
            console.error('Dynamic import failed:', error);
            return null;
        }
    },
    // Preload module for faster subsequent imports
    preloadModule: async (importFn)=>{
        try {
            await importFn();
        } catch (error) {
            console.warn('Module preload failed:', error);
        }
    }
};
const memoryHelpers = {
    // Cleanup function for removing event listeners
    cleanup: (cleanupFns)=>{
        return ()=>{
            cleanupFns.forEach((fn)=>{
                try {
                    fn();
                } catch (error) {
                    console.warn('Cleanup function failed:', error);
                }
            });
        };
    },
    // Debounce function calls
    debounce: (func, wait)=>{
        let timeout;
        return (...args)=>{
            clearTimeout(timeout);
            timeout = setTimeout(()=>func.apply(this, args), wait);
        };
    },
    // Throttle function calls
    throttle: (func, limit)=>{
        let inThrottle;
        return (...args)=>{
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(()=>inThrottle = false, limit);
            }
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/PerformanceMonitor.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "PerformanceMonitor": (()=>PerformanceMonitor)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/performance.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function PerformanceMonitor({ enableCWV = true, enableResourceTiming = false, enableNavigationTiming = false }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PerformanceMonitor.useEffect": ()=>{
            if (!enableCWV) return;
            // Dynamic import of web-vitals to avoid blocking
            const loadWebVitals = {
                "PerformanceMonitor.useEffect.loadWebVitals": async ()=>{
                    try {
                        const webVitals = await __turbopack_context__.r("[project]/node_modules/web-vitals/dist/web-vitals.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i);
                        // Track Core Web Vitals
                        if (webVitals.onCLS) webVitals.onCLS(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performanceMonitor"].logCWV);
                        if (webVitals.onFID) webVitals.onFID(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performanceMonitor"].logCWV);
                        if (webVitals.onFCP) webVitals.onFCP(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performanceMonitor"].logCWV);
                        if (webVitals.onLCP) webVitals.onLCP(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performanceMonitor"].logCWV);
                        if (webVitals.onTTFB) webVitals.onTTFB(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$performance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["performanceMonitor"].logCWV);
                    } catch (error) {
                        console.warn('Failed to load web-vitals:', error);
                    }
                }
            }["PerformanceMonitor.useEffect.loadWebVitals"];
            loadWebVitals();
        }
    }["PerformanceMonitor.useEffect"], [
        enableCWV
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PerformanceMonitor.useEffect": ()=>{
            if (!enableResourceTiming) return;
            const logResourceTiming = {
                "PerformanceMonitor.useEffect.logResourceTiming": ()=>{
                    if ("object" === 'undefined' || !('performance' in window)) return;
                    const resources = performance.getEntriesByType('resource');
                    const slowResources = resources.filter({
                        "PerformanceMonitor.useEffect.logResourceTiming.slowResources": (resource)=>resource.duration > 1000
                    }["PerformanceMonitor.useEffect.logResourceTiming.slowResources"]);
                    if (slowResources.length > 0 && ("TURBOPACK compile-time value", "development") === 'development') {
                        console.warn('Slow resources detected:', slowResources);
                    }
                }
            }["PerformanceMonitor.useEffect.logResourceTiming"];
            // Log resource timing after page load
            if (document.readyState === 'complete') {
                logResourceTiming();
            } else {
                window.addEventListener('load', logResourceTiming);
                return ({
                    "PerformanceMonitor.useEffect": ()=>window.removeEventListener('load', logResourceTiming)
                })["PerformanceMonitor.useEffect"];
            }
        }
    }["PerformanceMonitor.useEffect"], [
        enableResourceTiming
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PerformanceMonitor.useEffect": ()=>{
            if (!enableNavigationTiming) return;
            const logNavigationTiming = {
                "PerformanceMonitor.useEffect.logNavigationTiming": ()=>{
                    if ("object" === 'undefined' || !('performance' in window)) return;
                    const navigation = performance.getEntriesByType('navigation')[0];
                    if (!navigation) return;
                    const metrics = {
                        'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
                        'TCP Connection': navigation.connectEnd - navigation.connectStart,
                        'Request': navigation.responseStart - navigation.requestStart,
                        'Response': navigation.responseEnd - navigation.responseStart,
                        'DOM Processing': navigation.domComplete - navigation.domInteractive,
                        'Load Event': navigation.loadEventEnd - navigation.loadEventStart
                    };
                    if ("TURBOPACK compile-time truthy", 1) {
                        console.table(metrics);
                    }
                }
            }["PerformanceMonitor.useEffect.logNavigationTiming"];
            if (document.readyState === 'complete') {
                logNavigationTiming();
            } else {
                window.addEventListener('load', logNavigationTiming);
                return ({
                    "PerformanceMonitor.useEffect": ()=>window.removeEventListener('load', logNavigationTiming)
                })["PerformanceMonitor.useEffect"];
            }
        }
    }["PerformanceMonitor.useEffect"], [
        enableNavigationTiming
    ]);
    // This component doesn't render anything
    return null;
}
_s(PerformanceMonitor, "ewq31d5h+FnD/qJW52w5UqeNMN4=");
_c = PerformanceMonitor;
var _c;
__turbopack_context__.k.register(_c, "PerformanceMonitor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_b7e100c9._.js.map