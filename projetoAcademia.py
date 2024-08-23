from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as gemini

app = Flask(__name__)
CORS(app)

gemini.configure(api_key="AIzaSyDqPmZFtPA86b1-7w9OP42nVl2XccTe4x8")

model = gemini.GenerativeModel('gemini-1.5-flash')

@app.route('/treino', methods=['POST'])
def gerar_treino():
    try:
        dados = request.json
        musculos = dados.get('musculos')
        prompt = f"""
        Crie uma rotina de treino para os seguintes músculos: {musculos}.
        Apresente o treino no formato html com codificação UTF-8, sem o header,
        com o título em h1, subtítulos em h2, e uma lista de exercícios para cada
        grupo muscular. Cada exercício deve ser apresentado com o nome do exercício,
        número de séries, repetições e um breve descrição do exercício.
        Não gerar rotina de treino caso não seja um músculo do corpo, não gerar rotina de treino com palavras aleatorias ou que sejam ofensivas.
        Não gerar rotina de treino caso não seja humano.
        Não gerar rotina de treino caso os musculos solicitados sejam impossiveis de definir, aumentar ou fortalecer.
        """
        resposta = model.generate_content(prompt)
        print(resposta)
        treino = resposta.text.strip().split('\n')
        return jsonify(treino), 200
    except Exception as e:
        return jsonify({"Erro": str(e)}), 300

if __name__ == '__main__':
    app.run(debug=True)
