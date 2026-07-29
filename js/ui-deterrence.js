(() => {
    "use strict";

    const blockedCtrlShiftKeys = new Set(["c", "i", "j"]);
    const blockedMetaAltKeys = new Set(["c", "i", "j", "u"]);

    function isElement(target) {
        return target instanceof Element;
    }

    function isProtectedAsset(target) {
        return isElement(target) && Boolean(
            target.closest("img, .protected-asset, [data-protected-asset]")
        );
    }

    function isDeveloperShortcut(event) {
        const key = event.key.toLowerCase();

        return (
            event.key === "F12" ||
            (event.ctrlKey && event.shiftKey && blockedCtrlShiftKeys.has(key)) ||
            (event.ctrlKey && !event.shiftKey && key === "u") ||
            (event.metaKey && event.altKey && blockedMetaAltKeys.has(key))
        );
    }

    function install(options = {}) {
        const settings = {
            blockDeveloperShortcuts: true,
            blockImageDragging: true,
            contextMenuScope: "images",
            ...options
        };

        if (settings.blockDeveloperShortcuts) {
            document.addEventListener(
                "keydown",
                (event) => {
                    if (isDeveloperShortcut(event)) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                },
                true
            );
        }

        if (settings.contextMenuScope !== "none") {
            document.addEventListener("contextmenu", (event) => {
                const shouldBlock = settings.contextMenuScope === "document"
                    || isProtectedAsset(event.target);

                if (shouldBlock) {
                    event.preventDefault();
                }
            });
        }

        if (settings.blockImageDragging) {
            document.addEventListener("dragstart", (event) => {
                if (isProtectedAsset(event.target)) {
                    event.preventDefault();
                }
            });
        }
    }

    window.UiDeterrence = Object.freeze({ install });
})();
