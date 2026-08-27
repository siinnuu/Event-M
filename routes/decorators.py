"""Auth helpers: login_required decorator and session utilities."""

from functools import wraps

from flask import session, redirect, url_for, flash, request

from routes.auth_utils import ROLE_HOME


def login_required(role=None):
    """Protect a route. Optionally require a specific role."""

    def decorator(view):
        @wraps(view)
        def wrapped(*args, **kwargs):
            user_id = session.get("user_id")
            if not user_id:
                flash("Please log in to continue.", "warning")
                return redirect(url_for("auth.login", next=request.path))

            if role and session.get("role") != role:
                flash("You do not have access to that page.", "error")
                home = ROLE_HOME.get(session.get("role"), "auth.login")
                return redirect(url_for(home))

            return view(*args, **kwargs)

        return wrapped

    return decorator
