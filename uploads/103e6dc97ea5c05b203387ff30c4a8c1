import pandas as pd
import numpy as np

def loadAndSplitData():
    df = pd.read_csv('C:/Users/mel/Desktop/M2/DATA MINING/TPS/titanic.csv')

    del df['PassengerId']
    del df['Name']
    del df['Ticket']
    del df['Fare']
    del df['Cabin']
    
    df = df[['Survived', 'Sex', 'Age', 'SibSp', 'Parch', 'Embarked']]

    âge_moyen = df['Age'].mean()

    for index, row in df.iterrows():
        if pd.isnull(row['Age']):
            df.at[index, 'Age'] = âge_moyen 


    df['Sex'] = df['Sex'].apply(lambda x: 0 if x == 'male' else 1)
    df['Embarked'] = df['Embarked'].apply(lambda x: 0 if x == 'C' else 1 if x == 'Q' else 2)

    print(df.head())



    tab_donn = np.array(df)
    np.random.shuffle(tab_donn)

    indice_cdonnee = int(0.9 * len(df))
    train = df.iloc[:indice_cdonnee].to_numpy()
    test = df.iloc[indice_cdonnee:].to_numpy()

    return df, train, test

df, train, test = loadAndSplitData()
print(train, test)

matrice_de_correlation = df.corr()
print(matrice_de_correlation)

print(test.shape)
print(train.shape)










class Model:
    def __init__(self,train, test):
        self.train = train
        self.test = test
        


    def fit(self,x, y):
        self.probas_classes = dict(zip(*np.unique(y, return_counts=True) / len(y))) 
        print(self.probas_classes)
    


        self.probas_conditionnelles = {}

        # Parcourir chaque classe unique dans y
        for c in np.unique(y):
            self.probas_conditionnelles[c] = {}
            
            # Parcourir chaque caractéristique dans x
            for caracteristique in range(x.shape[1]):

                valeurs_carac = np.unique(x[y == c, caracteristique], return_counts=True)
                
                # Calculer les probabilités conditionnelles et les stocker dans le dictionnaire
                probas_conditionnelles = {}
                for valeur in zip(valeurs_carac):
                    probas_conditionnelles[valeur] = valeur / len(y[y == c])
                
                self.probas_conditionnelles[c][caracteristique] = probas_conditionnelles
                

    def predictWithCk(self, x, ck , probas_conditionnelles) :
        proba_c_k = self.probas_classes[ck]
        proba_x_sachant_ck = 1.0

        for caracteristique in enumerate(x):

                # Vérifie si la caractéristique (sex lhala) actuelle a déjà été observée dans le jeu d'entraînement pour la classe Ck.
            if caracteristique in probas_conditionnelles[ck]:
                # npprod pour cala le produit pour suivre la loie 
                proba_x_sachant_ck *= probas_conditionnelles[ck][caracteristique]
            return proba_x_sachant_ck * proba_c_k
        
    def predict(self, x):
            # prédire la classe d'une observation x donnée
            # c parcourt chaque classe dans la liste des classes possibles.
            # apres pour trouver la classe predite on doit retourner l'indice de la classe ayant la probabilité maximale parmi toutes les classes possibles.

        classes = np.unique(self.train[:, 0])  # Liste des classes possibles
        probabilites = [self.predictWithCk(x, c) for c in classes]
        classe_predite = classes[np.argmax(probabilites)]
        return classe_predite    
    






    
    
    def predictAll(self, list_obs):
        predictions = [self.predict(obs) for obs in list_obs]
        return predictions
    
    def accuracy(self, predictions, trues):
        
      
        if len(predictions) != len(trues):
            raise ValueError("pas la même longueur.")
        correct_predictions = sum(1 for pred, true in zip(predictions, trues) if pred == true) # chaque fois que la condition if pred == true est vraie, elle ajoute 1 à la somme.

        accuracy = correct_predictions / len(predictions)

        return accuracy
    
def main():
    df, train, test = loadAndSplitData()


    model = Model(train, test)
    model.fit(train[:, 1:], train[:, 0])

    
    individus = [
        [0, 25, 1, 2, 3, 0],  # h, 25 , marié, 2 enfants,3eme classe, embarquant à Cherbourg
        [0, 55, 0, 0, 1, 1],  # h ,55 ,seul, 1 classe, embarquant à Queenstown
        [0, 55, 0, 1, 1, 1],  # h ,55 ,enfant,1er classe, embarquant à Queenstown
        [0, 55, 0, 1, 3, 1],  # h ,55 , enfant, 3classe, embarquant à Queenstown
        [1, 75, 0, 0, 3, 2], # f ,75  ,seule,3 classe, embarquant à Southampton
        [1, 75, 1, 0, 2, 2], # f, 75  ,mariée,2 classe, embarquant à Southampton
    ]

    for obs in individus:
        prediction = model.predict(obs[1:])
        survie = "Survécu" if prediction == 1 else "Non survécu"
        print(f"Individu {obs}: {survie}")

    
    predictions_test = model.predictAll(test[:, 1:])
    accuracy_test = model.accuracy(predictions_test, test[:, 0])
    print(f"Exactitude sur l'ensemble de test : {accuracy_test * 100:.2f}%")


if _name_ == "_main_":
    main()


























    #      nbr_occu_classe = np.unique(self.train[:, -1], return_counts=True) 
    #     #  on selectionne la dernière colonne de train puis np.unique renvoie les valeurs uniques dans le tableau et leur fréquence
    #     # return_counts=True, elle renvoie également le nombre d'occurrences de chaque valeur.
    #     #  self.nbr_classe = nbr_occu[0]
    #     #  self.nbr_occu_classe = nbr_occu[1]

    #      self.proba_class = dict(zip(nbr_occu_classe / len(self.train_data)))


    #      for colonnes in self.train.columns[:-1]: # parcourir toutes les col
    #          for c in self.proba_class.keys(): # parcourir toutes les classes 
    #              # Pour chaque classe et chaque valeur unique de la colonne, calculer la probabilité conditionnelle
    #             #  self.proba_class[c][colonnes] = (np.sum((self.train == c))
    #             val_uni  = np.unique(self.train.loc[self.train.iloc[:, -1] == c, colonnes], return_counts=True)
    #             self.cond_probs[colonnes][c] = dict(zip(val_uni / len(self.train.loc[self.train.iloc[:, -1] == c, colonnes])))
    #             #  des paires de valeurs uniques et de leurs probabilités conditionnelles (fréquences normalisées).


    # def predictWithCk(self, x, ck):
    #     # P(Ck)
    #     prob_ck = self.proba_class[ck]

    #     # Initialiser le produit des probabilités conditionnelles à 1
    #     prod_cond_probs = 1.0

    #     # Calculer le produit des probabilités conditionnelles P(xi | Ck)
    #     for col, value in x.items():
    #         if col != 'Survived':  # Ignorer la colonne de la variable cible
    #             prod_cond_probs *= self.cond_probs[col][ck].get(value, 0.0)

    #     # Calculer la probabilité finale P(CK) * PRODUIT DES (P(xi | CK))
    #     prob_final = prob_ck * prod_cond_probs

    #     return prob_final