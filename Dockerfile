FROM alpine

WORKDIR /api

RUN apk add --update --no-cache \
	supervisor \
	python3 \
	nginx \
	uwsgi \
	uwsgi-python3 \
	&& rm /etc/nginx/conf.d/default.conf

COPY data/domains.csv .
COPY requirements.txt .
RUN pip3 install --upgrade pip \
 && pip3 install -r requirements.txt

COPY conf/nginx.conf /etc/nginx/
COPY conf/domain-search.conf /etc/nginx/conf.d/
COPY conf/uwsgi.ini /etc/uwsgi/
COPY conf/supervisord.conf /etc/supervisord.conf

COPY api ./
COPY ui/dist static

CMD ["/usr/bin/supervisord"]
