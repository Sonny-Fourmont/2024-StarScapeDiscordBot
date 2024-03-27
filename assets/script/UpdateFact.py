import json
import sys
import random

def writeFile(fileName):
    with open(fileName, 'r') as fichier:
        contenu = json.load(fichier)
    return contenu

def addAnecdote(user, newAnecdote, jsonFile):
    if user in jsonFile:
        jsonFile[user].append({"anecdote": newAnecdote, "utilise": True})
    else:
        jsonFile[user] = [{"anecdote": newAnecdote, "utilise": True}]

def delAnecdote(user, indexAnecdote, jsonFile):
    if user in jsonFile:
        indexAnecdote = int(indexAnecdote)
        if indexAnecdote < len(jsonFile[user]):
            del jsonFile[user][indexAnecdote]
            if not jsonFile[user]:
                del jsonFile[user]
            return True
        else:
            return False
    else:
        return False

def getRandomAnecdote(jsonFile):
    if not jsonFile:
        return None, None
    randomUser = random.choice(list(jsonFile.keys()))
    anecdotes = [anecdote for anecdote in jsonFile[randomUser] if anecdote["utilise"]]
    if not anecdotes:
        return None, None
    randomAnecdote = random.choice(anecdotes)
    randomAnecdote["utilise"] = False
    return randomUser, randomAnecdote

def resetAnecdotes(jsonFile):
    for user in jsonFile:
        for anecdote in jsonFile[user]:
            anecdote["utilise"] = True

def checkAllFalse(jsonFile):
    all_false = True
    for user in jsonFile:
        for anecdote in jsonFile[user]:
            if anecdote["utilise"]:
                all_false = False
                break
        if all_false:
            resetAnecdotes(jsonFile)




fileName = "factDB.json"
jsonFile = writeFile(fileName)

action = sys.argv[1]
if action == "add":
    user = sys.argv[2]
    newAnecdote = sys.argv[3]
    addAnecdote(user, newAnecdote, jsonFile)
    print(f"[{user}] {newAnecdote}")
elif action == "get":
    available_anecdote_found = False
    for _ in range(len(jsonFile)):
        user, anecdote = getRandomAnecdote(jsonFile)
        if anecdote:
            available_anecdote_found = True
            anecdote["utilise"] = False
            print(f"[By {user}] \n{anecdote['anecdote']}")  #------ mettre ici la fonction qui aura besoin de l'anecdote
            break
    if not available_anecdote_found:
        print("No available anecdotes.")
else:
    print("Wrong args")

checkAllFalse(jsonFile)

with open(fileName, 'w') as fichier:
    json.dump(jsonFile, fichier, indent=4)
