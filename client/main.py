import inquirer, typer, requests, http.client
from rich import print
from tabulate import tabulate


# La función info_mail revisa si el gmail está registrado en la base de datos. Si está registrado
# retorna un diccionario con los datos del usuario, de lo contrario devuelve una cadena vacía.
def info_mail(mail: str):
    url = "http://localhost:3049/api/informacion/" + mail
    response = requests.get(url)
    if response.json()['estado'] == 200:
        return response.json()['data']
    else:
        return ""


# La función set_fav toma los datos de un usuario y el correo que desea marcar como favorito.
# Retorna los datos...
def set_fav(adress: str, clave: str):
    url = "http://localhost:3049/api/marcarcorreo"
    id_mail: int = int(input("- Ingresa el id del correo: "))
    payload = {
        "correo": adress,
        "clave": clave,
        "id_correo_a_encontrar": id_mail
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, json=payload, headers=headers)
    if response.json()['estado'] == 200:
        print("[bold green]\tEl correo ha sido añadido a favoritos.\n")
    else:
        print("[bold red]\tHubo un error al marcar el correo\n")


def get_fav(id_user: int):
    url = "http://localhost:3049/api/mostrarfavoritos"
    params = {"id_user": id_user}
    headers = {"Content-Type": "application/json"}

    response = requests.get(url, headers=headers, params=params)

    print(response.status_code, response.text)
    return response.json()

typer.echo(typer.style("[★ Bienvenido al cliente de Communiken™ ★]\n"
                       , blink=False, fg=typer.colors.BRIGHT_WHITE, bg=typer.colors.BRIGHT_MAGENTA))

mail: str = input("- Ingresa tu correo: ")
info = info_mail(mail)

# Revisar que el correo esté registrado
if info == "":
    print("[bold red]El correo no está registrado.[/bold red] Finalizando...")
    raise typer.Exit()

password: str = input("- Ingresa tu contraseña: ")

# Revisar que la clave coincida
if info['clave'] != password:
    print("La contraseña es [bold red]incorrecta.[/bold red] Finalizando...")
    raise typer.Exit()

print("[green]Sesión iniciada con éxito\n")

questions = [
    inquirer.List('choice',
                  message="¿Qué deseas hacer?",
                  choices=['Ver información de un correo electrónico',
                           'Ver mis correos favoritos',
                           'Marcar un correo como favorito',
                           'Salir del cliente'],
                  carousel=True
                  ),
]

while True:
    answer = inquirer.prompt(questions)['choice']
    if answer == 'Ver información de un correo electrónico':
        mail_2: str = input("- Ingresa el correo: ")
        info_mail = info_mail(mail_2)
        tabla = []
        for key in info_mail:
            tabla.append([key, info[key]])
        print(tabulate(tabla, tablefmt='fancy_grid'))

    elif answer == 'Ver mis correos favoritos':
        favoritos = get_fav(info['id_usuario'])
        print(favoritos)
        break

    elif answer == 'Marcar un correo como favorito':
        set_fav(mail, password)
    else:
        break
