import json

for i in range(13, loginFiles + 1):
    scenarioToDelete = f'Login{i}'
    with open(json_file, 'r') as f:
        json_data = json.load(f)
        for scenario in json_data['scenarios']:
            if scenario['label'] == scenarioToDelete:
                json_data['scenarios'].remove(scenario)
                break
    with open(json_file, 'w') as f:
        json.dump(json_data, f, sort_keys=False ,indent=4)
