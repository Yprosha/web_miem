from kinopoisk_dev import KinopoiskDev
import json

TOKEN = "VPRW6KG-FWDMFXR-QZZDK77-6KAZ6TP"
kp = KinopoiskDev(token=TOKEN)

def get_random_film():
    try:
        item = kp.random()
        movie = json.loads(item.json())

        random_mov = {
            'url': f"https://www.kinopoisk.ru/film/{movie['id']}/",
            'name': movie['name'],
            'poster': movie['poster']['url']
        }
    except:
        random_mov = {
                    'url': f"https://www.kinopoisk.ru/film/{41519}/",
                    'name': 'Брат',
                    'poster': 'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/18aa74db-68a3-4dda-a216-2ada3ee1e388/3840x'
        }
    
    return json.dumps(random_mov)


if __name__=='__main__':
    print(get_random_film())