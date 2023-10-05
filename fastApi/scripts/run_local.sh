#netstat -ano | findstr :8000 | findstr LISTENING | for /f "tokens=5" %%i in ('findstr :8000') do taskkill /F /PID %%i

cd app

#rem 가상환경 없다면 생성
# shellcheck disable=SC1050
if exist venv (
  echo venv exists
) else (
  python -m venv venv
  echo venv created
  timeout /t 1
)

#rem 가상환경 열기
venv\Scripts\activate

#rem 의존성 설치
pip install -r requirements.txt

alembic upgrade head

cd ..

#rem 로컬 서버 실행
uvicorn app.main:app --port 8000 --reload
