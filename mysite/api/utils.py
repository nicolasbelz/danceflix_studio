import os
from api.models import Customer, UserVideo, Video
from django.core.exceptions import ObjectDoesNotExist
import smtplib
from email.message import EmailMessage
from datetime import datetime


def refreshUserVideos(user):
    customer = Customer.objects.get(user=user)

    for i in range(1, customer.video_index + 1):
        try:
            video = Video.objects.get(index=i)
            userVideo, created = UserVideo.objects.get_or_create(
                video=video,
                user=user,
            )
            userVideo.save()
        except ObjectDoesNotExist:
            pass


def getCompanyInfoByNip(nip: str) -> dict:
    pass


def sendEmail(email: str, error: str):
    msg = EmailMessage()

    msg['Subject'] = "Email"
    msg['From'] = "visionapitact@gmail.com"
    msg['To'] = email

    msg.set_content('This is a plain text email')

    msg.add_alternative(f"""\
    <!DOCTYPE html>
    <html>
        <body>
            {error}
        </body>
    </html>
    """, subtype='html')

    with smtplib.SMTP_SSL('smtp.gl.com', 5) as smtp:
        smtp.login("visiopi.co@gmail.com", "d1001")
        smtp.send_message(msg)


def log(message: str, view: str) -> None:

    if os.getenv("SERVER"):
        log_dir = f"./logs-ictir/{view}.log"
    else:
        log_dir = f"./logs/{view}.log"

    with open(log_dir, "a") as f:
        f.write(f"{datetime.now()}: {message}\n")
    f.close()
