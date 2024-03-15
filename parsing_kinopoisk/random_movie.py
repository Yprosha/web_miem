from kinopoisk_dev import KinopoiskDev
import pandas as pd
import json

TOKEN = "VPRW6KG-FWDMFXR-QZZDK77-6KAZ6TP"
kp = KinopoiskDev(token=TOKEN)

def get_random_film():
    df = pd.read_csv('parsing_kinopoisk/data.csv')
    mov = df.sample().iloc[0]
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
                    'url': mov['kp_url'],
                    'name': mov['ru_name'],
                    'poster': mov['poster']
        }

    return json.dumps(random_mov)


if __name__=='__main__':
    print(get_random_film())