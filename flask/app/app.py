from flask import Flask
# 현재 디렉토리에서 route.py을 import
from . import route
# CORS 정책 위반으로 서버에 접근이 안되어서 추가함. pip install flask_cors로 모듈 설치
from flask_cors import CORS

def create_app(): 
    app = Flask(__name__)
    # CORS 설정을 위해 CORS에 app을 넣음. r은 프리픽스 도메인, origins는 주소라고 생각하면된다.
    CORS(app, resources={r'*': {'origins': '*'}})   

    app.register_blueprint(route.bp)

    return app