# Power-lifting-data-analysis
 As a power lifter and as are my friend athletes, and as a stats and DS maniac unlike my friend athletes I have decided to do a piece of work in which I am able to follow and observe their performance evolution in between blocks of work. It is only a base for the time being and still being improved. Hope you will find some use for it.

For the time being this code is only used to clean and organize the data for powerlifting purposes, but some or most functions can be reused for other sports data. This document will regularly be edited as my work goes on. 


# Data cleaning and anlysis of power lifting athletes dayly training data.
### Notice:
 Most words are transparent and easily understandable in English; the analysis is done on French athletes and means that the spelling and the wording are in French. For hence, movements like the deadlift will be written "Terre", "SDT" or "Soulevé de Terre". Reach out to the annex at the end of this document where translations will be put.


 ## 1.Data scrapping:
 We collect the data from using a daily table, shared on Google Sheets, to be filled by the athlete after each training. It goes as follows:

<img width="842" height="217" alt="image" src="https://github.com/user-attachments/assets/0ab3d50d-bc5e-4ee5-97e3-c11a79d3555c" />

The parameters that are going to be observed are the following:

 -`Mouvement`: name of the exercise
 
 -`Series`: number of series assigned per exercices/ movement.
 
 -`Repetitions`: nomber of reps assigned per series.
 
 -`RPE`: represents the intensity expected to achieve at the end of a series.
 
 -`Poids`: represents the weight used in the exercise (in Kg).
 
 -`Poids`(real, *reel, in red): corresponds to the reel weight applied by the athlete in the           exercise (in Kg).

 -`RPE`(real, *reel, in red): corresponds to the real intesity reached by the athlete at the end of    the exercise.
 
Only the columns in red are to be filled by the athlete. We can see that there are only two, which is minimal. We prefer to do so because of passed table models containing more columns to fill (these were unregularly filled by the athletes leaving us with unrecoverable data). This version contains the most necessary data to follow the athletes' progression, and it also corresponds to the data that was most continuously filled in by the athletes. We opted for a very direct, simple organization of the table given to the athletes so as to drive their vision directly on the main exercises, and the parts to fill in, keeping a very minimalistic design. In deed, it came out as the table that was the most filled that suited compared to previous designs.

Using the "App script" extension on Google Sheets, we are able to insert the "power lifting data collect" code and collect the data from every sheet in one unique sheet as follows:

<img width="693" height="768" alt="image" src="https://github.com/user-attachments/assets/f3d41632-da9d-4733-8f7e-efb85bf23cb6" />

## 2.Data cleaning:

### a. Anomalies:
 Most of the data is numerical and quantitative except for the movement category. We can observe in the raw data some anomalies. First of all, every column hasn't got atomic data (atomic meaning that the data is of the same type/ unit). Some data are integers, some are showed up as dates ("06/07/2025" in D5), some are showed up as negatives but always between minus one and zero (-0.16 in D3), some are a set of values ("55-65" in E9) and some are recognized as strings because of their writing ("62,5" for example will be recognized as a string because of the "," instead of a "." Or "max"/ "max min" written in columns that are numerical).

We could just take out these anomalies and keep the already valid data, but this would create too many information gaps in the observation and would make them completely irrelevant. What I am looking forward to more than "cleaning" the data is restoring the data. This means first of all, understanding why it has these funny shapes, how the tables were filled in by the coach but more specifically by the athletes. Because all those spaces are unfield, it does not mean that the exercise has not been done ( sometimes only the executed weight is put in and not the intensity, showing that the exercise has been executed).

### b. Understanding how is the table filled:
 This is the more social part of this work, in which I question each athlete, their training habitudes, how do they measure their intensity, what do they base their measure on, how do they fill in their sheets, when one is unfilled what does it mean, etc. This questioning is valid for the trainer as well, how has he set the weight and intensity marker for each athlete, what does it mean when he uses certain terms ("max", "max rep", "max min" or "Blast" for example) and especially what does he want us to look for.

For the athletes, filling one cell out of two usually means that the unfilled one is the same as what was given by the coach. Consider both unfilled cells as undone by the athlete because even though he might have done the exercise, it is no use to ask him to remember what weight and especially what intensity he exactly did on it. So just consider these kinds of anomalies as exercises not done. We only reconstruct the data from what is already present, not by adding new data in the middle.

After understanding how the a thletes fill in their spreadsheets, it is important to observe how it is identified by the table. For example, an athlete can write in his RPE section: "7/8". The table on the other hand will believe it is a date and automaticaly rewrite it as "07/08/2026" so seven'th of august 2026. When dates are observed like this it is easy to understand that the values that interest us are the day and the month, so we have to find a way of correcting our cell by taking out the year. We have to look out for these specific anomalies and understand how they got here. Then we have to correct them and that's why we build the functions we are going to see next.

### c. Building the functions:
 Now that we have identified the anomalies, we understand why they are here:
 - `transformer_dat(val)`: this function is used to deal with cells containing a "/" and that would be recognised by our spreadsheet, as a date or not and then calculate the mean between the day and the month values to get a single value to replace the cell. 
 - `minus_separator(val)`: this function looks if their is a "-" symbol in it's value, if it is a leading minus or a sepreator, in function of witch it calculates the mean of the values that are separated and leaves the value as is if the minus is leading.
 - `apply_negative_adjustment`: for the cells in wich the value is a negative number (usualy in "RPE" or "Poids"). It usualy represents a percentage decrees of the used weight in the preceding exercise, this new decreesed weight becoming the target weight to be applied.
 - `rep_patern` + `is_rep_based`: detects if the value put into "POIDS" and "POIDS REEL" is in number of reps or in Kg's.
 - `mouvement_type`: determines if the exercise is related specificaly to Squat, Bench, Deadlift or side-exercise.

The previous functions are the main ones that are used and that are lightly to be transposed to other domains/ sports. But their are in the current python file, a few other functions and elements in the previous functions, that are going to be more specific to sorting out my data and its "uniqness".
We have:

 - `BLAST_to_num`: Changes the value "BLAST" in "POIDS" with the value of "10" in the RPE ("BLAST" meaning for the athlete to go to his max intensity on the exercise)

### d. Cleaning and completing our dataset:

 First of all we take out all of the values that are empty in `POIDS REEL` and in `RPE REEL`.
 So:
 <img width="518" height="142" alt="image" src="https://github.com/user-attachments/assets/954ca57f-08f5-4df1-a6bf-f840ba00fe8f" />

Data that is empty in both cells mostly means that the athlete has not done the exercise so no information to get out of it.

Then we treat each category independantly starting with the `COTE` category: It is composed of two parts: the bloc name (BLOC 4 : PREPA ++), the week number in the bloc and the day number in this week (SEMAINE 24)

<img width="271" height="147" alt="image" src="https://github.com/user-attachments/assets/95538e30-5e9d-46b1-9218-ef2b1d95edb5" />

First we strip white spaces and turn "SEMAINE" into a coma. I did this for it to be easier for me to split the name of the bloc and the week + day. Then whe split the column by the recuring character "," and have two columns:`BLOC` and `SJ` for "Semaine + Jour" (Week + Day) ==> "SJ". We can now drop the `COTE` column as it has been seperated.

<img width="862" height="72" alt="image" src="https://github.com/user-attachments/assets/5f653f09-2837-41c3-a1de-e1f620adf19c" />

For the `UNITES` category ...

<img width="816" height="141" alt="image" src="https://github.com/user-attachments/assets/b5c997f6-8999-43f8-81a0-a3bf6b5103cf" />

For the `SERIES` category ...

<img width="402" height="93" alt="image" src="https://github.com/user-attachments/assets/009a37ca-6148-4123-8166-f04f21fa394b" />

For the `REPETETIONS` category ...

<img width="453" height="262" alt="image" src="https://github.com/user-attachments/assets/11715320-6353-4a39-8489-ca761449e536" />

For the `RPE` category ...

<img width="352" height="151" alt="image" src="https://github.com/user-attachments/assets/edc98d51-4fa2-496e-b37f-a902d712faa6" />

For the `POIDS` category ...

<img width="407" height="131" alt="image" src="https://github.com/user-attachments/assets/4682801b-a25f-4c38-87a5-11ae7770303f" />


<img width="492" height="27" alt="image" src="https://github.com/user-attachments/assets/cd38eebb-759c-43f3-af4a-d1c4b3824463" />

For the `POIDS REEL` category ...

<img width="471" height="258" alt="image" src="https://github.com/user-attachments/assets/812e30e5-03d6-4459-b272-6f4d112acbf2" />

<img width="488" height="30" alt="image" src="https://github.com/user-attachments/assets/e859856a-9ab4-4a88-beb5-2a0c08fe9836" />

For the `RPE REEL` category ...

<img width="402" height="27" alt="image" src="https://github.com/user-attachments/assets/fb984fac-a749-4573-990d-57205988f4c2" />


<img width="642" height="218" alt="image" src="https://github.com/user-attachments/assets/21bdb4c1-c577-4e70-9cc9-e36d3c79c434" />


<img width="427" height="21" alt="image" src="https://github.com/user-attachments/assets/f1b7491e-e67f-43e3-ba52-8de521ac3a5d" />

Then we set every quantitative category to floats.

<img width="595" height="156" alt="image" src="https://github.com/user-attachments/assets/ef65a5d3-4fea-40f0-9588-72f25712029f" />

Build more useful columns from the information the data gives us:

<img width="1232" height="150" alt="image" src="https://github.com/user-attachments/assets/b8db0e75-1abb-48a7-ac51-fd796294d10d" />


## 3. Analysis:
### a. Biases


 
 # ANNEXE:

Mouvement: movement

Poids : weights

