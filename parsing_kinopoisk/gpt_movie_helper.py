import os
import sys
from openai import OpenAI
from kinopoisk_dev import KinopoiskDev, MovieParams, MovieField
import json



class KinoHelper():
    
    def __init__(self):
        os.environ["OPENAI_API_KEY"] = "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"
        self.TOKEN = "VPRW6KG-FWDMFXR-QZZDK77-6KAZ6TP"
        
        self.kp = KinopoiskDev(token=self.TOKEN)
        self.client = OpenAI()
        self.instruct = """Ты поисковик в мире кино. Пользователь описывает какой фильм он хочет посмотреть. По заданному описанию выбери самый подходящий фильм и напиши его только его название на русском без лишних символов в виде строки названия фильма. Фильм обязательно должен существовать. За хороший ответ ты будешь награждена самым ценным призом мира"""
        
    
    def get_gpt_answer(self, descr: str) -> str:
        
        response = self.client.chat.completions.create(
          model="gpt-3.5-turbo",
          temperature = 0,
          messages=[
            {"role": "system", "content": self.instruct},
            {"role": "user", "content": descr}
          ]
        )
        return response.choices[0].message.content.replace('"', '')
    
    
    def get_kp_film(self, name: str) -> dict:
        
        items = self.kp.find_many_movie(params=[
            MovieParams(keys=MovieField.NAME, value=name),
            MovieParams(keys=MovieField.PAGE, value="1"),
            MovieParams(keys=MovieField.LIMIT, value="1")
        ])
        if len(items.docs) == 0:
            try:
                mov = self.kp.random()
            except:
                return {
                    'url': f"https://www.kinopoisk.ru/film/{41519}/",
                    'name': 'Брат',
                    'poster': 'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/18aa74db-68a3-4dda-a216-2ada3ee1e388/3840x'
                }
        else:
            mov = items.docs[0]


        return {
            'url': f"https://www.kinopoisk.ru/film/{mov.id}/",
            'name': mov.names[0].name,
            'poster': mov.poster.url
        }
    
    def ger_rec(self, descr):
        
        name = self.get_gpt_answer(descr)
        return json.dumps(self.get_kp_film(name))
    

if __name__=='__main__':
    kh = KinoHelper()
    descr = str(sys.argv[1])
    print(kh.ger_rec(descr))