const form = document.getElementById("expenseForm");
    const categoryInput = document.getElementById("category");
    const amountInput = document.getElementById("amount");

    let categories = [];
    let amounts = [];

    const ctx = document.getElementById("expenseChart").getContext("2d");
    let chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: categories,
        datasets: [{
          label: "Expenses",
          data: amounts,
          backgroundColor: getChartColors(),
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: getTextColor()
            }
          }
        },
      },
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const category = categoryInput.value.trim();
      const amount = parseFloat(amountInput.value);

      if (!category || isNaN(amount) || amount <= 0) return;

      const index = categories.indexOf(category);
      if (index !== -1) {
        amounts[index] += amount;
      } else {
        categories.push(category);
        amounts.push(amount);
      }

      chart.data.labels = categories;
      chart.data.datasets[0].data = amounts;
      chart.update();

      categoryInput.value = "";
      amountInput.value = "";
    });

    // Theme toggle
    const toggleBtn = document.getElementById("toggleTheme");
    const root = document.documentElement;

    toggleBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      updateChartColors();
    });

    // Apply saved theme
    const savedTheme = localStorage.getItem("theme") || "dark";
    root.setAttribute("data-theme", savedTheme);

    function getChartColors() {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      return isDark
        ? ["#fbbf24", "#4ade80", "#818cf8", "#f472b6", "#e5e7eb", "#22d3ee", "#fde68a"]
        : ["#111111", "#44403c", "#d6d3d1", "#a8a29e", "#e7e5e4", "#78716c", "#f5f5f4"];
    }

    function getTextColor() {
      return document.documentElement.getAttribute("data-theme") === "dark" ? "#f5f5f5" : "#111";
    }

    function updateChartColors() {
      chart.options.plugins.legend.labels.color = getTextColor();
      chart.data.datasets[0].backgroundColor = getChartColors();
      chart.update();
    }

    updateChartColors();