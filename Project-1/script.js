// TaskFlow uses a small amount of vanilla JavaScript for dashboard interactions.
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const filterButtons = document.querySelectorAll(".filter-button");
    const taskList = document.querySelector("#task-list");
    const addTaskButton = document.querySelector(".add-task-button");
    const taskModal = document.querySelector("#task-modal");
    const taskForm = document.querySelector("#task-form");
    const taskTitle = document.querySelector("#task-title");
    const modalClose = document.querySelector("#modal-close");
    const modalCancel = document.querySelector("#modal-cancel");

    function getTaskCards() {
        return document.querySelectorAll(".task-card");
    }

    // Open and close the mobile navigation menu.
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the mobile menu after selecting a page section.
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    // Update the dashboard numbers from the current task card statuses.
    function updateStatistics() {
        const taskCards = getTaskCards();
        const completedTasks = document.querySelectorAll('.task-card[data-status="completed"]').length;
        const totalTasks = taskCards.length;
        const pendingTasks = totalTasks - completedTasks;
        const productivity = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

        document.querySelector("#total-tasks").textContent = totalTasks;
        document.querySelector("#completed-tasks").textContent = completedTasks;
        document.querySelector("#pending-tasks").textContent = pendingTasks;
        document.querySelector("#productivity").textContent = `${productivity}%`;
        document.querySelector("#productivity-bar").style.width = `${productivity}%`;
    }

    // Event delegation keeps completion working for newly added cards too.
    taskList.addEventListener("click", (event) => {
        const button = event.target.closest(".complete-button");
        if (!button || button.disabled) return;

        const card = button.closest(".task-card");
        const status = card.querySelector(".task-status");
        card.dataset.status = "completed";
        card.classList.add("completed");
        status.classList.remove("status-pending");
        status.classList.add("status-completed");
        status.innerHTML = '<span class="status-dot"></span> Completed';
        button.textContent = "Done";
        button.disabled = true;
        updateStatistics();
        applyFilter(document.querySelector(".filter-button.active").dataset.filter);
    });

    function applyFilter(selectedFilter) {
        const taskCards = getTaskCards();
        let visibleTasks = 0;

        taskCards.forEach((card) => {
            const matchesFilter = selectedFilter === "all" || card.dataset.status === selectedFilter;
            card.classList.toggle("hidden", !matchesFilter);
            if (matchesFilter) visibleTasks += 1;
        });

        document.querySelector("#visible-task-count").textContent = `${visibleTasks} ${visibleTasks === 1 ? "task" : "tasks"}`;
    }

    // Show only the task cards that match the selected filter.
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach((filterButton) => filterButton.classList.remove("active"));
            button.classList.add("active");
            applyFilter(selectedFilter);
        });
    });

    function closeTaskModal() {
        taskModal.hidden = true;
        taskForm.reset();
    }

    addTaskButton.addEventListener("click", () => {
        taskModal.hidden = false;
        taskTitle.focus();
    });

    modalClose.addEventListener("click", closeTaskModal);
    modalCancel.addEventListener("click", closeTaskModal);
    taskModal.addEventListener("click", (event) => {
        if (event.target === taskModal) closeTaskModal();
    });

    // Build a new card from the form values and add it to the task list.
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(taskForm);
        const category = formData.get("category");
        const priority = formData.get("priority");
        const dueDate = new Date(`${formData.get("dueDate")}T00:00:00`);
        const formattedDate = dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        const priorityName = priority.charAt(0).toUpperCase() + priority.slice(1);

        const newCard = document.createElement("article");
        newCard.className = "task-card";
        newCard.dataset.status = "pending";
        newCard.innerHTML = `
            <div class="task-card-top"><span class="category-label category-${category}">${categoryName}</span><button class="more-button" type="button" aria-label="More options for ${formData.get("title")}">...</button></div>
            <h4>${formData.get("title")}</h4>
            <div class="task-meta"><span>&#128197; ${formattedDate}</span><span class="priority priority-${priority}">${priorityName}</span></div>
            <div class="task-card-footer"><span class="task-status status-pending"><span class="status-dot"></span> Pending</span><button class="complete-button" type="button">Complete</button></div>`;

        taskList.append(newCard);
        closeTaskModal();
        updateStatistics();
        applyFilter(document.querySelector(".filter-button.active").dataset.filter);
    });

    updateStatistics();
});
