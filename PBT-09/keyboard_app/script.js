const images = [
    "https://picsum.photos/id/10/800/500",
    "https://picsum.photos/id/20/800/500",
    "https://picsum.photos/id/30/800/500",
    "https://picsum.photos/id/40/800/500",
    "https://picsum.photos/id/50/800/500",
    "https://picsum.photos/id/60/800/500",
    "https://picsum.photos/id/70/800/500",
    "https://picsum.photos/id/80/800/500",
    "https://picsum.photos/id/90/800/500"
];

const commands = [
    {
        name: "Next Image",
        action: nextImage
    },
    {
        name: "Previous Image",
        action: prevImage
    },
    {
        name: "Toggle Slideshow",
        action: toggleSlideshow
    },
    {
        name: "Open Modal",
        action: openModal
    }
];

const galleryImage = document.getElementById("galleryImage");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModalBtn = document.getElementById("closeModal");

const palette = document.getElementById("paletteOverlay");
const openPaletteBtn = document.getElementById("openPalette");

const commandInput = document.getElementById("commandInput");
const commandList = document.getElementById("commandList");

let currentIndex = 0;
let slideshow = null;

function renderImage() {
    galleryImage.src = images[currentIndex];
    galleryImage.alt = `Image ${currentIndex + 1}`;
    if (!modal.classList.contains("hidden")) {
        modalImage.src = images[currentIndex];
        modalImage.alt = `Image ${currentIndex + 1}`;
    }
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    renderImage();
}

function prevImage() {
    currentIndex =
        (currentIndex - 1 + images.length)
        % images.length;
    renderImage();
}

function jumpToImage(index) {
    if (
        index >= 0 &&
        index < images.length
    ) {
        currentIndex = index;
        renderImage();
    }
}

function openModal() {
    closePalette();
    modal.classList.remove("hidden");
    modalImage.src = images[currentIndex];
    modalImage.alt = `Image ${currentIndex + 1}`;
    closeModalBtn.focus();
}

function closeModal() {
    modal.classList.add("hidden");
}

function toggleSlideshow() {
    if (slideshow) {
        clearInterval(slideshow);
        slideshow = null;
        return;
    }

    slideshow = setInterval(() => {
        nextImage();
    }, 2000);
}

function openPalette() {
    closeModal();
    palette.classList.remove("hidden");
    commandInput.value = "";
    renderCommands("");
    commandInput.focus();
}

function closePalette() {
    palette.classList.add("hidden");
}

function renderCommands(keyword = "") {
    commandList.innerHTML = "";

    const filteredCommands =
        commands.filter(cmd =>
            cmd.name
                .toLowerCase()
                .includes(
                    keyword.toLowerCase()
                )
        );

    filteredCommands.forEach(cmd => {
        const li = document.createElement("li");
        li.textContent = cmd.name;
        li.tabIndex = 0;
        li.addEventListener("click", () => {
            cmd.action();
            closePalette();
        });
        commandList.appendChild(li);
    });
}

function executeFirstCommand() {
    const keyword = commandInput.value.toLowerCase();

    const command = commands.find(cmd =>
        cmd.name
            .toLowerCase()
            .includes(keyword)
    );

    if (!command) return;
    command.action();
    closePalette();
}

nextBtn.addEventListener(
    "click",
    nextImage
);

prevBtn.addEventListener(
    "click",
    prevImage
);

galleryImage.addEventListener(
    "click",
    openModal
);

closeModalBtn.addEventListener(
    "click",
    closeModal
);

openPaletteBtn.addEventListener(
    "click",
    openPalette
);

commandInput.addEventListener(
    "input",
    () => {
        renderCommands(
            commandInput.value
        );
    }
);

commandInput.addEventListener(
    "keydown",
    (e) => {
        if (e.key === "Enter") {
            executeFirstCommand();
        }
    }
);

document.addEventListener(
    "keydown",
    (e) => {
        if (
            e.ctrlKey &&
            e.key.toLowerCase() === "k"
        ) {
            e.preventDefault();
            openPalette();
            return;
        }

        if (e.key === "Escape") {
            closeModal();
            closePalette();
            return;
        }

        if (
            !palette.classList.contains(
                "hidden"
            )
        ) {
            return;
        }

        if (
            e.key === "ArrowRight"
        ) {
            nextImage();
        }

        else if (
            e.key === "ArrowLeft"
        ) {
            prevImage();
        }

        else if (
            e.code === "Space"
        ) {
            e.preventDefault();
            toggleSlideshow();
        }

        else if (
            /^[1-9]$/.test(e.key)
        ) {
            jumpToImage(
                Number(e.key) - 1
            );
        }
    }
);

renderImage();
renderCommands();