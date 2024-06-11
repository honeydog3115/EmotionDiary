from app import app

app1 = app.create_app()
if __name__ == "__main__":
    app1.run(host='0.0.0.0', port = 5000)