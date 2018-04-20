FROM python:3-alpine

WORKDIR /api

COPY data/domains.csv .
COPY requirements.txt .
RUN pip3 install --upgrade pip \
 && pip3 install -r requirements.txt


COPY api ./
COPY ui/dist static

CMD ["python3", "app.py"]
