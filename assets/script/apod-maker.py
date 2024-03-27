##
## EPITECH PROJECT, 2024
## JAM_NASA_BOT
## File description:
## apod-maker
##

from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
import qrcode
import requests
import os
from dotenv import load_dotenv
import sys

IMAGE_SIZE = (1113, 587)
IMAGE_POS = (92, 323)
QRCODE_SIZE = (300, 300)
QRCODE_POS = (1400, 600)
TITLE_X = 648
TITLE_Y = 188
DATE_POS = (109, 973)
TEXT_SIZE = 48
OUTPUT_DIRECTORY = "./assets/images/APOD/"
TEMPLATE_PATH = "./assets/script/template.jpg"

# Function to fetch data from NASA APOD API
def fetch_apod_data(date):
    load_dotenv()

    api_key = os.getenv("API_KEY")
    api_url = os.getenv("API_URL")

    request_url = f"{api_url}?api_key={api_key}&date={date}"

    response = requests.get(request_url)

    if response.status_code == 200:
        return response.json()
    else:
        print("Error while fetching APOD data:", response.status_code)
        return None

# Function to create APOD template
def create_apod_template(data, date):
    page_date = date[2:4] + date[5:7] + date[8:10]
    iod_page = f"https://apod.nasa.gov/apod/ap{page_date}.html"
    qr = qrcode.make(iod_page)

    template_image = Image.open(TEMPLATE_PATH)
    image_url = data['hdurl']
    image_response = requests.get(image_url)

    if image_response.status_code == 200:
        image_content = Image.open(BytesIO(image_response.content))
    else:
        print("Error opening image")
        return None

    title = data['title']

    new_size = IMAGE_SIZE
    data_image = image_content.resize(new_size)
    qr = qr.resize(QRCODE_SIZE)

    template_image.paste(data_image, IMAGE_POS)
    template_image.paste(qr, QRCODE_POS)

    title_pos = (TITLE_X - (len(title) * 10), TITLE_Y)

    draw = ImageDraw.Draw(template_image)
    font = ImageFont.truetype("./assets/script/LeagueSpartan-Bold.ttf", size=TEXT_SIZE)
    draw.text(title_pos, title, fill="white", font=font)
    draw.text(DATE_POS, date, fill="white", font=font)

    iod_name = f"iod-{date}.jpg"
    output_path = os.path.join(OUTPUT_DIRECTORY, iod_name)
    template_image.save(output_path, "JPEG")

    print("Image processing complete.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python apod-maker.py <YYYY-MM-DD>")
        sys.exit(1)

    date = sys.argv[1]
    apod_data = fetch_apod_data(date)

    if apod_data:
        create_apod_template(apod_data, date)
