"""
Event Management System — Flask application entry point.
Run: python app.py
"""

from flask import Flask, render_template, session, redirect, url_for

from routes.auth import auth_bp
from routes.admin import admin_bp
from routes.manager import manager_bp
from routes.participant import participant_bp


def create_app():
    app = Flask(__name__)
    app.secret_key = "eventhub-dev-secret-change-in-production"

    app.register_blueprint(auth_bp)
    app.register_blueprint(admin_bp, url_prefix="/admin")
    app.register_blueprint(manager_bp, url_prefix="/manager")
    app.register_blueprint(participant_bp, url_prefix="/participant")

    @app.route("/")
    def landing():
        if session.get("user_id"):
            role = session.get("role")
            if role == "admin":
                return redirect(url_for("admin.dashboard"))
            if role == "manager":
                return redirect(url_for("manager.dashboard"))
            if role == "participant":
                return redirect(url_for("participant.home"))
        return render_template("landing.html")

    @app.errorhandler(404)
    def not_found(e):
        return render_template("404.html"), 404

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
