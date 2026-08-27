/**
 * EventHub — shared UI behaviors
 * Accordion, tabs, modals, sidebar, flash dismiss
 */
(function () {
  "use strict";

  /* Flash auto-dismiss */
  var flashStack = document.getElementById("flashStack");
  if (flashStack) {
    setTimeout(function () {
      flashStack.style.opacity = "0";
      flashStack.style.transition = "opacity 0.4s ease";
      setTimeout(function () {
        flashStack.remove();
      }, 400);
    }, 4000);
  }

  /* Sidebar (mobile) */
  var sidebar = document.getElementById("sidebar");
  var toggle = document.getElementById("sidebarToggle");
  var backdrop = document.getElementById("sidebarBackdrop");

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove("open");
    if (backdrop) backdrop.hidden = true;
  }

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add("open");
    if (backdrop) backdrop.hidden = false;
  }

  if (toggle && sidebar) {
    toggle.addEventListener("click", function () {
      if (sidebar.classList.contains("open")) closeSidebar();
      else openSidebar();
    });
  }
  if (backdrop) {
    backdrop.addEventListener("click", closeSidebar);
  }

  /* Accordion */
  document.querySelectorAll("[data-accordion]").forEach(function (root) {
    root.querySelectorAll(".accordion-trigger").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var panel = btn.nextElementSibling;
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        if (panel) {
          if (open) panel.setAttribute("hidden", "");
          else panel.removeAttribute("hidden");
        }
      });
    });
  });

  /* Tabs */
  document.querySelectorAll("[data-tabs]").forEach(function (root) {
    var tabs = root.querySelectorAll(".tab");
    var panels = root.querySelectorAll(".tab-panel");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var id = tab.getAttribute("data-tab");
        tabs.forEach(function (t) {
          t.classList.toggle("active", t === tab);
        });
        panels.forEach(function (p) {
          var match = p.getAttribute("data-panel") === id;
          p.classList.toggle("active", match);
          if (match) p.removeAttribute("hidden");
          else p.setAttribute("hidden", "");
        });
      });
    });
  });

  /* Modals */
  function openModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-modal-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openModal(btn.getAttribute("data-modal-open"));
    });
  });

  document.querySelectorAll(".modal").forEach(function (modal) {
    modal.querySelectorAll("[data-modal-close]").forEach(function (el) {
      el.addEventListener("click", function () {
        closeModal(modal);
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hasAttribute("hidden")) {
        closeModal(modal);
      }
    });
  });

  /* Simple client-side required validation hint */
  document.querySelectorAll("form[novalidate]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
      }
    });
  });
})();
