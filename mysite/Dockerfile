FROM python:3
ENV PYTHONUNBUFFERED 1
WORKDIR /app/api
COPY requirements.txt ./
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN python -m pip install -r requirements.txt
RUN python -m pip install numpy
RUN python -m pip install pandas
COPY . ./
EXPOSE 8000