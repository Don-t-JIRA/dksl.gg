"""### Pipe line"""

import pandas as pd
import numpy as np
import math
import copy
import warnings
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib as mpl
import matplotlib.font_manager as fm
from IPython.display import Image
from sklearn.manifold import TSNE

from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.pipeline import Pipeline

from sklearn.preprocessing import MinMaxScaler, StandardScaler, RobustScaler
from sklearn.preprocessing import PowerTransformer

min_max_scaler = MinMaxScaler()

df_train = pd.read_csv('train.csv')

class CustomPreprocessor(BaseEstimator, TransformerMixin):

    def fit(self, X, y=None):
        return self  # Nothing else to do

    def transform(self, X):

        # 승리 판 data 추출
        X = X[X['Win'] == True]

        # 필요한 컬럼 추출
        columns = ['ChampLevel', 'SoloKills', 'Assists', 'DamagePerMinute',
                   'DamageTakenOnTeamPercentage', 'Kda', 'LaneMinions10Min',
                   'TotalDamageDealtToChampions', 'VisionScore', 'ControlWard']

        X = X[columns]

        # 각 컬럼별 전처리
        X = X[X['ChampLevel']>6]
        X.loc[X['SoloKills'] >= 6, 'SoloKills'] = 5
        X = X[X['DamagePerMinute'].between(100,1800)]
        X = X[X['DamageTakenOnTeamPercentage']>0.05]
        X = X[X['Kda']>0]
        X = X[X['LaneMinions10Min']>0]
        X = X[X['VisionScore']>0]

      # ControlWard 컬럼 처리
        X ['ControlWard']=X ['ControlWard']+1
      # 새로운 컬럼 생성 및 처리
        X ['min']= X['TotalDamageDealtToChampions'] / X["DamagePerMinute"]
        X["assists_per_minutes"] = X["Assists"] / X["min"]
        X= X[X["assists_per_minutes"]>0]


        X.drop(['Assists','min'],axis=1,inplace=True)

        return X

from sklearn.cluster import KMeans
import statistics


pipeline = Pipeline(steps=[
    ('preprocessing', CustomPreprocessor()),
    ('scaling', MinMaxScaler()),
    ('kmeans', KMeans(n_clusters=3))
])

pipeline.fit(df_train)

cluster_labels = pipeline.predict(df_train)

mode_value = statistics.mode(cluster_labels)
print(mode_value)

list0 = ['가렌','나서스',"faker"]
list1 = ['베인','케이틀린']
list2 = ['유미','나미']

def cluster_result(value):
    if value == 0:
        return list0
    elif value == 1:
        return list1
    elif value == 2:
        return list2
    elif isinstance(value, str):
        return "error"
    else:
        return "error"

try:
    result = cluster_result(mode_value)
except NameError:
    result = "Error"

print(result)

