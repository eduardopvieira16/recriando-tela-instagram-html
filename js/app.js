(() => {
    "use strict";

    const selectors = Object.freeze({
        form: "[data-login-form]",
        identifier: "#identifier",
        password: "#password",
        submit: "[data-submit-button]",
        status: "[data-status]",
        currentYear: "[data-current-year]"
    });

    function getRequiredElement(selector) {
        const element = document.querySelector(selector);

        if (!element) {
            throw new Error(`Elemento obrigatório não encontrado: ${selector}`);
        }

        return element;
    }

    function initializeLoginForm() {
        const form = getRequiredElement(selectors.form);
        const identifier = getRequiredElement(selectors.identifier);
        const password = getRequiredElement(selectors.password);
        const submitButton = getRequiredElement(selectors.submit);
        const status = getRequiredElement(selectors.status);

        function setStatus(message = "", state = "") {
            status.textContent = message;

            if (state) {
                status.dataset.state = state;
                return;
            }

            delete status.dataset.state;
        }

        function synchronizeSubmitState() {
            const identifierIsFilled = identifier.value.trim().length > 0;
            const passwordIsValid = password.value.length >= 6;

            submitButton.disabled = !(identifierIsFilled && passwordIsValid);
        }

        form.addEventListener("input", () => {
            setStatus();
            synchronizeSubmitState();
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                setStatus("Revise os campos obrigatórios.", "error");
                synchronizeSubmitState();
                return;
            }

            setStatus(
                "Demonstração visual: nenhuma credencial foi enviada ou armazenada.",
                "success"
            );

            password.value = "";
            synchronizeSubmitState();
        });

        synchronizeSubmitState();
    }

    function initializeCurrentYear() {
        const yearElement = document.querySelector(selectors.currentYear);

        if (yearElement) {
            yearElement.textContent = String(new Date().getFullYear());
        }
    }

    function initializeUiDeterrence() {
        if (!window.UiDeterrence) {
            return;
        }

        window.UiDeterrence.install({
            blockDeveloperShortcuts: true,
            blockImageDragging: true,
            contextMenuScope: document.body.dataset.contextMenuScope || "document"
        });
    }

    function bootstrap() {
        initializeLoginForm();
        initializeCurrentYear();
        initializeUiDeterrence();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
        return;
    }

    bootstrap();
})();
