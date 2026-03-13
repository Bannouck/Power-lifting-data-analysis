# Power-lifting-data-analysis
 As a power lifter and as are my friend athletes, and as a stats and DS maniac unlike my friend athletes I have decided to do a piece of work in which I am able to follow and observe their performance evolution in between blocks of work. It is only a base for the time being and still being improved. Hope you will find some use for it.

For the time being this code is only used to clean and organize the data for powerlifting purposes, but some or most functions can be reused for other sports data. This document will regularly be edited as my work goes on. 


# Data cleaning and anlysis of power lifting athletes dayly training data.
### Notice:
 All those words are transparent and easily understandable in English; the analysis is done on French athletes and means that the spelling and the wording are in French. For hence, movements like the deadlift will be written "Terre", "SDT" or "Soulevé de Terre". Reach out to the annex at the end of this document where translations will be put.


 ## 1.Data scrapping:
 We collect the data from using a daily table, shared on Google Sheets, to be filled by the athlete after each training. It goes as follows:

<img width="842" height="217" alt="image" src="https://github.com/user-attachments/assets/0ab3d50d-bc5e-4ee5-97e3-c11a79d3555c" />

The parameters that are going to be observed are the following:
 -"Mouvement": name of the exercise
 
 -"Series": number of series assigned per exercices/ movement.
 
 -"Repetitions": nomber of reps assigned per series.
 
 -"RPE": represents the intensity expected to achieve at the end of a series.
 
 -"Poids": represents the weight used in the exercise (in Kg).
 
 -"Poids"(real, *reel, in red): corresponds to the reel weight applied by the athlete in the           exercise (in Kg).

 -"RPE"(real, *reel, in red): corresponds to the real intesity reached by the athlete at the end of    the exercise.
 
Only the columns in red are to be filled by the athlete. We can see that there are only two, which is minimal. We prefer to do so because of passed table models containing more columns to fill (these were unregularly filled by the athletes leaving us with unrecoverable data). This version contains the most necessary data to follow the athletes' progression, and it also corresponds to the data that was most continuously filled in by the athletes. We opted for a very direct, simple organization of the table given to the athletes so as to drive their vision directly on the main exercises, and the parts to fill in, keeping a very minimalistic design. In deed, it came out as the table that was the most filled that suited compared to previous designs.

Using the "App script" extension on Google Sheets, we are able to insert the "power lifting data collect" code and collect the data from every sheet in one unique sheet as follows:

<img width="693" height="768" alt="image" src="https://github.com/user-attachments/assets/f3d41632-da9d-4733-8f7e-efb85bf23cb6" />

## 2.Data cleaning:

### a. Anomalies:
 Most of the data is numerical and quantitative except for the movement category. We can observe in the raw data some anomalies. First of all, every column hasn't got atomic data (atomic meaning that the data is of the same type/ unit). Some data are integers, some are showed up as dates ("06/07/2025" in D5), some are showed up as negatives but never between minus one and zero (-0.16 in D3), some are a set of values ("55-65" in E9) and some are recognized as strings because of their writing ("62,5" for example will be recognized as a string because of the "," instead of a "." Or "max"/ "max min" written in columns that are numerical).

We could just take out these anomalies and keep the already valid data, but this would create too many information gaps in the observation and would make them completely irrelevant. What I am looking forward to more than "cleaning" the data is restoring the data. This means first of all, understanding why it has these funny shapes, how the tables were filled in by the coach but more specifically by the athletes. Because all those spaces are unfield, it does not mean that the exercise has not been done ( sometimes only the executed weight is put in and not the intensity, showing that the exercise has been executed).

### b. Understanding how is the table filled:
 This is the more social part of this work, in which I question each athlete, their training habitudes, how do they measure their intensity, what do they base their measure on, how do they fill in their sheets, when one is unfilled what does it mean, etc. This questioning is valid for the trainer as well, how has he set the weight and intensity marker for each athlete, what does it mean when he uses certain terms ("max", "max rep", "max min" or "Blast" for example) and especially what does he want us to look for.

For the athletes, filling one cell out of two usually means that the unfilled one is the same as what was given by the coach. Consider both unfilled cells as undone by the athlete because even though he might have done the exercise, it is no use to ask him to remember what weight and especially what intensity he exactly did on it. So just consider these kinds of anomalies as exercises not done. We only reconstruct the data from what is already present, not by adding new data in the middle.

### c. Building functions:
 Now that we have identified the anomalies, we understand why they are here:
 - `transformer_dat`
 - `minus_separator`
 - `apply_negative_adjustment`
 - `BLAST_to_num`
 - `rep_patern` + `is_rep_based`

### d. Cleaning and completing our dataset:


## 3. Analysis:
### a. Biases


 
 # ANNEXE:

Mouvement: movement

Poids : weights

