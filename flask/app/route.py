from flask import Blueprint
from . import mysql
from flask import jsonify
from flask import request

bp = Blueprint('main', __name__, url_prefix='/')

@bp.route('/', methods = ['GET'])
def init():
    str = "연결 성공!"
    return jsonify({'result' : 'success', 'str' : str})

@bp.route('/getDiaryList', methods = ['GET'])
def getDiaryList():
    rawDiaryList = mysql.select_diaryList()
    maxId = mysql.select_max_id()

    diaryList = []
    for diary in rawDiaryList:
        diaryList.append({'id': diary[0], 'date': int(diary[1]), 'content': diary[2], 'emotionId': diary[3]})
    
    print(diaryList)

    return jsonify({'result':'success', 'dairyList': diaryList, 'maxId': maxId})


@bp.route('/new/postNewDiary', methods = ['POST'])
def postNewDiary():
    # 딕셔너리임.
    requestData = request.get_json()
    print(f"requestData : {requestData}")
    id = requestData['id']
    date = requestData['date']
    content = requestData['content']
    emotionId = requestData['emotionId']
    print(f'id : {id}, date : {date}, content : {content}, emotionId : {emotionId}')
    mysql.insert_diary(id, str(date), content, emotionId)

    return jsonify({'result':'success'})

@bp.route('/edit/postEditedDiary', methods = ['POST'])
def postEditedDiary():
    requestData = request.get_json()
    id = requestData['id']
    date = requestData['date']
    content = requestData['content']
    emotionId = requestData['emotionId']

    mysql.update_diary(id, str(date), content, emotionId)

    return jsonify({'result':'success'})

@bp.route('/delete/deleteDiary/<int:id>', methods = ['DELETE'])
def deleteDiary(id):
    mysql.delete_diary(id)

    return jsonify({'result':'success'})