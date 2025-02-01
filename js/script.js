function toggleHeaderScrolledClass() {
    const header = document.querySelector(".header");
    if (window.scrollY > 0) {
        header?.classList.add("scrolled");
    } else {
        header?.classList.remove("scrolled");
    }
}

function changeHeaderColDynamicWidth() {
    const headerColDynamic = document.querySelector(".header__col-dynamic");
    const bannerImgWidth = document.querySelector(".banner__img")?.offsetWidth;
    if (headerColDynamic && bannerImgWidth) {
        headerColDynamic.style.width = `${bannerImgWidth}px`;
    }
}

function changeBannerPadding() {
    const container = document.querySelector(".banner .container");
    const headerHeight = document.querySelector(".header")?.clientHeight;
    if (container && headerHeight) {
        container.style.paddingTop = `${headerHeight}px`;
    }
}
function handleScroll() {
    toggleHeaderScrolledClass();
}

function handleResize() {
    changeBannerPadding();
}

function handleForm(e) {
    e.preventDefault();

    const isDevelopment = true;
    const formData = new FormData(e.target);
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        isAgree: Boolean(formData.get("agree")),
    };

    const errors = [];
    if (!data.name) errors.push("Нужно заполнить имя");
    if (!data.email) errors.push("Нужно заполнить email");
    if (!data.isAgree) errors.push("Нужно согласиться с обработкой данных");

    if (errors.length > 0) {
        console.error("Ошибки в форме:", errors);
        return;
    }

    const submitButton = e.target.querySelector('button[type="submit"]');

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Отправка...";
    }

    if (isDevelopment) {
        setTimeout(() => {
            console.log("Отправлены данные:", data);
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Отправить";
            }
        }, 1000);
    } else {
        fetch("/form-submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => console.log("Ответ сервера:", result))
            .catch((error) => console.error("Ошибка отправки:", error))
            .finally(() => {
                // Разблокируем кнопку и действуем по ситуации
            });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    document.addEventListener("submit", handleForm);

    changeBannerPadding();
    changeHeaderColDynamicWidth();
});
