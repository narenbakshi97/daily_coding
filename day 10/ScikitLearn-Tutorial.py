#!/usr/bin/env python
# coding: utf-8

# # Scikit-Learn Library tutorial from Edureka

# **Using the Iris Data**

# ## SVM Classifier


from sklearn import svm
from sklearn import datasets


iris = datasets.load_iris()



type(iris)



iris.data



# The variable names of the table
iris.feature_names



## Output flower number/indices
iris.target


## The ouput names
iris.target_names



## defining the indipendant variable
x = iris.data[:,2]



## defining the dependant variable
y = iris.target


from sklearn.model_selection import train_test_split



## Defining the Test and Train Data
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size = 0.2, random_state=4)

# Converting all of the 4 arrays to 1-D
x_train_mod = x_train.reshape(-1,1)
x_test_mod = x_test.reshape(-1,1)
y_train_mod = y_train.reshape(-1,1)
y_test_mod = y_test.reshape(-1,1)
# creating a model
model = svm.SVC(kernel='linear')


# fit your model
model.fit(x_train_mod,y_train_mod)




