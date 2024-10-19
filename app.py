from flask import Flask, request, jsonify
from transformers import pipeline, GPT2LMHeadModel, GPT2Tokenizer

app = Flask(__name__)

bert_classifier = pipeline('zero-shot-classification', model='facebook/bart-large-mnli')
gpt_tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
gpt_model = GPT2LMHeadModel.from_pretrained('gpt2')

def generate_response(query):
    labels = ['criminal law', 'civil law', 'corporate law', 'employment law']
    classification = bert_classifier(query, labels)
    case_type = classification['labels'][0]

    input_ids = gpt_tokenizer.encode(f"{case_type}: {query}", return_tensors='pt')
    gpt_output = gpt_model.generate(input_ids, max_length=150)
    response = gpt_tokenizer.decode(gpt_output[0], skip_special_tokens=True)

    return response

@app.route('/process-query', methods=['POST'])
def process_query():
    data = request.json
    query = data['query']
    response = generate_response(query)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(port=5000)
