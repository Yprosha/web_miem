from kinopoisk_dev import KinopoiskDev

TOKEN = "VPRW6KG-FWDMFXR-QZZDK77-6KAZ6TP"
# kp = KinopoiskDev(token=TOKEN)
# item = kp.random()
kp = KinopoiskDev(token=TOKEN)
item = kp.afind_many_movie(
    params=[
        MovieParams(keys=MovieField.PAGE, value=1),
        MovieParams(keys=MovieField.LIMIT, value=100),
    ]
)

print(item)