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
"[project]/src/lib/utils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": (()=>cn),
    "debounce": (()=>debounce),
    "formatDate": (()=>formatDate),
    "formatNumber": (()=>formatNumber),
    "generateId": (()=>generateId),
    "getDeviceInfo": (()=>getDeviceInfo),
    "isInViewport": (()=>isInViewport),
    "isValidEmail": (()=>isValidEmail),
    "preloadImage": (()=>preloadImage),
    "scrollToElement": (()=>scrollToElement),
    "storage": (()=>storage),
    "throttle": (()=>throttle),
    "trackEvent": (()=>trackEvent),
    "triggerHapticFeedback": (()=>triggerHapticFeedback),
    "wait": (()=>wait)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function debounce(func, wait) {
    let timeout;
    return (...args)=>{
        clearTimeout(timeout);
        timeout = setTimeout(()=>func(...args), wait);
    };
}
function throttle(func, limit) {
    let inThrottle;
    return (...args)=>{
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(()=>inThrottle = false, limit);
        }
    };
}
function formatNumber(num) {
    return num.toLocaleString();
}
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}
function scrollToElement(elementId, offset = 0) {
    console.log(`Attempting to scroll to: ${elementId}`);
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
        console.log(`Successfully scrolled to element: ${elementId}`);
    } else {
        console.warn(`Element with id "${elementId}" not found`);
        // Fallback: try with querySelector and scrollIntoView
        setTimeout(()=>{
            const fallbackElement = document.querySelector(`#${elementId}`);
            if (fallbackElement) {
                fallbackElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
                console.log(`Fallback scroll successful for: ${elementId}`);
            } else {
                console.error(`Element "${elementId}" not found with any method`);
                const allIds = Array.from(document.querySelectorAll('[id]')).map((el)=>el.id);
                console.log('Available element IDs:', allIds);
            }
        }, 100);
    }
}
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
}
function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android(?=.*\bMobile\b)/.test(userAgent);
    const isDesktop = !isMobile && !isTablet;
    const hasTouch = 'ontouchstart' in window;
    return {
        isMobile,
        isTablet,
        isDesktop,
        hasTouch,
        userAgent
    };
}
const storage = {
    get: (key)=>{
        if ("TURBOPACK compile-time truthy", 1) return null;
        "TURBOPACK unreachable";
    },
    set: (key, value)=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        "TURBOPACK unreachable";
    },
    remove: (key)=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        "TURBOPACK unreachable";
    }
};
function trackEvent(eventName, properties) {
    if ("TURBOPACK compile-time truthy", 1) return;
    "TURBOPACK unreachable";
}
function triggerHapticFeedback(intensity = 'light') {
    if ('vibrate' in navigator) {
        const patterns = {
            light: 10,
            medium: 20,
            heavy: 50
        };
        navigator.vibrate(patterns[intensity]);
    }
}
function wait(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
function preloadImage(src) {
    return new Promise((resolve, reject)=>{
        const img = new Image();
        img.onload = ()=>resolve();
        img.onerror = reject;
        img.src = src;
    });
}
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
}}),
"[project]/src/components/ui/MagneticCursor.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "MagneticCursor": (()=>MagneticCursor)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function MagneticCursor({ children, className, disabled = false }) {
    const cursorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [cursorState, setCursorState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isHidden: false,
        isPointer: false,
        isText: false,
        isMagnetic: false,
        size: 'medium'
    });
    const mouseX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const mouseY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const springConfig = {
        damping: 25,
        stiffness: 700,
        mass: 0.5
    };
    const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(mouseX, springConfig);
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSpring"])(mouseY, springConfig);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (disabled) return;
        const handleMouseMove = (e)=>{
            const target = e.target;
            // Check for magnetic elements
            const magneticElement = target.closest('[data-magnetic]');
            const magneticButton = target.closest('button[data-magnetic]');
            const magneticLink = target.closest('a[data-magnetic]');
            if (magneticElement || magneticButton || magneticLink) {
                const element = magneticElement || magneticButton || magneticLink;
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                // Apply magnetic attraction
                const strength = parseFloat(element.dataset.magneticStrength || '0.3');
                const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
                const maxDistance = Math.max(rect.width, rect.height) * 1.5;
                if (distance < maxDistance) {
                    const force = 1 - distance / maxDistance;
                    const pullX = (centerX - e.clientX) * force * strength;
                    const pullY = (centerY - e.clientY) * force * strength;
                    mouseX.set(e.clientX + pullX);
                    mouseY.set(e.clientY + pullY);
                    setCursorState((prev)=>({
                            ...prev,
                            isMagnetic: true,
                            size: 'large',
                            label: element.dataset.magneticLabel,
                            color: element.dataset.magneticColor
                        }));
                } else {
                    mouseX.set(e.clientX);
                    mouseY.set(e.clientY);
                    setCursorState((prev)=>({
                            ...prev,
                            isMagnetic: false,
                            size: 'medium',
                            label: undefined
                        }));
                }
            } else {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
                setCursorState((prev)=>({
                        ...prev,
                        isMagnetic: false,
                        size: 'medium',
                        label: undefined
                    }));
            }
            // Check cursor type based on element
            const isClickable = target.closest('button, a, input, textarea, select, [role="button"], [tabindex]');
            const isText = target.closest('p, span, h1, h2, h3, h4, h5, h6, input, textarea');
            setCursorState((prev)=>({
                    ...prev,
                    isPointer: !!isClickable,
                    isText: !!isText && !isClickable
                }));
        };
        const handleMouseEnter = ()=>{
            setCursorState((prev)=>({
                    ...prev,
                    isHidden: false
                }));
        };
        const handleMouseLeave = ()=>{
            setCursorState((prev)=>({
                    ...prev,
                    isHidden: true
                }));
        };
        const handleMouseDown = ()=>{
            setCursorState((prev)=>({
                    ...prev,
                    size: 'small'
                }));
        };
        const handleMouseUp = ()=>{
            setCursorState((prev)=>({
                    ...prev,
                    size: cursorState.isMagnetic ? 'large' : 'medium'
                }));
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        return ()=>{
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [
        disabled,
        mouseX,
        mouseY,
        cursorState.isMagnetic
    ]);
    const getCursorSize = ()=>{
        switch(cursorState.size){
            case 'small':
                return 8;
            case 'medium':
                return 12;
            case 'large':
                return 20;
            default:
                return 12;
        }
    };
    const getCursorColor = ()=>{
        if (cursorState.color) return cursorState.color;
        if (cursorState.isMagnetic) return '#3b82f6'; // primary-500
        if (cursorState.isPointer) return '#06b6d4'; // cyan-500
        if (cursorState.isText) return '#8b5cf6'; // violet-500
        return '#ffffff';
    };
    if (disabled) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: className,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/ui/MagneticCursor.tsx",
            lineNumber: 150,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('cursor-none', className),
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/MagneticCursor.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                ref: cursorRef,
                className: "fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference",
                style: {
                    x,
                    y
                },
                animate: {
                    opacity: cursorState.isHidden ? 0 : 1,
                    scale: cursorState.isPointer ? 1.5 : 1
                },
                transition: {
                    type: 'spring',
                    stiffness: 500,
                    damping: 28
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute rounded-full",
                        style: {
                            width: getCursorSize(),
                            height: getCursorSize(),
                            backgroundColor: getCursorColor(),
                            x: -getCursorSize() / 2,
                            y: -getCursorSize() / 2
                        },
                        animate: {
                            scale: cursorState.size === 'small' ? 0.5 : 1
                        },
                        transition: {
                            type: 'spring',
                            stiffness: 400,
                            damping: 25
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/MagneticCursor.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: cursorState.isMagnetic && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute border-2 rounded-full",
                            style: {
                                width: 40,
                                height: 40,
                                borderColor: getCursorColor(),
                                x: -20,
                                y: -20
                            },
                            initial: {
                                scale: 0,
                                opacity: 0
                            },
                            animate: {
                                scale: 1,
                                opacity: 0.6
                            },
                            exit: {
                                scale: 0,
                                opacity: 0
                            },
                            transition: {
                                type: 'spring',
                                stiffness: 300,
                                damping: 25
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/MagneticCursor.tsx",
                            lineNumber: 189,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/MagneticCursor.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: cursorState.label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute whitespace-nowrap bg-black/80 text-white text-xs px-2 py-1 rounded-md",
                            style: {
                                x: 25,
                                y: -10
                            },
                            initial: {
                                opacity: 0,
                                scale: 0.8,
                                y: -5
                            },
                            animate: {
                                opacity: 1,
                                scale: 1,
                                y: -10
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.8,
                                y: -5
                            },
                            transition: {
                                duration: 0.2
                            },
                            children: cursorState.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/MagneticCursor.tsx",
                            lineNumber: 209,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/MagneticCursor.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/MagneticCursor.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__3389e37c._.js.map