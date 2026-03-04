# Power-lifting-data-analysis
As a power lifter and as are my friend athletes, and as a stats and DS maniac unlike my friend athletes I have decided to do a piece of work in wich i am able tofollow and observe their performance evolution in between blocs of work. It is only a base for the time being and still being improved, hope you will find some use to it.

For the time being this code is only used to clean and organize the data for power lifting purposes, but some or most functions can be reused for othger sports data. This document will regularly be edited as my work goes on. 


## Data cleaning and anlysis of power lifting athletes weekly dayly training data.

Notice: All thow some words are transparent and are easly understandable in english, the analysis is done on french athletes and means that the spelling and the wording is in french. For hence, movements like the deadlift will be written "Terre", "SDT" or "Soulevé de Terre". Reach out to the annexe at the end of this document where translations will be put


 # 1.Data scrapping:

We collect the data from using a daily table, shared on google sheets, to fill by the athlete after each trainig. It goes as followes:

<img width="842" height="217" alt="image" src="https://github.com/user-attachments/assets/0ab3d50d-bc5e-4ee5-97e3-c11a79d3555c" />

The parameters that are going to be observed are the following:
 -"Mouvement": name of the exercise
 
 -"Series": number of series assigned per exercices/ movement.
 
 -"Repetitions": nomber of reps assigned per series.
 
 -"RPE": represents the intensity expected to achieve at the end of a series.
 
 -"Poids": represents the weight used in the exercise.
 
 -"Poids"(real, *reel, in red): corresponds to the reel weight applied by the athlete in the           exercise.

 -"RPE"(real, *reel, in red): corresponds to the real intesity reached by the athlete at the end of    the exercise.

Only the columns in red are to be filed by the athlete. We can see that their are only two, wich is minimal. We prefered to do so because of passed table models containig more columns to fill (these wer unregularly filled by the athletes leaving us with unrecoverable data). this version contains the most necessary data to follow the athletes progression and it also corresponds to the data that was most continuously filled in by the athletes. We opted for a very direct, simple organization of the table given to the athletes so as to drive their vision directly on the main exercices, and the parts to fill in, keeping a very minimalistic design. In deed it came out as the table that was the most filled and followed compared to previous designs.

Using the "App script" extension on google sheets, we are able to insert the "power lifting data collect" and collect the data from every sheet in one unique sheet like follows:
<img width="693" height="768" alt="image" src="https://github.com/user-attachments/assets/f3d41632-da9d-4733-8f7e-efb85bf23cb6" />


 # ANNEXE:

Mouvement: movement
