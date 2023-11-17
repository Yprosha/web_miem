from kinopoisk_dev import KinopoiskDev
import json

TOKEN = "VPRW6KG-FWDMFXR-QZZDK77-6KAZ6TP"
kp = KinopoiskDev(token=TOKEN)

def get_random_film():
    item = kp.random()
    movie = json.loads(item.json())

    random_mov = {
        'url': f"https://www.kinopoisk.ru/film/{movie['id']}/",
        'name': movie['name'],
        'poster': movie['poster']['url']
    }
    
    return json.dumps(random_mov)


if __name__=='__main__':
    print(get_random_film())