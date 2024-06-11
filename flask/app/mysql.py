# mysql 연동을 위한 모듈 pip install pymysql로 설치
import pymysql
import time
# DB커넥션과 연결 설정

cnt = 0
while True:
    try:
        db = pymysql.connect(host='emotion_diary_mysql', user='root', password='1234', db='emotion_diary_db', charset='utf8')
        print("mysql 연결 성공")
        break
    except pymysql.err.OperationalError as e:
        cnt+=1
        print(f"mysql 연결을 {cnt}회 시도중입니다...")
        if cnt >= 6:
            print("시도횟수를 초과했습니다. 서버를 종료합니다.")
            break
        time.sleep(5)


# emotion_diary_mysql_test1
# DB에 접근해 명령을 실행할 객체
cursor = db.cursor()

def select_diaryList():
    sql = "select * from diary"
    cursor.execute(sql)
    data = cursor.fetchall()
    return data

def select_max_id():
    sql = "select max(id) from diary"
    cursor.execute(sql)
    data = cursor.fetchall()
    return data

def insert_diary(id, date, content, emotionId):
    sql = f'insert into diary values({id}, \'{date}\', \'{content}\', {emotionId})'
    cursor.execute(sql)
    db.commit()

def update_diary(id, date, content, emotionId):
    sql = f'update diary set date=\'{date}\', content=\'{content}\', emotionId={emotionId}  where id = {id}'
    cursor.execute(sql)
    db.commit()

def delete_diary(id):
    sql = f'delete from diary where id = {id}'
    cursor.execute(sql)
    db.commit()