from flask import Flask, jsonify
from flask_cors import CORS  # Importamos CORS desde flask_cors

app = Flask(__name__)
CORS(app)

@app.route('/api/datos-procesados', methods=['GET'])
def obtener_datos_procesados():
    # Aquí llamamos a la función de Python para obtener los datos procesados
    datos_procesados = agrupar_productos(datos_query)
    return jsonify(datos_procesados)

datos_query = [
    {
        'Ean': '123',
        'name': 'Libro',
        'normal_price': 50.0,
        'cantidad_markets': 3,
        'rango_precios': (30.0, 60.0),
    },
    {
        'Ean': '456',
        'name': 'Rueda',
        'normal_price': 35.0,
        'cantidad_markets': 2,
        'rango_precios': (25.0, 40.0),
    },
    {
        'Ean': '789',
        'name': 'Notebook',
        'normal_price': 55.0,
        'cantidad_markets': 2,
        'rango_precios': (35.0, 60.0),
    },
]

def agrupar_productos(datos_query):
    diccionario_agrupado = {}

    for producto in datos_query:
        ean = producto['Ean']
        nombre_producto = producto['name']
        valores = producto['normal_price']
        cantidad_markets = producto['cantidad_markets']
        rango_precios = producto['rango_precios']

        if ean not in diccionario_agrupado:
            diccionario_agrupado[ean] = []

        diccionario_agrupado[ean].append({
            'nombre_producto': nombre_producto,
            'valores': valores,
            'cantidad_markets': cantidad_markets,
            'rango_precios': rango_precios,
        })

    return diccionario_agrupado

if __name__ == '__main__':
    app.run(debug=True)