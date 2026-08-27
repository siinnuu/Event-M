"""Shared auth constants (imported by blueprints to avoid circular imports)."""

ROLE_HOME = {
    "admin": "admin.dashboard",
    "manager": "manager.dashboard",
    "participant": "participant.home",
}
