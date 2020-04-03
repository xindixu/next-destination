import pandas as pd
import csv

df = pd.read_csv("city_data.csv", encoding = "ISO-8859-1")

df['id'] = df['name'].apply(lambda x: x.replace(" ", '-').lower())

exceptions = {'new-york-city':"new-york", "minneapolis":"minneapolis-saint-paul"}
#print(exceptions['new-york-city'])
#df.at[0,'id'] = exceptions['new-york-city']
#df.at[15, 'id'] = exceptions["minneapolis"]

for i in range(df.__len__()):
  if df['id'][i] in exceptions:
    df.at[i, 'id'] = exceptions[df['id'][i]]




df.to_csv('id_city_data.csv', index=False)
