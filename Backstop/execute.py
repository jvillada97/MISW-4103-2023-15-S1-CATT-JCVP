import os
import json
import shutil

def addDataJson(json_data):
    json_data['scenarios'].append({
            "label": "Edit_Page13",
            "url": "../GHOST_5_68_0/Kraken/reports/Edit_Page/Edit_Page13.png",
            "misMatchThreshold": 3
            })
def createFolder_copyFiles(folderName):
    #creates the new folder inside the html_report
    directory = './backstop_data/'
    path = os.path.join(directory, folderName)
    if os.path.exists(path):
        shutil.rmtree(path)
    source_path = './backstop_data/html_report/'
    #os.mkdir(path)
    #copy files from html_report folder to new folder
    files = os.listdir(source_path)
    shutil.copytree(source_path, path)

#Variables declaration 
command = 'backstop test'
json_file = 'backstop.json'
actions = [
    'Delete',
    'Edit',
    'New'
]
classes = [
    'Page',
    'Post',
    'Tag'
]

#This variable makes reference to the # of files inside each folder e.g. Delete folders have 12 files and its the third position of actions array so third position of this array should be 12
numberOfFiles = [
    12, #17 files in New folder
    14, #14 files in Edit folder
    18 #12 files in Delete folder
]

#run the tests for New_member_ actions
actionsNewMember = 'New_member_'
classesNewMember = [
    'exceeding_field_limit',
    'to_field_limit'
]
newMember_NofFiles = 9
for j in range(0, len(classesNewMember)):
    with open(json_file, 'r') as f:
        json_data = json.load(f) 
    for i in range(0, newMember_NofFiles):
        json_data['scenarios'][i]['label'] = f'{actionsNewMember}{classesNewMember[j]}{(i + 1)}'
        json_data['scenarios'][i]['url'] = f'../GHOST_5_68_0/Kraken/reports/{actionsNewMember}{classesNewMember[j]}/{actionsNewMember}{classesNewMember[j]}{(i + 1)}.png'
    with open(json_file, 'w') as f:
        json.dump(json_data, f, sort_keys=False ,indent=4)
    with open(json_file, 'r') as f:
        json_data = json.load(f)
        json_data['paths']['bitmaps_reference'] = f'../GHOST_4_44_0/Kraken/reports/{actionsNewMember}{classesNewMember[j]}/'
    with open(json_file, 'w') as f:
        json.dump(json_data, f, sort_keys=False ,indent=1)    
    os.system(command)
    createFolder_copyFiles(f'html_report_{actionsNewMember}{classesNewMember[j]}')


#Runs the tests for all classes with the Delete action
for j in range(0, len(classes)):
    #print(j)
    if ( j == 0 ):
        with open(json_file, 'r') as f:
            json_data = json.load(f)
            for i in range(0, (numberOfFiles[0] - newMember_NofFiles)):
                addDataJson(json_data)
        with open(json_file, 'w') as f:
            json.dump(json_data, f, sort_keys=False ,indent=4)
    with open(json_file, 'r') as f:
        json_data = json.load(f)
        for i in range(0, numberOfFiles[0]):
            json_data['scenarios'][i]['label'] = f'Delete_{classes[j]}{(i + 1)}'
            json_data['scenarios'][i]['url'] = f'../GHOST_5_68_0/Kraken/reports/Delete_{classes[j]}/Delete_{classes[j]}{(i + 1)}.png'
    with open(json_file, 'w') as f:
        json.dump(json_data, f, sort_keys=False ,indent=4)
    with open(json_file, 'r') as f:
        json_data = json.load(f)
        json_data['paths']['bitmaps_reference'] = f'../GHOST_4_44_0/Kraken/reports/Delete_{classes[j]}/'
    with open(json_file, 'w') as f:
        json.dump(json_data, f, indent=1)
    os.system(command)
    createFolder_copyFiles(f'html_report_Delete_{classes[j]}')

#Run tests for change password ok
actionsPassword = 'Change_password_'
classOkPassword = 'ok'
okPasswordFiles = 13

with open(json_file, 'r') as f:
    json_data = json.load(f)
    for i in range(0, ( okPasswordFiles - numberOfFiles[0])):
        addDataJson(json_data)
with open(json_file, 'w') as f:
    json.dump(json_data, f, sort_keys=False ,indent=4)
with open(json_file, 'r') as f:
    json_data = json.load(f) 
    for i in range(0, okPasswordFiles):
        json_data['scenarios'][i]['label'] = f'{actionsPassword}{classOkPassword}{(i + 1)}'
        json_data['scenarios'][i]['url'] = f'../GHOST_5_68_0/Kraken/reports/{actionsPassword}{classOkPassword}/{actionsPassword}{classOkPassword}{(i + 1)}.png'
with open(json_file, 'w') as f:
    json.dump(json_data, f, sort_keys=False ,indent=4)
with open(json_file, 'r') as f:
    json_data = json.load(f)
    json_data['paths']['bitmaps_reference'] = f'../GHOST_4_44_0/Kraken/reports/{actionsPassword}{classOkPassword}/'
with open(json_file, 'w') as f:
    json.dump(json_data, f, sort_keys=False ,indent=1)    
os.system(command)
createFolder_copyFiles(f'html_report_{actionsPassword}{classOkPassword}')

#Runs the tests for all classes with the Edit action
for j in range(0, len(classes)):
    if (j == 0):
        with open(json_file, 'r') as f:
            json_data = json.load(f)
            for i in range(0, (numberOfFiles[1] - okPasswordFiles)):
                addDataJson(json_data)
        with open(json_file, 'w') as f:
            json.dump(json_data, f, sort_keys=False ,indent=4)
    with open(json_file, 'r') as f:
        json_data = json.load(f) 
        for i in range(0, numberOfFiles[1]):
            json_data['scenarios'][i]['label'] = f'Edit_{classes[j]}{(i + 1)}'
            json_data['scenarios'][i]['url'] = f'../GHOST_5_68_0/Kraken/reports/Edit_{classes[j]}/Edit_{classes[j]}{(i + 1)}.png'
    with open(json_file, 'w') as f:
        json.dump(json_data, f, sort_keys=False ,indent=4)
    with open(json_file, 'r') as f:
        json_data = json.load(f)
        json_data['paths']['bitmaps_reference'] = f'../GHOST_4_44_0/Kraken/reports/Edit_{classes[j]}/'
    with open(json_file, 'w') as f:
        json.dump(json_data, f, indent=1)
    os.system(command)
    createFolder_copyFiles(f'html_report_Edit_{classes[j]}')

#Run tests with the Change_profile_ action 
actionsProfile = 'Change_profile_'
classesProfile = [
    'empty_required_fields',
    'exceeding_the_limit_of_required_fields',
    'required_fields'
]
for j in range(0, len(classesProfile)):
    with open(json_file, 'r') as f:
        json_data = json.load(f) 
    for i in range(0, numberOfFiles[1]):
        json_data['scenarios'][i]['label'] = f'{actionsProfile}{classesProfile[j]}{(i + 1)}'
        json_data['scenarios'][i]['url'] = f'../GHOST_5_68_0/Kraken/reports/{actionsProfile}{classesProfile[j]}/{actionsProfile}{classesProfile[j]}{(i + 1)}.png'
    with open(json_file, 'w') as f:
        json.dump(json_data, f, sort_keys=False ,indent=4)
    with open(json_file, 'r') as f:
        json_data = json.load(f)
        json_data['paths']['bitmaps_reference'] = f'../GHOST_4_44_0/Kraken/reports/{actionsProfile}{classesProfile[j]}/'
    with open(json_file, 'w') as f:
        json.dump(json_data, f, sort_keys=False ,indent=1)    
    os.system(command)
    createFolder_copyFiles(f'html_report_{actionsProfile}{classesProfile[j]}')


#Runs the tests for the classes containing Change_password_ 1, 9 and 10 all of these classes have 15 files

classesPassword = [
    '1_character',
    '9_character',
    '10_character'
]
numberOfChangePasswordFiles = 15
for i in range(0, len(classesPassword)):
    if (i == 0):
        with open(json_file, 'r') as f:
            json_data = json.load(f)
            for i in range(0, (numberOfChangePasswordFiles - numberOfFiles[1])):
                addDataJson(json_data)
        with open(json_file, 'w') as f:
            json.dump(json_data, f, sort_keys=False ,indent=4)
    with open(json_file, 'r') as f:
        json_data = json.load(f) 
        for j in range(0, numberOfChangePasswordFiles):
            json_data['scenarios'][j]['label'] = f'{actionsPassword}{classesPassword[i]}{(j + 1)}'
            json_data['scenarios'][j]['url'] = f'../GHOST_5_68_0/Kraken/reports/{actionsPassword}{classesPassword[i]}/{actionsPassword}{classesPassword[i]}{(j + 1)}.png'    
    with open(json_file, 'w') as f:
        json.dump(json_data, f, sort_keys=False ,indent=4)
    with open(json_file, 'r') as f:
        json_data = json.load(f)
        json_data['paths']['bitmaps_reference'] = f'../GHOST_4_44_0/Kraken/reports/{actionsPassword}{classesPassword[i]}/'
    with open(json_file, 'w') as f:
        json.dump(json_data, f, indent=1)
    os.system(command)
    createFolder_copyFiles(f'html_report_{actionsPassword}{classesPassword[i]}')

#Runs the tests for all classes with the New action
for j in range(0, len(classes)):
    if (j == 0):
        with open(json_file, 'r') as f:
            json_data = json.load(f)
            for i in range(0, (numberOfFiles[2] - numberOfChangePasswordFiles)):
                addDataJson(json_data)
        with open(json_file, 'w') as f:
            json.dump(json_data, f, sort_keys=False ,indent=4)
    with open(json_file, 'r') as f:
        json_data = json.load(f) 
        for i in range(0, numberOfFiles[2]):
            json_data['scenarios'][i]['label'] = f'New_{classes[j]}{(i + 1)}'
            json_data['scenarios'][i]['url'] = f'../GHOST_5_68_0/Kraken/reports/New_{classes[j]}/New_{classes[j]}{(i + 1)}.png'
    with open(json_file, 'w') as f:
        json.dump(json_data, f, sort_keys=False ,indent=4)
    with open(json_file, 'r') as f:
        json_data = json.load(f)
        json_data['paths']['bitmaps_reference'] = f'../GHOST_4_44_0/Kraken/reports/New_{classes[j]}/'
    with open(json_file, 'w') as f:
        json.dump(json_data, f, indent=1)
    os.system(command)
    createFolder_copyFiles(f'html_report_New_{classes[j]}')
    
#Run the tests of Many_logins_and_one_successful action
actionsManyLogins = 'Many_logins_and_one_successful'
nOfFilesManyLogins = 25
with open(json_file, 'r') as f:
    json_data = json.load(f)
    for i in range(0, (nOfFilesManyLogins - numberOfFiles[2])):
        addDataJson(json_data)
with open(json_file, 'w') as f:
    json.dump(json_data, f, sort_keys=False ,indent=4)
with open(json_file, 'r') as f:
    json_data = json.load(f) 
    for i in range(0, nOfFilesManyLogins):
        json_data['scenarios'][i]['label'] = f'{actionsManyLogins}{(i + 1)}'
        json_data['scenarios'][i]['url'] = f'../GHOST_5_68_0/Kraken/reports/{actionsManyLogins}/{actionsManyLogins}{(i + 1)}.png'
with open(json_file, 'w') as f:
    json.dump(json_data, f, sort_keys=False ,indent=4)
with open(json_file, 'r') as f:
    json_data = json.load(f)
    json_data['paths']['bitmaps_reference'] = f'../GHOST_4_44_0/Kraken/reports/{actionsManyLogins}/'
with open(json_file, 'w') as f:
    json.dump(json_data, f, sort_keys=False ,indent=1)    
os.system(command)
createFolder_copyFiles(f'html_report_{actionsManyLogins}')


loginFiles = 42 #22 files in this folder

#Runs the tests for login functionality
with open(json_file, 'r') as f:
    json_data = json.load(f)
    for i in range(0, (loginFiles - nOfFilesManyLogins)):
        addDataJson(json_data)
with open(json_file, 'w') as f:
    json.dump(json_data, f, sort_keys=False ,indent=4)
with open(json_file, 'r') as f:
    json_data = json.load(f) 
    for i in range(0, loginFiles):
        json_data['scenarios'][i]['label'] = f'Login{(i + 1)}'
        json_data['scenarios'][i]['url'] = f'../GHOST_5_68_0/Kraken/reports/Login/Login{(i + 1)}.png'
with open(json_file, 'w') as f:
    json.dump(json_data, f, sort_keys=False ,indent=4)
with open(json_file, 'r') as f:
    json_data = json.load(f)
    json_data['paths']['bitmaps_reference'] = f'../GHOST_4_44_0/Kraken/reports/Login/'
with open(json_file, 'w') as f:
    json.dump(json_data, f, sort_keys=False ,indent=1)    
os.system(command)
createFolder_copyFiles(f'html_report_Login')
    
#Cleans the jsonfile with only 9 scenarios
for i in range(10, loginFiles + 1):
    scenarioToDelete = f'Login{i}'
    with open(json_file, 'r') as f:
        json_data = json.load(f)
        for scenario in json_data['scenarios']:
            if scenario['label'] == scenarioToDelete:
                json_data['scenarios'].remove(scenario)
                break
    with open(json_file, 'w') as f:
        json.dump(json_data, f, sort_keys=False ,indent=4)

