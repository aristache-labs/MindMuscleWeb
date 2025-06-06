module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/lib/performance.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Extend Window interface for gtag
__turbopack_context__.s({
    "animationHelpers": (()=>animationHelpers),
    "bundleHelpers": (()=>bundleHelpers),
    "lazyLoadHelpers": (()=>lazyLoadHelpers),
    "memoryHelpers": (()=>memoryHelpers),
    "performanceMonitor": (()=>performanceMonitor)
});
const performanceMonitor = {
    // Log Core Web Vitals
    logCWV: (metric)=>{
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
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
        if ("undefined" !== 'undefined' && 'performance' in window) {
            "TURBOPACK unreachable";
        }
    },
    // Measure between marks
    measure: (name, startMark, endMark)=>{
        if ("undefined" !== 'undefined' && 'performance' in window) {
            "TURBOPACK unreachable";
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
        if ("TURBOPACK compile-time truthy", 1) return;
        "TURBOPACK unreachable";
        const link = undefined;
    },
    // Prefetch next page resources
    prefetchPage: (href)=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        "TURBOPACK unreachable";
        const link = undefined;
    }
};
const animationHelpers = {
    // Check if user prefers reduced motion
    prefersReducedMotion: ()=>{
        if ("TURBOPACK compile-time truthy", 1) return false;
        "TURBOPACK unreachable";
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
}}),
"[project]/src/components/ui/PerformanceMonitor.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "PerformanceMonitor": (()=>PerformanceMonitor)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$performance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/performance.ts [app-ssr] (ecmascript)");
'use client';
;
;
function PerformanceMonitor({ enableCWV = true, enableResourceTiming = false, enableNavigationTiming = false }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!enableCWV) return;
        // Dynamic import of web-vitals to avoid blocking
        const loadWebVitals = async ()=>{
            try {
                const webVitals = await __turbopack_context__.r("[project]/node_modules/web-vitals/dist/web-vitals.js [app-ssr] (ecmascript, async loader)")(__turbopack_context__.i);
                // Track Core Web Vitals
                if (webVitals.onCLS) webVitals.onCLS(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$performance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["performanceMonitor"].logCWV);
                if (webVitals.onFID) webVitals.onFID(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$performance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["performanceMonitor"].logCWV);
                if (webVitals.onFCP) webVitals.onFCP(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$performance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["performanceMonitor"].logCWV);
                if (webVitals.onLCP) webVitals.onLCP(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$performance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["performanceMonitor"].logCWV);
                if (webVitals.onTTFB) webVitals.onTTFB(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$performance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["performanceMonitor"].logCWV);
            } catch (error) {
                console.warn('Failed to load web-vitals:', error);
            }
        };
        loadWebVitals();
    }, [
        enableCWV
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!enableResourceTiming) return;
        const logResourceTiming = ()=>{
            if ("undefined" === 'undefined' || !('performance' in window)) return;
            "TURBOPACK unreachable";
            const resources = undefined;
            const slowResources = undefined;
        };
        // Log resource timing after page load
        if (document.readyState === 'complete') {
            logResourceTiming();
        } else {
            window.addEventListener('load', logResourceTiming);
            return ()=>window.removeEventListener('load', logResourceTiming);
        }
    }, [
        enableResourceTiming
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!enableNavigationTiming) return;
        const logNavigationTiming = ()=>{
            if ("undefined" === 'undefined' || !('performance' in window)) return;
            "TURBOPACK unreachable";
            const navigation = undefined;
            const metrics = undefined;
        };
        if (document.readyState === 'complete') {
            logNavigationTiming();
        } else {
            window.addEventListener('load', logNavigationTiming);
            return ()=>window.removeEventListener('load', logNavigationTiming);
        }
    }, [
        enableNavigationTiming
    ]);
    // This component doesn't render anything
    return null;
}
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__c6702e56._.js.map